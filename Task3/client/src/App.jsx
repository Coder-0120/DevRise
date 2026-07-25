import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./admin/pages/Login";
import Dashboard from "./admin/pages/Dashboard";
import Contacts from "./admin/pages/Contacts";
import AboutManager from "./admin/pages/AboutManager";
import Projects from "./admin/pages/Projects";
import Skills from "./admin/pages/Skills";
import Experience from "./admin/pages/Experience";
import Education from "./admin/pages/Education";
import Certificates from "./admin/pages/Certificates";
import SocialManager from "./admin/pages/SocialManager";
import ProtectedRoute from "./admin/components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/admin/login" element={<Login />} />

      <Route path="/admin" element={<ProtectedRoute />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="about" element={<AboutManager />} />
        <Route path="projects" element={<Projects />} />
        <Route path="skills" element={<Skills />} />
        <Route path="experience" element={<Experience />} />
        <Route path="education" element={<Education />} />
        <Route path="certificates" element={<Certificates />} />
        <Route path="social" element={<SocialManager />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
