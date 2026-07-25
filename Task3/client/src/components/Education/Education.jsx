import educationApi from "../../api/educationApi";
import useFetch from "../../hooks/useFetch";
import Loader from "../Loader/Loader";
import Reveal from "../Reveal/Reveal";
import "./Education.css";

function Education() {
  const { data: educations, loading, error } = useFetch(() => educationApi.getAll(), []);

  return (
    <section id="education" className="section education">
      <div className="container">
        <Reveal className="section-head">
          <p className="section-tag">Academic background</p>
          <h2 className="section-title">Education</h2>
          <p className="section-sub">Degrees, institutions, and the years behind them.</p>
        </Reveal>

        {loading && <Loader label="Loading education" />}
        {error && !loading && <p className="education-error">{error}</p>}

        <div className="education-grid">
          {educations?.map((edu, i) => (
            <Reveal key={edu._id} className="card education-card" delay={i * 80}>
              <div className="education-years">
                {edu.startYear} — {edu.endYear}
              </div>
              <h3>{edu.degree}</h3>
              <p className="education-field">{edu.fieldOfStudy}</p>
              <p className="education-institution">
                {edu.institution}
                {edu.location ? ` · ${edu.location}` : ""}
              </p>
              {edu.grade && <p className="education-grade">Grade: {edu.grade}</p>}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Education;
