import { useState } from "react";
import { profile } from "../data.js";
import { scrollToId, useScope } from "../utils.jsx";

export default function Contact() {
  const ref = useScope();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section className="section contact" id="contact" ref={ref}>
      <div className="container">
        <div className="contact-card reveal">
          <p className="kicker">Contact</p>
          <h2>Let's build something.</h2>
          <p className="contact-text">
            I'm looking for software engineering and AI roles where I can ship real products. Got a role, an idea, or just
            want to talk graphs and agents? My inbox is open.
          </p>
          <div className="contact-actions">
            <a className="btn btn-ink btn-lg" href={`mailto:${profile.email}`}>
              Say hello →
            </a>
            <button className="btn btn-white btn-lg" onClick={copy}>
              <span aria-live="polite">{copied ? "Copied ✓" : profile.email}</span>
            </button>
          </div>
          <div className="socials">
            <a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a href={profile.resume} target="_blank" rel="noreferrer">Résumé ↗</a>
            <span>{profile.phone}</span>
          </div>
        </div>

        <footer className="footer">
          <span>© {new Date().getFullYear()} Narendra Mishra · React, GSAP & Three.js</span>
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("top");
            }}
          >
            Back to top ↑
          </a>
        </footer>
      </div>
    </section>
  );
}
