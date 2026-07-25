import socialApi from "../../api/socialApi";
import useFetch from "../../hooks/useFetch";
import "./Footer.css";

function Footer() {
  const { data: social } = useFetch(() => socialApi.get(), []);

  const icons = [
    { key: "github", href: social?.github, label: "GH" },
    { key: "linkedin", href: social?.linkedin, label: "in" },
    { key: "leetcode", href: social?.leetcode, label: "LC" },
    { key: "twitter", href: social?.twitter, label: "X" },
    { key: "instagram", href: social?.instagram, label: "IG" },
  ].filter((i) => i.href);

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p className="footer-brand">
          Anshul<span className="gradient-text">Verma</span>
        </p>

        {icons.length > 0 && (
          <div className="footer-icons">
            {icons.map((i) => (
              <a key={i.key} href={i.href} target="_blank" rel="noreferrer" aria-label={i.key}>
                {i.label}
              </a>
            ))}
          </div>
        )}

        <p className="footer-copy">© {new Date().getFullYear()} All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
