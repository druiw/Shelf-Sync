import "./ui.css";

// Small presentational building blocks shared by every page so the dashboard
// stays visually consistent.

export const PageHeader = ({ title, subtitle, actions }) => (
  <header className="page-header">
    <div>
      <h1 className="page-title">{title}</h1>
      {subtitle && <p className="page-subtitle">{subtitle}</p>}
    </div>
    {actions && <div className="page-actions">{actions}</div>}
  </header>
);

export const Card = ({ title, action, children, className = "" }) => (
  <section className={`card ${className}`}>
    {(title || action) && (
      <div className="card-head">
        {title && <h2 className="card-title">{title}</h2>}
        {action}
      </div>
    )}
    {children}
  </section>
);

export const Badge = ({ tone = "neutral", children }) => (
  <span className={`badge badge-${tone}`}>{children}</span>
);

export const StatCard = ({ label, value, hint, icon, tone = "primary" }) => (
  <div className="stat-card">
    <div className={`stat-icon stat-icon-${tone}`} aria-hidden="true">
      {icon}
    </div>
    <div className="stat-body">
      <span className="stat-label">{label}</span>
      <span className="stat-value">{value}</span>
      {hint && <span className="stat-hint">{hint}</span>}
    </div>
  </div>
);

export const EmptyState = ({ title, message, action }) => (
  <div className="empty-state">
    <div className="empty-emoji" aria-hidden="true">
      📭
    </div>
    <h3>{title}</h3>
    {message && <p>{message}</p>}
    {action}
  </div>
);
