import { useEffect, useState } from "react";
import certificatesApi from "../../api/certificatesApi";
import { PageHeader, EmptyState, Spinner } from "../components/UI";
import Modal from "../components/Modal";
import ConfirmDialog from "../components/ConfirmDialog";
import { useToast } from "../context/ToastContext";

const emptyForm = {
  title: "",
  issuer: "",
  issueDate: "",
  credentialId: "",
  credentialLink: "",
  image: "",
};

const toFormState = (item) => ({
  title: item.title || "",
  issuer: item.issuer || "",
  issueDate: item.issueDate || "",
  credentialId: item.credentialId || "",
  credentialLink: item.credentialLink || "",
  image: item.image || "",
});

const Certificates = () => {
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
      setItems(await certificatesApi.getAll());
    } catch {
      toast.push("Couldn't load certificates.", "error");
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
    if (!form.title.trim() || !form.issuer.trim() || !form.issueDate.trim()) {
      setFormError("Title, issuer and issue date are required.");
      return;
    }

    const payload = {
      title: form.title.trim(),
      issuer: form.issuer.trim(),
      issueDate: form.issueDate.trim(),
      credentialId: form.credentialId.trim(),
      credentialLink: form.credentialLink.trim(),
      image: form.image.trim(),
    };

    setSaving(true);
    setFormError("");
    try {
      if (editing?._id) {
        const res = await certificatesApi.update(editing._id, payload);
        setItems((prev) => prev.map((i) => (i._id === editing._id ? res.data : i)));
        toast.push("Certificate updated.");
      } else {
        const res = await certificatesApi.create(payload);
        setItems((prev) => [...prev, res.data]);
        toast.push("Certificate added.");
      }
      setEditing(null);
    } catch (err) {
      setFormError(err.response?.data?.message || "Something went wrong saving this certificate.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleting) return;
    setBusy(true);
    try {
      await certificatesApi.remove(deleting._id);
      setItems((prev) => prev.filter((i) => i._id !== deleting._id));
      toast.push("Certificate deleted.");
      setDeleting(null);
    } catch {
      toast.push("Couldn't delete this certificate.", "error");
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Certificates"
        description="Certifications and credentials shown on the site."
        action={
          <button type="button" className="btn btn-primary" onClick={openCreate}>
            + New certificate
          </button>
        }
      />

      {loading ? (
        <Spinner />
      ) : items.length === 0 ? (
        <EmptyState
          title="No certificates yet"
          body="Add a certification to show it on the site."
          action={
            <button type="button" className="btn btn-primary" onClick={openCreate}>
              + New certificate
            </button>
          }
        />
      ) : (
        <div className="card-grid">
          {items.map((c) => (
            <div className="admin-card" key={c._id}>
              <div className="admin-card-head">
                <h3>{c.title}</h3>
              </div>
              <p className="admin-card-desc">
                {c.issuer} · {c.issueDate}
              </p>
              {c.credentialId && <p className="muted small">ID: {c.credentialId}</p>}
              {c.credentialLink && (
                <a
                  className="link-arrow"
                  href={c.credentialLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  View credential →
                </a>
              )}
              <div className="admin-card-actions">
                <button type="button" className="btn btn-ghost btn-sm" onClick={() => openEdit(c)}>
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-danger-ghost btn-sm"
                  onClick={() => setDeleting(c)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <Modal
          title={editing._id ? "Edit certificate" : "New certificate"}
          onClose={() => setEditing(null)}
        >
          <form className="admin-form" onSubmit={handleSubmit}>
            <label className="form-field">
              <span>Title *</span>
              <input value={form.title} onChange={handleChange("title")} />
            </label>

            <div className="form-row">
              <label className="form-field">
                <span>Issuer *</span>
                <input value={form.issuer} onChange={handleChange("issuer")} placeholder="Coursera" />
              </label>
              <label className="form-field">
                <span>Issue date *</span>
                <input
                  value={form.issueDate}
                  onChange={handleChange("issueDate")}
                  placeholder="March 2025"
                />
              </label>
            </div>

            <div className="form-row">
              <label className="form-field">
                <span>Credential ID</span>
                <input value={form.credentialId} onChange={handleChange("credentialId")} />
              </label>
              <label className="form-field">
                <span>Credential link</span>
                <input value={form.credentialLink} onChange={handleChange("credentialLink")} placeholder="https://…" />
              </label>
            </div>

            <label className="form-field">
              <span>Image URL</span>
              <input value={form.image} onChange={handleChange("image")} placeholder="https://…" />
            </label>

            {formError && <p className="form-error">{formError}</p>}

            <div className="form-actions">
              <button type="button" className="btn btn-ghost" onClick={() => setEditing(null)}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? "Saving…" : editing._id ? "Save changes" : "Add certificate"}
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

export default Certificates;
