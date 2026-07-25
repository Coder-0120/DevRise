import { useEffect, useState } from "react";
import projectsApi from "../../api/projectsApi";
import { PageHeader, EmptyState, Spinner } from "../components/UI";
import Modal from "../components/Modal";
import ConfirmDialog from "../components/ConfirmDialog";
import { useToast } from "../context/ToastContext";

const emptyForm = {
  title: "",
  description: "",
  github: "",
  liveDemo: "",
  techStack: "",
  image: "",
  featured: false,
  order: 0,
};

const toFormState = (project) => ({
  title: project.title || "",
  description: project.description || "",
  github: project.github || "",
  liveDemo: project.liveDemo || "",
  techStack: (project.techStack || []).join(", "),
  image: project.image || "",
  featured: !!project.featured,
  order: project.order ?? 0,
});

const Projects = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [editing, setEditing] = useState(null); // null = closed, {} = new, object = edit
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [deleting, setDeleting] = useState(null);
  const [busy, setBusy] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      setProjects(await projectsApi.getAll());
    } catch {
      toast.push("Couldn't load projects.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openCreate = () => {
    setForm(emptyForm);
    setFormError("");
    setEditing({});
  };

  const openEdit = (project) => {
    setForm(toFormState(project));
    setFormError("");
    setEditing(project);
  };

  const handleChange = (field) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim() || !form.github.trim() || !form.techStack.trim()) {
      setFormError("Title, description, GitHub link and tech stack are required.");
      return;
    }

    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      github: form.github.trim(),
      liveDemo: form.liveDemo.trim(),
      techStack: form.techStack.split(",").map((s) => s.trim()).filter(Boolean),
      image: form.image.trim(),
      featured: form.featured,
      order: Number(form.order) || 0,
    };

    setSaving(true);
    setFormError("");
    try {
      if (editing?._id) {
        const res = await projectsApi.update(editing._id, payload);
        setProjects((prev) => prev.map((p) => (p._id === editing._id ? res.data : p)));
        toast.push("Project updated.");
      } else {
        const res = await projectsApi.create(payload);
        setProjects((prev) => [...prev, res.data]);
        toast.push("Project created.");
      }
      setEditing(null);
    } catch (err) {
      setFormError(err.response?.data?.message || "Something went wrong saving this project.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleting) return;
    setBusy(true);
    try {
      await projectsApi.remove(deleting._id);
      setProjects((prev) => prev.filter((p) => p._id !== deleting._id));
      toast.push("Project deleted.");
      setDeleting(null);
    } catch {
      toast.push("Couldn't delete this project.", "error");
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Projects"
        description="Everything shown in the portfolio's projects section."
        action={
          <button type="button" className="btn btn-primary" onClick={openCreate}>
            + New project
          </button>
        }
      />

      {loading ? (
        <Spinner />
      ) : projects.length === 0 ? (
        <EmptyState
          title="No projects yet"
          body="Add your first project to have it appear on the public site."
          action={
            <button type="button" className="btn btn-primary" onClick={openCreate}>
              + New project
            </button>
          }
        />
      ) : (
        <div className="card-grid">
          {[...projects]
            .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
            .map((p) => (
              <div className="admin-card" key={p._id}>
                <div className="admin-card-head">
                  <h3>{p.title}</h3>
                  {p.featured && <span className="badge">Featured</span>}
                </div>
                <p className="admin-card-desc">{p.description}</p>
                <div className="chip-row">
                  {(p.techStack || []).map((t) => (
                    <span className="chip" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
                <div className="admin-card-actions">
                  <button type="button" className="btn btn-ghost btn-sm" onClick={() => openEdit(p)}>
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger-ghost btn-sm"
                    onClick={() => setDeleting(p)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}

      {editing && (
        <Modal title={editing._id ? "Edit project" : "New project"} onClose={() => setEditing(null)}>
          <form className="admin-form" onSubmit={handleSubmit}>
            <label className="form-field">
              <span>Title *</span>
              <input value={form.title} onChange={handleChange("title")} />
            </label>

            <label className="form-field">
              <span>Description *</span>
              <textarea rows={3} value={form.description} onChange={handleChange("description")} />
            </label>

            <div className="form-row">
              <label className="form-field">
                <span>GitHub link *</span>
                <input value={form.github} onChange={handleChange("github")} placeholder="https://github.com/…" />
              </label>
              <label className="form-field">
                <span>Live demo</span>
                <input value={form.liveDemo} onChange={handleChange("liveDemo")} placeholder="https://…" />
              </label>
            </div>

            <label className="form-field">
              <span>Tech stack * (comma separated)</span>
              <input
                value={form.techStack}
                onChange={handleChange("techStack")}
                placeholder="React, Node.js, MongoDB"
              />
            </label>

            <label className="form-field">
              <span>Image URL</span>
              <input value={form.image} onChange={handleChange("image")} placeholder="https://…" />
            </label>

            <div className="form-row">
              <label className="form-field">
                <span>Sort order</span>
                <input type="number" value={form.order} onChange={handleChange("order")} />
              </label>
              <label className="form-field form-field-checkbox">
                <input type="checkbox" checked={form.featured} onChange={handleChange("featured")} />
                <span>Featured project</span>
              </label>
            </div>

            {formError && <p className="form-error">{formError}</p>}

            <div className="form-actions">
              <button type="button" className="btn btn-ghost" onClick={() => setEditing(null)}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? "Saving…" : editing._id ? "Save changes" : "Create project"}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {deleting && (
        <ConfirmDialog
          body={`Delete "${deleting.title}"? This can't be undone.`}
          onCancel={() => setDeleting(null)}
          onConfirm={handleDelete}
          busy={busy}
        />
      )}
    </>
  );
};

export default Projects;
