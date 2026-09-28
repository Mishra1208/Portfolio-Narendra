import { services } from "../data.js";
import { SectionHead, useScope } from "../utils.jsx";

const ICONS = {
  agents: (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <circle cx="24" cy="10" r="6" />
      <circle cx="10" cy="36" r="6" />
      <circle cx="38" cy="36" r="6" />
      <path d="M21 15 13 31M27 15l8 16M16 36h16" />
    </svg>
  ),
  stack: (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <rect x="6" y="8" width="36" height="10" rx="3" />
      <rect x="6" y="22" width="36" height="10" rx="3" />
      <rect x="6" y="36" width="36" height="6" rx="3" />
      <path d="M12 13h8M12 27h14" />
    </svg>
  ),
  cube: (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M24 5 41 14v20L24 43 7 34V14z" />
      <path d="M7 14l17 9 17-9M24 23v20" />
    </svg>
  ),
};

export default function Services() {
  const ref = useScope();
  return (
    <section className="section" id="services" ref={ref}>
      <div className="container">
        <SectionHead kicker="What I do" title="Three things I'm good at" />
        <div className="svc-grid">
          {services.map((s) => (
            <article className="card svc reveal" key={s.title}>
              <span className="svc-icon" style={{ background: s.color }}>
                {ICONS[s.icon]}
              </span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
