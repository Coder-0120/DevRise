import experienceApi from "../../api/experienceApi";
import useFetch from "../../hooks/useFetch";
import Loader from "../Loader/Loader";
import Reveal from "../Reveal/Reveal";
import "./Experience.css";

function formatDate(dateStr) {
  if (!dateStr) return "Present";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function Experience() {
  const { data: experiences, loading, error } = useFetch(() => experienceApi.getAll(), []);

  return (
    <section id="experience" className="section experience">
      <div className="container">
        <Reveal className="section-head">
          <p className="section-tag">Where I've worked</p>
          <h2 className="section-title">Experience</h2>
          <p className="section-sub">A timeline of roles, responsibilities, and the stacks behind them.</p>
        </Reveal>

        {loading && <Loader label="Loading experience" />}
        {error && !loading && <p className="experience-error">{error}</p>}

        <div className="timeline">
          {experiences?.map((exp, i) => (
            <Reveal key={exp._id} className="timeline-item" delay={i * 90}>
              <div className="timeline-dot" />
              <div className="card timeline-card">
                <div className="timeline-card-head">
                  <h3>{exp.role}</h3>
                  <span className="timeline-dates">
                    {formatDate(exp.startDate)} — {formatDate(exp.endDate)}
                  </span>
                </div>
                <p className="timeline-company">
                  {exp.company}
                  {exp.location ? ` · ${exp.location}` : ""}
                </p>
                <p className="timeline-desc">{exp.description}</p>
                {exp.techStack?.length > 0 && (
                  <div className="tag-list">
                    {exp.techStack.map((tech) => (
                      <span key={tech} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
