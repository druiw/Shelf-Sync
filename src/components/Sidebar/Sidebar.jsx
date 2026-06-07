import { NavLink } from "react-router-dom";
import "./Sidebar.css";

// Minimal inline icons (no extra dependencies).
const Icon = ({ d }) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {d}
  </svg>
);

const NAV = [
  { to: "/", label: "Dashboard", end: true, icon: <Icon d={<><rect x="3" y="3" width="7" height="9" /><rect x="14" y="3" width="7" height="5" /><rect x="14" y="12" width="7" height="9" /><rect x="3" y="16" width="7" height="5" /></>} /> },
  { to: "/inventory", label: "Inventory", icon: <Icon d={<><path d="M3 7l9-4 9 4-9 4-9-4z" /><path d="M3 7v10l9 4 9-4V7" /><path d="M12 11v10" /></>} /> },
  { to: "/orders", label: "Orders", icon: <Icon d={<><path d="M6 2l1.5 3h9L18 2" /><path d="M3 6h18l-1.5 14H4.5L3 6z" /><path d="M9 11h6" /></>} /> },
  { to: "/products", label: "Products", icon: <Icon d={<><path d="M20 7l-8-4-8 4 8 4 8-4z" /><path d="M4 7v10l8 4 8-4V7" /></>} /> },
  { to: "/customers", label: "Customers", icon: <Icon d={<><circle cx="9" cy="8" r="3.2" /><path d="M3 20a6 6 0 0112 0" /><path d="M16 5a3 3 0 010 6" /><path d="M17 20a6 6 0 00-2-4.5" /></>} /> },
];

const Sidebar = () => (
  <aside className="sidebar">
    <div className="brand">
      <span className="brand-mark" aria-hidden="true">📦</span>
      <span className="brand-text">
        Order<span className="brand-accent">Dashboard</span>
      </span>
    </div>

    <nav className="nav">
      {NAV.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          className={({ isActive }) =>
            `nav-link${isActive ? " active" : ""}`
          }
        >
          <span className="nav-icon">{item.icon}</span>
          {item.label}
        </NavLink>
      ))}
    </nav>

    <div className="sidebar-footer">
      <div className="demo-pill">Demo mode</div>
      <p className="footer-note">Sample data, saved in your browser.</p>
    </div>
  </aside>
);

export default Sidebar;
