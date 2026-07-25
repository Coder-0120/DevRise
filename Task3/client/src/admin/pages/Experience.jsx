import { useEffect, useState } from "react";
import experienceApi from "../../api/experienceApi";
import { PageHeader, EmptyState, Spinner } from "../components/UI";
import Modal from "../components/Modal";
import ConfirmDialog from "../components/ConfirmDialog";
import { useToast } from "../context/ToastContext";

const emptyForm = {
  company: "",
  role: "",
  startDate: "",
  endDate: "",
  location: "",
  description: "",
  techStack: "",
};

const toDateInput = (d) => (d ? new Date(d).toISOString().slice(0, 10) : "");

const toFormState = (item) => ({
  company: item.company || "",
  role: item.role || "",
  startDate: toDateInput(item.startDate),
  endDate: toDateInput(item.endDate),
  location: item.location || "",
  description: item.description || "",
  techStack: (item.techStack || []).join(", "),
});

const Experience = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [deleting, setDeleting] = useState(null);
  const [busy, setBusy] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      setItems(await experienceApi.getAll());
    } catch {
      toast.push("Couldn't load experience entries.", "error");
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

  const openEdit = (item) => {
    setForm(toFormState(item));
    setFormError("");
    setEditing(item);
  };

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.company.trim() || !form.role.trim() || !form.startDate || !form.description.trim()) {
      setFormError("Company, role, start date and description are required.");
      return;
    }

    const payload = {
      company: form.company.trim(),
      role: form.role.trim(),
      startDate: form.startDate,
      endDate: form.endDate || null,
      location: form.location.trim(),
      description: form.description.trim(),
      techStack: form.techStack.split(",").map((s) => s.trim()).filter(Boolean),
    };

    setSaving(true);
    setFormError("");
    try {
      if (editing?._id) {
        const res = await experienceApi.update(editing._id, payload);
        setItems((prev) => prev.map((i) => (i._id === editing._id ? res.data : i)));
        toast.push("Experience updated.");
      } else {
        const res = await experienceApi.create(payload);
        setItems((prev) => [...prev, res.data]);
        toast.push("Experience added.");
      }
      setEditing(null);
    } catch (err) {
      setFormError(err.response?.data?.message || "Something went wrong saving this entry.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleting) return;
    setBusy(true);
    try {
      await experienceApi.remove(deleting._id);
      setItems((prev) => prev.filter((i) => i._id !== deleting._id));
      toast.push("Experience deleted.");
      setDeleting(null);
    } catch {
      toast.push("Couldn't delete this entry.", "error");
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Experience"
        description="Work history shown on the site's timeline."
        action={
          <button type="button" className="btn btn-primary" onClick={openCreate}>
            + New entry
          </button>
        }
      />

      {loading ? (
        <Spinner />
      ) : items.length === 0 ? (
        <EmptyState
          title="No experience entries yet"
          body="Add a role to start building the timeline."
          action={
            <button type="button" className="btn btn-primary" onClick={openCreate}>
              + New entry
            </button>
          }
        />
      ) : (
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Role</th>
                <th>Company</th>
                <th>Dates</th>
                <th aria-label="actions" />
              </tr>
            </thead>
            <tbody>
              {items.map((i) => (
                <tr key={i._id}>
                  <td>
                    <strong>{i.role}</strong>
                    <div className="muted small">{i.location}</div>
                  </td>
                  <td>{i.company}</td>
                  <td className="muted small">
                    {toDateInput(i.startDate)} → {i.endDate ? toDateInput(i.endDate) : "Present"}
                  </td>
                  <td className="table-actions">
                    <button type="button" className="btn btn-ghost btn-sm" onClick={() => openEdit(i)}>
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger-ghost btn-sm"
                      onClick={() => setDeleting(i)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <Modal title={editing._id ? "Edit experience" : "New experience"} onClose={() => setEditing(null)}>
          <form className="admin-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label className="form-field">
                <span>Company *</span>
                <input value={form.company} onChange={handleChange("company")} />
              </label>
              <label className="form-field">
                <span>Role *</span>
                <input value={form.role} onChange={handleChange("role")} />
              </label>
            </div>

            <div className="form-row">
              <label className="form-field">
                <span>Start date *</span>
                <input type="date" value={form.startDate} onChange={handleChange("startDate")} />
              </label>
              <label className="form-field">
                <span>End date (blank = present)</span>
                <input type="date" value={form.endDate} onChange={handleChange("endDate")} />
              </label>
            </div>

            <label className="form-field">
              <span>Location</span>
              <input value={form.location} onChange={handleChange("location")} placeholder="Remote" />
            </label>

            <label className="form-field">
              <span>Description *</span>
              <textarea rows={3} value={form.description} onChange={handleChange("description")} />
            </label>

            <label className="form-field">
              <span>Tech stack (comma separated)</span>
              <input value={form.techStack} onChange={handleChange("techStack")} placeholder="Node.js, Express" />
            </label>

            {formError && <p className="form-error">{formError}</p>}

            <div className="form-actions">
              <button type="button" className="btn btn-ghost" onClick={() => setEditing(null)}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? "Saving…" : editing._id ? "Save changes" : "Add experience"}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {deleting && (
        <ConfirmDialog
          body={`Delete the "${deleting.role}" entry at ${deleting.company}?`}
          onCancel={() => setDeleting(null)}
          onConfirm={handleDelete}
          busy={busy}
        />
      )}
    </>
  );
};

export default Experience;
