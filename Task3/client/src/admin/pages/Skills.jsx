import { useEffect, useState } from "react";
import skillsApi from "../../api/skillsApi";
import { PageHeader, EmptyState, Spinner } from "../components/UI";
import Modal from "../components/Modal";
import ConfirmDialog from "../components/ConfirmDialog";
import { useToast } from "../context/ToastContext";

const emptyForm = { category: "", skills: [{ name: "", level: 50 }] };

const toFormState = (cat) => ({
  category: cat.category || "",
  skills: (cat.skills || []).length
    ? cat.skills.map((s) => ({ name: s.name, level: s.level }))
    : [{ name: "", level: 50 }],
});

const Skills = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [deleting, setDeleting] = useState(null);
  const [busy, setBusy] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      setCategories(await skillsApi.getAll());
    } catch {
      toast.push("Couldn't load skills.", "error");
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

  const openEdit = (cat) => {
    setForm(toFormState(cat));
    setFormError("");
    setEditing(cat);
  };

  const updateSkillRow = (idx, field, value) => {
    setForm((f) => {
      const skills = [...f.skills];
      skills[idx] = { ...skills[idx], [field]: value };
      return { ...f, skills };
    });
  };

  const addSkillRow = () => setForm((f) => ({ ...f, skills: [...f.skills, { name: "", level: 50 }] }));

  const removeSkillRow = (idx) =>
    setForm((f) => ({ ...f, skills: f.skills.filter((_, i) => i !== idx) }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanedSkills = form.skills
      .map((s) => ({ name: s.name.trim(), level: Number(s.level) }))
      .filter((s) => s.name);

    if (!form.category.trim() || cleanedSkills.length === 0) {
      setFormError("Category name and at least one skill are required.");
      return;
    }
    if (cleanedSkills.some((s) => s.level < 0 || s.level > 100 || Number.isNaN(s.level))) {
      setFormError("Skill level must be a number between 0 and 100.");
      return;
    }

    const payload = { category: form.category.trim(), skills: cleanedSkills };

    setSaving(true);
    setFormError("");
    try {
      if (editing?._id) {
        const res = await skillsApi.update(editing._id, payload);
        setCategories((prev) => prev.map((c) => (c._id === editing._id ? res.data : c)));
        toast.push("Skill category updated.");
      } else {
        const res = await skillsApi.create(payload);
        setCategories((prev) => [...prev, res.data]);
        toast.push("Skill category created.");
      }
      setEditing(null);
    } catch (err) {
      setFormError(err.response?.data?.message || "Something went wrong saving this category.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleting) return;
    setBusy(true);
    try {
      await skillsApi.remove(deleting._id);
      setCategories((prev) => prev.filter((c) => c._id !== deleting._id));
      toast.push("Skill category deleted.");
      setDeleting(null);
    } catch {
      toast.push("Couldn't delete this category.", "error");
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Skills"
        description="Skill categories and proficiency levels shown on the site."
        action={
          <button type="button" className="btn btn-primary" onClick={openCreate}>
            + New category
          </button>
        }
      />

      {loading ? (
        <Spinner />
      ) : categories.length === 0 ? (
        <EmptyState
          title="No skill categories yet"
          body="Group related skills — like 'Frontend' or 'Databases' — into categories."
          action={
            <button type="button" className="btn btn-primary" onClick={openCreate}>
              + New category
            </button>
          }
        />
      ) : (
        <div className="card-grid">
          {categories.map((cat) => (
            <div className="admin-card" key={cat._id}>
              <div className="admin-card-head">
                <h3>{cat.category}</h3>
              </div>
              <ul className="skill-bar-list">
                {(cat.skills || []).map((s) => (
                  <li key={s.name}>
                    <div className="skill-bar-label">
                      <span>{s.name}</span>
                      <span className="muted small">{s.level}%</span>
                    </div>
                    <div className="skill-bar-track">
                      <div className="skill-bar-fill" style={{ width: `${s.level}%` }} />
                    </div>
                  </li>
                ))}
              </ul>
              <div className="admin-card-actions">
                <button type="button" className="btn btn-ghost btn-sm" onClick={() => openEdit(cat)}>
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-danger-ghost btn-sm"
                  onClick={() => setDeleting(cat)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <Modal title={editing._id ? "Edit category" : "New category"} onClose={() => setEditing(null)}>
          <form className="admin-form" onSubmit={handleSubmit}>
            <label className="form-field">
              <span>Category name *</span>
              <input
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                placeholder="Frontend"
              />
            </label>

            <span className="form-subhead">Skills</span>
            <div className="skill-row-editor">
              {form.skills.map((s, idx) => (
                <div className="skill-row" key={idx}>
                  <input
                    placeholder="Skill name"
                    value={s.name}
                    onChange={(e) => updateSkillRow(idx, "name", e.target.value)}
                  />
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={s.level}
                    onChange={(e) => updateSkillRow(idx, "level", e.target.value)}
                  />
                  <button
                    type="button"
                    className="icon-btn"
                    onClick={() => removeSkillRow(idx)}
                    aria-label="Remove skill"
                    disabled={form.skills.length === 1}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <button type="button" className="btn btn-ghost btn-sm" onClick={addSkillRow}>
              + Add skill
            </button>

            {formError && <p className="form-error">{formError}</p>}

            <div className="form-actions">
              <button type="button" className="btn btn-ghost" onClick={() => setEditing(null)}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? "Saving…" : editing._id ? "Save changes" : "Create category"}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {deleting && (
        <ConfirmDialog
          body={`Delete the "${deleting.category}" category? This can't be undone.`}
          onCancel={() => setDeleting(null)}
          onConfirm={handleDelete}
          busy={busy}
        />
      )}
    </>
  );
};

export default Skills;
