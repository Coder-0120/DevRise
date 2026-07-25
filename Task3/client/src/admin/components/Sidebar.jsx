import { NavLink } from "react-router-dom";

const NAV_GROUPS = [
  {
    label: "Overview",
    items: [{ to: "/admin/dashboard", label: "Dashboard", icon: "◆" }],
  },
  {
    label: "Inbox",
    items: [{ to: "/admin/contacts", label: "Contacts", icon: "✉" }],
  },
  {
    label: "Portfolio content",
    items: [
      { to: "/admin/about", label: "About", icon: "●" },
      { to: "/admin/projects", label: "Projects", icon: "▣" },
      { to: "/admin/skills", label: "Skills", icon: "◈" },
      { to: "/admin/experience", label: "Experience", icon: "▲" },
      { to: "/admin/education", label: "Education", icon: "▽" },
      { to: "/admin/certificates", label: "Certificates", icon: "▤" },
      { to: "/admin/social", label: "Social links", icon: "◎" },
    ],
  },
];

const Sidebar = ({ onNavigate }) => (
  <aside className="admin-sidebar">
    <div className="admin-brand">
      <span className="admin-brand-mark">DR</span>
      <div>
        <strong>DevRise</strong>
        <span>Admin console</span>
      </div>
    </div>

    <nav className="admin-nav">
      {NAV_GROUPS.map((group) => (
        <div className="admin-nav-group" key={group.label}>
          <p className="admin-nav-label">{group.label}</p>
          {group.items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              className={({ isActive }) => "admin-nav-link" + (isActive ? " active" : "")}
            >
              <span className="admin-nav-icon">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </div>
      ))}
    </nav>
  </aside>
);

export default Sidebar;
