import { Navigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";
import AdminLayout from "./AdminLayout";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAdminAuth();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <AdminLayout />;
};

export default ProtectedRoute;
