import { experience, leadership } from "../data.js";
import { SectionHead, useScope } from "../utils.jsx";

export default function Experience() {
  const ref = useScope();
  return (
    <section className="section" id="experience" ref={ref}>
      <div className="container">
        <SectionHead kicker="Experience" title="Where I've worked" />

        <div className="xp-list">
          {experience.map((e) => (
            <article className="card xp reveal" key={e.role}>
              <div className="xp-side">
                <span className="pill">{e.dates}</span>
                <span className="muted small">{e.place}</span>
              </div>
              <div>
                <h3>{e.role}</h3>
                <p className="xp-org">{e.org}</p>
                <ul className="work-points">
                  {e.points.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <h3 className="sub reveal">Leadership & community</h3>
        <div className="lead-grid">
          {leadership.map((l) => (
            <article className="card lead-card reveal" key={l.role}>
              <span className="pill">{l.dates}</span>
              <h4>{l.role}</h4>
              <p className="xp-org">{l.org}</p>
              <p className="muted">{l.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
