import projectsApi from "../../api/projectsApi";
import useFetch from "../../hooks/useFetch";
import Loader from "../Loader/Loader";
import Reveal from "../Reveal/Reveal";
import "./Projects.css";

function Projects() {
  const { data: projects, loading, error } = useFetch(() => projectsApi.getAll(), []);

  const sorted = projects
    ? [...projects].sort((a, b) => (b.featured === a.featured ? a.order - b.order : b.featured - a.featured))
    : [];

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <Reveal className="section-head">
          <p className="section-tag">Selected work</p>
          <h2 className="section-title">Projects</h2>
          <p className="section-sub">A few things I've built, from idea to deployment.</p>
        </Reveal>

        {loading && <Loader label="Loading projects" />}
        {error && !loading && <p className="projects-error">{error}</p>}

        <div className="projects-grid">
          {sorted.map((project, i) => (
            <Reveal key={project._id} className="card project-card" delay={i * 80}>
              {project.featured && <span className="featured-badge">Featured</span>}

              {project.image && (
                <div className="project-image">
                  <img src={project.image} alt={project.title} loading="lazy" />
                </div>
              )}

              <div className="project-body">
                <h3>{project.title}</h3>
                <p className="project-desc">{project.description}</p>

                {project.techStack?.length > 0 && (
                  <div className="tag-list">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                <div className="project-links">
                  <a href={project.github} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">
                    GitHub
                  </a>
                  {project.liveDemo && (
                    <a href={project.liveDemo} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
