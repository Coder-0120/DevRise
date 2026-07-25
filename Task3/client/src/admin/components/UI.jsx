export const PageHeader = ({ title, description, action }) => (
  <div className="admin-page-head">
    <div>
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </div>
    {action && <div className="admin-page-action">{action}</div>}
  </div>
);

export const EmptyState = ({ title, body, action }) => (
  <div className="empty-state">
    <h3>{title}</h3>
    {body && <p>{body}</p>}
    {action}
  </div>
);

export const StatCard = ({ label, value, icon }) => (
  <div className="stat-card">
    <span className="stat-icon">{icon}</span>
    <div>
      <p className="stat-value">{value}</p>
      <p className="stat-label">{label}</p>
    </div>
  </div>
);

export const Spinner = () => (
  <div className="admin-spinner" role="status" aria-label="Loading">
    <span />
  </div>
);
