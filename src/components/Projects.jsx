import { projects, profile } from "../data.js";
import { SectionHead, useScope } from "../utils.jsx";
import { AgentsVisual, DagVisual, OrbitVisual } from "./ProjectVisuals.jsx";

const VISUALS = { agents: AgentsVisual, dag: DagVisual, orbit: OrbitVisual };

export default function Projects() {
  const ref = useScope();

  return (
    <section className="section" id="work" ref={ref}>
      <div className="container">
        <SectionHead kicker="Selected work" title="Things I've built and shipped" />

        <div className="work-list">
          {projects.map((p, i) => {
            const Visual = VISUALS[p.visual];
            return (
              <article className={`card work reveal ${i % 2 ? "flip" : ""}`} key={p.id}>
                <div className="work-visual" style={{ background: p.accent }}>
                  <div className="work-screen">
                    <Visual />
                  </div>
                </div>
                <div className="work-info">
                  <div className="work-meta">
                    <span className="mono">{p.index}</span>
                    <span className="pill">{p.dates}</span>
                  </div>
                  <h3>{p.name}</h3>
                  <p className="work-kicker">{p.kicker}</p>
                  <ul className="work-points">
                    {p.points.map((pt, k) => (
                      <li key={k}>{pt}</li>
                    ))}
                  </ul>
                  <div className="chips">
                    {p.stack.map((s) => (
                      <span className="chip" key={s}>
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="work-links">
                    {p.live && (
                      <a href={p.live} target="_blank" rel="noreferrer" className="btn btn-ink">
                        Live app ↗
                      </a>
                    )}
                    {p.github && (
                      <a href={p.github} target="_blank" rel="noreferrer" className="btn btn-white">
                        Source code ↗
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <p className="more reveal">
          More on{" "}
          <a href={profile.github} target="_blank" rel="noreferrer">
            github.com/Mishra1208 ↗
          </a>
        </p>
      </div>
    </section>
  );
}
