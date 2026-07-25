import { useEffect, useState } from "react";
import aboutApi from "../../api/aboutApi";
import { PageHeader, Spinner } from "../components/UI";
import ConfirmDialog from "../components/ConfirmDialog";
import { useToast } from "../context/ToastContext";

const emptyForm = { name: "", title: "", description: "", email: "" };

const AboutManager = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [about, setAbout] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [busy, setBusy] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const data = await aboutApi.get();
      setAbout(data || null);
      setForm(
        data
          ? { name: data.name, title: data.title, description: data.description, email: data.email }
          : emptyForm
      );
    } catch {
      toast.push("Couldn't load the about section.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.title.trim() || !form.description.trim() || !form.email.trim()) {
      setFormError("All fields are required.");
      return;
    }

    const payload = {
      name: form.name.trim(),
      title: form.title.trim(),
      description: form.description.trim(),
      email: form.email.trim(),
    };

    setSaving(true);
    setFormError("");
    try {
      if (about?._id) {
        await aboutApi.update(payload);
        toast.push("About section updated.");
      } else {
        await aboutApi.create(payload);
        toast.push("About section created.");
      }
      await load();
    } catch (err) {
      setFormError(err.response?.data?.message || "Something went wrong saving the about section.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setBusy(true);
    try {
      await aboutApi.remove();
      toast.push("About section deleted.");
      setDeleting(false);
      await load();
    } catch {
      toast.push("Couldn't delete the about section.", "error");
    } finally {
      setBusy(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <>
      <PageHeader
        title="About"
        description="The profile shown in the site's about/hero section. There's a single record."
      />

      <div className="panel panel-narrow">
        <form className="admin-form" onSubmit={handleSubmit}>
          <label className="form-field">
            <span>Full name *</span>
            <input value={form.name} onChange={handleChange("name")} />
          </label>

          <label className="form-field">
            <span>Title / headline *</span>
            <input value={form.title} onChange={handleChange("title")} placeholder="Full Stack Developer" />
          </label>

          <label className="form-field">
            <span>Description *</span>
            <textarea rows={5} value={form.description} onChange={handleChange("description")} />
          </label>

          <label className="form-field">
            <span>Contact email *</span>
            <input type="email" value={form.email} onChange={handleChange("email")} />
          </label>

          {formError && <p className="form-error">{formError}</p>}

          <div className="form-actions">
            {about?._id && (
              <button
                type="button"
                className="btn btn-danger-ghost"
                onClick={() => setDeleting(true)}
              >
                Delete
              </button>
            )}
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? "Saving…" : about?._id ? "Save changes" : "Create about section"}
            </button>
          </div>
        </form>
      </div>

      {deleting && (
        <ConfirmDialog
          body="Delete the about section? The public site will show nothing until you create a new one."
          onCancel={() => setDeleting(false)}
          onConfirm={handleDelete}
          busy={busy}
        />
      )}
    </>
  );
};

export default AboutManager;
