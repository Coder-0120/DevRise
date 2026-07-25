import { useEffect, useState } from "react";
import educationApi from "../../api/educationApi";
import { PageHeader, EmptyState, Spinner } from "../components/UI";
import Modal from "../components/Modal";
import ConfirmDialog from "../components/ConfirmDialog";
import { useToast } from "../context/ToastContext";

const emptyForm = {
  institution: "",
  degree: "",
  fieldOfStudy: "",
  startYear: "",
  endYear: "",
  grade: "",
  location: "",
};

const toFormState = (item) => ({
  institution: item.institution || "",
  degree: item.degree || "",
  fieldOfStudy: item.fieldOfStudy || "",
  startYear: item.startYear ?? "",
  endYear: item.endYear ?? "",
  grade: item.grade || "",
  location: item.location || "",
});

const Education = () => {
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
      setItems(await educationApi.getAll());
    } catch {
      toast.push("Couldn't load education entries.", "error");
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
    if (
      !form.institution.trim() ||
      !form.degree.trim() ||
      !form.fieldOfStudy.trim() ||
      !form.startYear ||
      !form.endYear
    ) {
      setFormError("Institution, degree, field of study, start year and end year are required.");
      return;
    }

    const payload = {
      institution: form.institution.trim(),
      degree: form.degree.trim(),
      fieldOfStudy: form.fieldOfStudy.trim(),
      startYear: Number(form.startYear),
      endYear: Number(form.endYear),
      grade: form.grade.trim(),
      location: form.location.trim(),
    };

    setSaving(true);
    setFormError("");
    try {
      if (editing?._id) {
        const res = await educationApi.update(editing._id, payload);
        setItems((prev) => prev.map((i) => (i._id === editing._id ? res.data : i)));
        toast.push("Education entry updated.");
      } else {
        const res = await educationApi.create(payload);
        setItems((prev) => [...prev, res.data]);
        toast.push("Education entry added.");
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
      await educationApi.remove(deleting._id);
      setItems((prev) => prev.filter((i) => i._id !== deleting._id));
      toast.push("Education entry deleted.");
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
        title="Education"
        description="Academic history shown on the site."
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
          title="No education entries yet"
          body="Add a degree or course to show it on the site."
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
                <th>Institution</th>
                <th>Degree</th>
                <th>Years</th>
                <th aria-label="actions" />
              </tr>
            </thead>
            <tbody>
              {items.map((i) => (
                <tr key={i._id}>
                  <td>
                    <strong>{i.institution}</strong>
                    <div className="muted small">{i.location}</div>
                  </td>
                  <td>
                    {i.degree}
                    <div className="muted small">{i.fieldOfStudy}</div>
                  </td>
                  <td className="muted small">
                    {i.startYear} – {i.endYear}
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
        <Modal title={editing._id ? "Edit education" : "New education"} onClose={() => setEditing(null)}>
          <form className="admin-form" onSubmit={handleSubmit}>
            <label className="form-field">
              <span>Institution *</span>
              <input value={form.institution} onChange={handleChange("institution")} />
            </label>

            <div className="form-row">
              <label className="form-field">
                <span>Degree *</span>
                <input value={form.degree} onChange={handleChange("degree")} placeholder="B.Tech" />
              </label>
              <label className="form-field">
                <span>Field of study *</span>
                <input value={form.fieldOfStudy} onChange={handleChange("fieldOfStudy")} placeholder="Computer Science" />
              </label>
            </div>

            <div className="form-row">
              <label className="form-field">
                <span>Start year *</span>
                <input type="number" value={form.startYear} onChange={handleChange("startYear")} />
              </label>
              <label className="form-field">
                <span>End year *</span>
                <input type="number" value={form.endYear} onChange={handleChange("endYear")} />
              </label>
            </div>

            <div className="form-row">
              <label className="form-field">
                <span>Grade</span>
                <input value={form.grade} onChange={handleChange("grade")} placeholder="8.5 CGPA" />
              </label>
              <label className="form-field">
                <span>Location</span>
                <input value={form.location} onChange={handleChange("location")} />
              </label>
            </div>

            {formError && <p className="form-error">{formError}</p>}

            <div className="form-actions">
              <button type="button" className="btn btn-ghost" onClick={() => setEditing(null)}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? "Saving…" : editing._id ? "Save changes" : "Add education"}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {deleting && (
        <ConfirmDialog
          body={`Delete the "${deleting.degree}" entry at ${deleting.institution}?`}
          onCancel={() => setDeleting(null)}
          onConfirm={handleDelete}
          busy={busy}
        />
      )}
    </>
  );
};

export default Education;
