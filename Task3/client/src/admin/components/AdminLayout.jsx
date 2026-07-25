import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAdminAuth } from "../context/AdminAuthContext";
import { useTheme } from "../../context/ThemeContext";

const AdminLayout = () => {
  const { logout } = useAdminAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className={"admin-shell" + (menuOpen ? " nav-open" : "")}>
      <Sidebar onNavigate={() => setMenuOpen(false)} />
      <div className="admin-scrim" onClick={() => setMenuOpen(false)} />

      <div className="admin-main">
        <header className="admin-topbar">
          <button
            type="button"
            className="icon-btn admin-menu-btn"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle navigation"
          >
            ☰
          </button>

          <div className="admin-topbar-spacer" />

          <button type="button" className="icon-btn" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === "dark" ? "☀" : "☾"}
          </button>
          <button type="button" className="btn btn-ghost btn-sm" onClick={handleLogout}>
            Log out
          </button>
        </header>

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
