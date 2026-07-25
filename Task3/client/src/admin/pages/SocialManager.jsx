import { useEffect, useState } from "react";
import socialApi from "../../api/socialApi";
import { PageHeader, Spinner } from "../components/UI";
import ConfirmDialog from "../components/ConfirmDialog";
import { useToast } from "../context/ToastContext";

const FIELDS = [
  { key: "github", label: "GitHub", placeholder: "https://github.com/username" },
  { key: "linkedin", label: "LinkedIn", placeholder: "https://linkedin.com/in/username" },
  { key: "leetcode", label: "LeetCode", placeholder: "https://leetcode.com/username" },
  { key: "portfolio", label: "Portfolio", placeholder: "https://yoursite.com" },
  { key: "email", label: "Email", placeholder: "you@example.com" },
  { key: "phone", label: "Phone", placeholder: "+1 555 000 0000" },
  { key: "twitter", label: "Twitter / X", placeholder: "https://x.com/username" },
  { key: "instagram", label: "Instagram", placeholder: "https://instagram.com/username" },
];

const emptyForm = Object.fromEntries(FIELDS.map((f) => [f.key, ""]));

const SocialManager = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [social, setSocial] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [busy, setBusy] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const data = await socialApi.get();
      setSocial(data);
      setForm(data ? Object.fromEntries(FIELDS.map((f) => [f.key, data[f.key] || ""])) : emptyForm);
    } catch {
      // 404 just means it hasn't been created yet
      setSocial(null);
      setForm(emptyForm);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFormError("");
    try {
      if (social?._id) {
        await socialApi.update(social._id, form);
        toast.push("Social links updated.");
      } else {
        await socialApi.create(form);
        toast.push("Social links created.");
      }
      await load();
    } catch (err) {
      setFormError(err.response?.data?.message || "Something went wrong saving social links.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!social?._id) return;
    setBusy(true);
    try {
      await socialApi.remove(social._id);
      toast.push("Social links deleted.");
      setDeleting(false);
      await load();
    } catch {
      toast.push("Couldn't delete social links.", "error");
    } finally {
      setBusy(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <>
      <PageHeader
        title="Social links"
        description="Links shown in the site's footer and header — there's a single record."
      />

      <div className="panel panel-narrow">
        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="form-row">
            {FIELDS.map((f) => (
              <label className="form-field" key={f.key}>
                <span>{f.label}</span>
                <input
                  value={form[f.key]}
                  onChange={handleChange(f.key)}
                  placeholder={f.placeholder}
                />
              </label>
            ))}
          </div>

          {formError && <p className="form-error">{formError}</p>}

          <div className="form-actions">
            {social?._id && (
              <button type="button" className="btn btn-danger-ghost" onClick={() => setDeleting(true)}>
                Delete
              </button>
            )}
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? "Saving…" : social?._id ? "Save changes" : "Create social links"}
            </button>
          </div>
        </form>
      </div>

      {deleting && (
        <ConfirmDialog
          body="Delete all social links? The public site will show none until you add them again."
          onCancel={() => setDeleting(false)}
          onConfirm={handleDelete}
          busy={busy}
        />
      )}
    </>
  );
};

export default SocialManager;
