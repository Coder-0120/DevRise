import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "./admin/admin.css";
import App from "./App.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { AdminAuthProvider } from "./admin/context/AdminAuthContext.jsx";
import { ToastProvider } from "./admin/context/ToastContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <AdminAuthProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </AdminAuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
