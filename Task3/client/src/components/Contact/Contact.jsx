import { useState } from "react";
import contactApi from "../../api/contactApi";
import socialApi from "../../api/socialApi";
import useFetch from "../../hooks/useFetch";
import Reveal from "../Reveal/Reveal";
import "./Contact.css";

const initialForm = { name: "", email: "", subject: "", message: "" };

function Contact() {
  const { data: social } = useFetch(() => socialApi.get(), []);

  const [form, setForm] = useState(initialForm);
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [feedback, setFeedback] = useState("");

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const handleBlur = (e) => setTouched((t) => ({ ...t, [e.target.name]: true }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, subject: true, message: true });

    const { name, email, subject, message } = form;
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setStatus("error");
      setFeedback("Please fill in every field before sending.");
      return;
    }

    setStatus("sending");
    setFeedback("");

    try {
      const res = await contactApi.send({
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim(),
        message: message.trim(),
      });
      setStatus("success");
      setFeedback(res?.message || "Message sent successfully.");
      setForm(initialForm);
      setTouched({});
    } catch (err) {
      setStatus("error");
      setFeedback(err?.response?.data?.message || "Could not reach the server.");
    }
  };

  const contactLinks = [
    { key: "email", label: social?.email, href: social?.email ? `mailto:${social.email}` : null },
    { key: "phone", label: social?.phone, href: social?.phone ? `tel:${social.phone}` : null },
    { key: "github", label: "GitHub", href: social?.github },
    { key: "linkedin", label: "LinkedIn", href: social?.linkedin },
    { key: "portfolio", label: "Portfolio", href: social?.portfolio },
    { key: "twitter", label: "Twitter", href: social?.twitter },
    { key: "instagram", label: "Instagram", href: social?.instagram },
  ].filter((l) => l.href);

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <Reveal className="section-head">
          <p className="section-tag">Get in touch</p>
          <h2 className="section-title">Contact</h2>
          <p className="section-sub">Have a project in mind or just want to say hi? Send a message.</p>
        </Reveal>

        <div className="contact-grid">
          <Reveal className="card contact-form-card">
            <form onSubmit={handleSubmit} noValidate>
              <div className="field">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={touched.name && !form.name.trim() ? "invalid" : ""}
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={touched.email && !form.email.trim() ? "invalid" : ""}
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="subject">Subject</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="What's this about?"
                  value={form.subject}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={touched.subject && !form.subject.trim() ? "invalid" : ""}
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Tell me a bit more…"
                  value={form.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={touched.message && !form.message.trim() ? "invalid" : ""}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary contact-submit" disabled={status === "sending"}>
                {status === "sending" && <span className="btn-spinner" aria-hidden="true" />}
                {status === "sending" ? "Sending…" : "Send Message"}
              </button>

              {feedback && (
                <p className={`contact-feedback ${status === "error" ? "is-error" : "is-success"}`}>{feedback}</p>
              )}
            </form>
          </Reveal>

          <Reveal className="contact-side" delay={100}>
            <h3>Other ways to reach me</h3>
            <ul className="contact-links">
              {contactLinks.map((l) => (
                <li key={l.key}>
                  <a href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default Contact;
