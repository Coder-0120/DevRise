import { useEffect, useMemo, useState } from "react";
import contactApi from "../../api/contactApi";
import { PageHeader, EmptyState, Spinner } from "../components/UI";
import Modal from "../components/Modal";
import ConfirmDialog from "../components/ConfirmDialog";
import { useToast } from "../context/ToastContext";

const Contacts = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [query, setQuery] = useState("");
  const [viewing, setViewing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [busy, setBusy] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const data = await contactApi.getAll();
      setContacts(data);
    } catch {
      toast.push("Couldn't load contacts. Is the server running?", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return contacts;
    return contacts.filter(
      (c) =>
        c.name?.toLowerCase().includes(q) ||
        c.email?.toLowerCase().includes(q) ||
        c.subject?.toLowerCase().includes(q)
    );
  }, [contacts, query]);

  const handleDelete = async () => {
    if (!deleting) return;
    setBusy(true);
    try {
      await contactApi.remove(deleting._id);
      setContacts((prev) => prev.filter((c) => c._id !== deleting._id));
      toast.push("Message deleted.");
      setDeleting(null);
      if (viewing?._id === deleting._id) setViewing(null);
    } catch {
      toast.push("Couldn't delete this message.", "error");
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Contacts"
        description="Messages people have sent through the portfolio's contact form."
        action={
          <input
            className="search-input"
            placeholder="Search by name, email, subject…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        }
      />

      {loading ? (
        <Spinner />
      ) : filtered.length === 0 ? (
        <EmptyState
          title={contacts.length === 0 ? "No messages yet" : "No matches"}
          body={
            contacts.length === 0
              ? "When someone submits the contact form on the site, their message will appear here."
              : "Try a different search term."
          }
        />
      ) : (
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>From</th>
                <th>Subject</th>
                <th>Received</th>
                <th aria-label="actions" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c._id} onClick={() => setViewing(c)} className="row-clickable">
                  <td>
                    <strong>{c.name}</strong>
                    <div className="muted small">{c.email}</div>
                  </td>
                  <td className="truncate-cell">{c.subject}</td>
                  <td className="muted small">
                    {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "—"}
                  </td>
                  <td className="table-actions" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      className="btn btn-ghost btn-sm"
                      onClick={() => setViewing(c)}
                    >
                      View
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger-ghost btn-sm"
                      onClick={() => setDeleting(c)}
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

      {viewing && (
        <Modal title="Message" onClose={() => setViewing(null)}>
          <div className="contact-detail">
            <div className="contact-detail-row">
              <span className="muted small">From</span>
              <strong>{viewing.name}</strong>
            </div>
            <div className="contact-detail-row">
              <span className="muted small">Email</span>
              <a href={`mailto:${viewing.email}`}>{viewing.email}</a>
            </div>
            <div className="contact-detail-row">
              <span className="muted small">Subject</span>
              <strong>{viewing.subject}</strong>
            </div>
            <div className="contact-detail-row">
              <span className="muted small">Received</span>
              <span>{viewing.createdAt ? new Date(viewing.createdAt).toLocaleString() : "—"}</span>
            </div>
            <div className="contact-message">{viewing.message}</div>
          </div>
          <div className="form-actions">
            <button
              type="button"
              className="btn btn-danger-ghost"
              onClick={() => setDeleting(viewing)}
            >
              Delete message
            </button>
            <a className="btn btn-primary" href={`mailto:${viewing.email}`}>
              Reply by email
            </a>
          </div>
        </Modal>
      )}

      {deleting && (
        <ConfirmDialog
          title="Delete this message?"
          body={`This will permanently remove the message from "${deleting.name}". This can't be undone.`}
          onCancel={() => setDeleting(null)}
          onConfirm={handleDelete}
          busy={busy}
        />
      )}
    </>
  );
};

export default Contacts;
