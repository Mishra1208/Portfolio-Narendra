import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { profile, stats, education, skills } from "../data.js";
import { MOTION, SectionHead, useReveal } from "../utils.jsx";

const TILE = ["var(--yellow)", "var(--lilac)", "var(--pink)", "var(--teal)"];

export default function About() {
  const ref = useRef(null);
  useReveal(ref);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        gsap.utils.toArray(".stat-num").forEach((el) => {
          const end = +el.dataset.value;
          const o = { v: 0 };
          el.textContent = "0";
          gsap.to(o, {
            v: end,
            duration: 1.6,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%" },
            onUpdate: () => (el.textContent = Math.round(o.v).toLocaleString("en-US")),
          });
        });
      });
    },
    { scope: ref }
  );

  return (
    <section className="section" id="about" ref={ref}>
      <div className="container">
        <SectionHead kicker="About me" title="Engineer by training, builder by habit" />

        <div className="about-grid">
          <figure className="portrait reveal">
            <div className="portrait-shape">
              <img src={profile.photo} alt="Portrait of Narendra Mishra" loading="lazy" />
            </div>
            <span className="sticker sticker-a">Montréal, QC</span>
            <span className="sticker sticker-b">B.CS '26</span>
          </figure>

          <div className="about-copy">
            <p className="lead reveal">
              I like turning hard problems into things people actually use. Lately that means LLM agents that audit SEC
              filings, a degree planner thousands of Concordia students rely on every term, and a 3D astrophysics engine
              that runs entirely in the browser.
            </p>
            <p className="reveal">
              Outside of code I've run events for 500+ people as VP of Events at the South Asian Student Association, and
              spent over two years helping serve free meals to 300+ students a day at People's Potato. I care about correctness, clean system
              design, and interfaces that feel fast.
            </p>

            <div className="stats reveal">
              {stats.map((s, i) => (
                <div className="stat" key={s.label} style={{ background: TILE[i] }}>
                  <div className="stat-value">
                    <span className="stat-num" data-value={s.value}>
                      {s.value.toLocaleString("en-US")}
                    </span>
                    {s.suffix}
                  </div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="info-grid">
          <article className="card edu reveal">
            <p className="kicker">Education</p>
            <h3>{education.degree}</h3>
            <p className="muted">
              {education.school} · {education.place} · {education.dates}
            </p>
            <div className="chips">
              {education.coursework.map((c) => (
                <span className="chip" key={c}>
                  {c}
                </span>
              ))}
            </div>
          </article>

          <article className="card skills reveal">
            <p className="kicker">Tech stack</p>
            {skills.map((g) => (
              <div className="skill-row" key={g.group}>
                <h4>{g.group}</h4>
                <div className="chips">
                  {g.items.map((s) => (
                    <span className="chip" key={s}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </article>
        </div>
      </div>
    </section>
  );
}
