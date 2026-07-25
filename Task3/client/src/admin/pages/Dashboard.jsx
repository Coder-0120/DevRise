import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import contactApi from "../../api/contactApi";
import projectsApi from "../../api/projectsApi";
import skillsApi from "../../api/skillsApi";
import experienceApi from "../../api/experienceApi";
import educationApi from "../../api/educationApi";
import certificatesApi from "../../api/certificatesApi";
import { PageHeader, StatCard, Spinner } from "../components/UI";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [recentContacts, setRecentContacts] = useState([]);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      const results = await Promise.allSettled([
        contactApi.getAll(),
        projectsApi.getAll(),
        skillsApi.getAll(),
        experienceApi.getAll(),
        educationApi.getAll(),
        certificatesApi.getAll(),
      ]);

      if (cancelled) return;

      const [contacts, projects, skills, experience, education, certificates] = results.map((r) =>
        r.status === "fulfilled" ? r.value : []
      );

      setStats({
        contacts: contacts.length,
        projects: projects.length,
        skills: skills.length,
        experience: experience.length,
        education: education.length,
        certificates: certificates.length,
      });
      setRecentContacts(contacts.slice(0, 5));
      setLoading(false);
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) return <Spinner />;

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="A quick look at what's in the portfolio right now."
      />

      <div className="stat-grid">
        <StatCard label="Messages received" value={stats.contacts} icon="✉" />
        <StatCard label="Projects" value={stats.projects} icon="▣" />
        <StatCard label="Skill categories" value={stats.skills} icon="◈" />
        <StatCard label="Experience entries" value={stats.experience} icon="▲" />
        <StatCard label="Education entries" value={stats.education} icon="▽" />
        <StatCard label="Certificates" value={stats.certificates} icon="▤" />
      </div>

      <div className="panel">
        <div className="panel-head">
          <h2>Recent messages</h2>
          <Link to="/admin/contacts" className="link-arrow">
            View all contacts →
          </Link>
        </div>

        {recentContacts.length === 0 ? (
          <p className="muted">No messages yet — new contact form submissions will show up here.</p>
        ) : (
          <ul className="recent-contact-list">
            {recentContacts.map((c) => (
              <li key={c._id}>
                <div>
                  <strong>{c.name}</strong>
                  <span className="muted"> · {c.email}</span>
                </div>
                <p className="truncate">{c.subject}</p>
                <span className="muted small">
                  {c.createdAt ? new Date(c.createdAt).toLocaleString() : ""}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Dashboard;
