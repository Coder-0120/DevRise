import Modal from "./Modal";

const ConfirmDialog = ({ title = "Delete this item?", body, onCancel, onConfirm, busy }) => {
  return (
    <Modal title={title} onClose={onCancel} width={420}>
      <p className="confirm-body">{body}</p>
      <div className="form-actions">
        <button type="button" className="btn btn-ghost" onClick={onCancel} disabled={busy}>
          Cancel
        </button>
        <button type="button" className="btn btn-danger" onClick={onConfirm} disabled={busy}>
          {busy ? "Deleting…" : "Delete"}
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
