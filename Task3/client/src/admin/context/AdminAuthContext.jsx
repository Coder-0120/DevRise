import { createContext, useContext, useEffect, useMemo, useState } from "react";
import authApi from "../../api/authApi";
import { ADMIN_TOKEN_KEY } from "../../api/axiosClient";

const AdminAuthContext = createContext(null);

// Decode a JWT payload client-side purely to read its expiry — this is a
// convenience check only, the server middleware is what actually enforces
// the token's validity/signature on every request.
function readExpiry(token) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp ? payload.exp * 1000 : null;
  } catch {
    return null;
  }
}

function isTokenUsable(token) {
  if (!token) return false;
  const exp = readExpiry(token);
  if (!exp) return true;
  return Date.now() < exp;
}

export const AdminAuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    const stored = localStorage.getItem(ADMIN_TOKEN_KEY);
    return isTokenUsable(stored) ? stored : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      localStorage.removeItem(ADMIN_TOKEN_KEY);
    } else {
      localStorage.setItem(ADMIN_TOKEN_KEY, token);
    }
  }, [token]);

  const login = async (username, password) => {
    setLoading(true);
    setError("");
    try {
      const res = await authApi.login(username, password);
      if (res?.success && res?.token) {
        setToken(res.token);
        return true;
      }
      setError(res?.message || "Invalid username or password.");
      return false;
    } catch (err) {
      setError(err.response?.data?.message || "Unable to reach the server. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => setToken(null);

  const value = useMemo(
    () => ({
      isAuthenticated: isTokenUsable(token),
      loading,
      error,
      setError,
      login,
      logout,
    }),
    [token, loading, error]
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
};

export const useAdminAuth = () => useContext(AdminAuthContext);
