import certificatesApi from "../../api/certificatesApi";
import useFetch from "../../hooks/useFetch";
import Loader from "../Loader/Loader";
import Reveal from "../Reveal/Reveal";
import "./Certificates.css";

function Certificates() {
  const { data: certificates, loading, error } = useFetch(() => certificatesApi.getAll(), []);

  return (
    <section id="certificates" className="section certificates">
      <div className="container">
        <Reveal className="section-head">
          <p className="section-tag">Proof of learning</p>
          <h2 className="section-title">Certificates</h2>
          <p className="section-sub">Courses and credentials I've completed along the way.</p>
        </Reveal>

        {loading && <Loader label="Loading certificates" />}
        {error && !loading && <p className="certificates-error">{error}</p>}

        <div className="certificates-grid">
          {certificates?.map((cert, i) => (
            <Reveal key={cert._id} className="card certificate-card" delay={i * 70}>
              {cert.image && (
                <div className="certificate-image">
                  <img src={cert.image} alt={cert.title} loading="lazy" />
                </div>
              )}
              <div className="certificate-body">
                <h3>{cert.title}</h3>
                <p className="certificate-issuer">{cert.issuer}</p>
                <p className="certificate-date">{cert.issueDate}</p>
                {cert.credentialLink && (
                  <a href={cert.credentialLink} target="_blank" rel="noreferrer" className="certificate-link">
                    View credential →
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Certificates;
