import aboutApi from "../../api/aboutApi";
import useFetch from "../../hooks/useFetch";
import Loader from "../Loader/Loader";
import "./Hero.css";

function Hero() {
  const { data: about, loading, error } = useFetch(() => aboutApi.get(), []);

  return (
    <section id="home" className="hero">
      <div className="hero-glow hero-glow-a" />
      <div className="hero-glow hero-glow-b" />

      <div className="container hero-inner">
        {loading && <Loader label="Loading profile" />}
        {error && !loading && <p className="hero-error">{error}</p>}

        {about && !loading && (
          <>
            <p className="hero-eyebrow">Hi, I'm</p>
            <h1 className="hero-name">
              <span className="gradient-text">{about.name}</span>
            </h1>
            <h2 className="hero-title">{about.title}</h2>
            <p className="hero-desc">{about.description}</p>

            <div className="hero-actions">
              <a href="#projects" className="btn btn-primary">
                View Projects
              </a>
              <a href="#contact" className="btn btn-outline">
                Contact Me
              </a>
            </div>

            {about.email && (
              <a href={`mailto:${about.email}`} className="hero-email">
                {about.email}
              </a>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default Hero;
