import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";

const Login = () => {
  const { isAuthenticated, login, loading, error, setError } = useAdminAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  if (isAuthenticated) {
    const dest = location.state?.from || "/admin/dashboard";
    return <Navigate to={dest} replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setError("Enter both username and password.");
      return;
    }
    const ok = await login(username.trim(), password);
    if (ok) navigate("/admin/dashboard", { replace: true });
  };

  return (
    <div className="admin-login">
      <div className="admin-login-card">
        <div className="admin-login-brand">
          <span className="admin-brand-mark">DR</span>
          <div>
            <strong>DevRise</strong>
            <span>Admin console</span>
          </div>
        </div>

        <h1>Sign in</h1>
        <p className="admin-login-sub">Manage contacts, projects, skills and the rest of the portfolio.</p>

        <form onSubmit={handleSubmit} className="admin-form">
          <label className="form-field">
            <span>Username</span>
            <input
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              autoFocus
            />
          </label>

          <label className="form-field">
            <span>Password</span>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </label>

          {error && <p className="form-error">{error}</p>}

          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
