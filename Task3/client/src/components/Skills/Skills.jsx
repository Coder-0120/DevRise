import skillsApi from "../../api/skillsApi";
import useFetch from "../../hooks/useFetch";
import Loader from "../Loader/Loader";
import Reveal from "../Reveal/Reveal";
import "./Skills.css";

function Skills() {
  const { data: skillGroups, loading, error } = useFetch(() => skillsApi.getAll(), []);

  return (
    <section id="skills" className="section skills">
      <div className="container">
        <Reveal className="section-head">
          <p className="section-tag">What I work with</p>
          <h2 className="section-title">Skills</h2>
          <p className="section-sub">Tools and technologies I use to build end-to-end products.</p>
        </Reveal>

        {loading && <Loader label="Loading skills" />}
        {error && !loading && <p className="skills-error">{error}</p>}

        <div className="skills-grid">
          {skillGroups?.map((group, gi) => (
            <Reveal key={group._id || group.category} className="card skill-card" delay={gi * 80}>
              <h3 className="skill-category">{group.category}</h3>
              <div className="skill-list">
                {group.skills?.map((skill) => (
                  <div className="skill-item" key={skill.name}>
                    <div className="skill-item-head">
                      <span>{skill.name}</span>
                      <span className="skill-level">{skill.level}%</span>
                    </div>
                    <div className="skill-bar-track">
                      <div className="skill-bar-fill" style={{ width: `${skill.level}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
