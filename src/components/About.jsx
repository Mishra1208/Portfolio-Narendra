import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { profile, stats, education, skills } from "../data.js";
import { MOTION, SectionHead, useReveal } from "../utils.jsx";

const TILE = ["var(--yellow)", "var(--lilac)", "var(--pink)", "var(--teal)"];

/* about_me.py, one token per span so it can be syntax-coloured */
const CODE = [
  [["kw", "class "], ["cls", "Narendra"], ["p", "("], ["cls", "ComputerScienceGrad"], ["p", "):"]],
  [],
  [["t", "    school   "], ["p", "= "], ["str", '"Concordia University"'], ["cm", "  # B.CS, class of '26 ✓"]],
  [["t", "    based_in "], ["p", "= "], ["str", '"Montréal, QC"'], ["cm", "          # -30°C winters, still shipping"]],
  [["t", "    fuel     "], ["p", "= ["], ["str", '"coffee"'], ["p", ", "], ["str", '"curiosity"'], ["p", ", "], ["str", '"stack traces"'], ["p", "]"]],
  [],
  [["kw", "    def "], ["fn", "day_job"], ["p", "(self):"]],
  [["kw", "        return "], ["str", '"AI agents + web apps real people use"'],],
  [],
  [["kw", "    def "], ["fn", "side_quest"], ["p", "(self):"]],
  [["kw", "        return "], ["str", '"events for 500+ people, zero crashes"']],
];

function useMontrealTime() {
  const fmt = () =>
    new Date().toLocaleTimeString("en-CA", { timeZone: "America/Toronto", hour: "2-digit", minute: "2-digit", hour12: false });
  const [t, setT] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setT(fmt()), 15000);
    return () => clearInterval(id);
  }, []);
  return t;
}

export default function About() {
  const ref = useRef(null);
  const time = useMontrealTime();
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
        // code window types itself in, line by line
        gsap.from(".code-line", {
          opacity: 0,
          x: -10,
          duration: 0.35,
          stagger: 0.07,
          ease: "power2.out",
          scrollTrigger: { trigger: ".code-win", start: "top 80%" },
        });
        gsap.from(".now-bar i", {
          scaleX: 0,
          duration: 1.4,
          ease: "power3.inOut",
          scrollTrigger: { trigger: ".now", start: "top 85%" },
        });
      });
    },
    { scope: ref }
  );

  return (
    <section className="section" id="about" ref={ref}>
      <div className="container">
        <SectionHead kicker="About me" title="Hello, World! (the long version)" />

        <div className="about-grid">
          <figure className="portrait reveal">
            <div className="portrait-shape">
              <img src={profile.photo} alt="Portrait of Narendra Mishra" loading="lazy" />
            </div>
            <span className="sticker sticker-a">Montréal, QC</span>
            <span className="sticker sticker-b">B.CS '26 ✓</span>
          </figure>

          <div className="about-copy">
            <div className="code-win reveal" role="img" aria-label="A Python class describing Narendra">
              <div className="code-bar">
                <i /> <i /> <i />
                <span>about_me.py</span>
              </div>
              <pre>
                {CODE.map((line, i) => (
                  <div className="code-line" key={i}>
                    <span className="ln-no">{i + 1}</span>
                    {line.map(([k, t], j) => (
                      <span className={`tk-${k}`} key={j}>
                        {t}
                      </span>
                    ))}
                  </div>
                ))}
              </pre>
            </div>

            <p className="lead reveal">
              I just wrapped up a Computer Science degree at Concordia. I survived Data Structures, Operating Systems and a
              healthy number of 2 a.m. debugging sessions, and came out wanting to build things people actually use.
            </p>
            <p className="reveal">
              So I did. ConU Planner turned a prerequisite graph of 7,900+ courses into graduation plans for 5,000+
              students. FinAgent teaches a team of LLM agents to read SEC filings and back up every claim. Aacharya is a
              solar system in your browser, because WebGL is too fun not to. Off the keyboard, I ran events for 500+ people
              as VP of Events at the South Asian Student Association and spent over two years serving free meals at
              People's Potato.
            </p>
          </div>
        </div>

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

        <div className="info-grid">
          <div className="info-col">
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

            <article className="card now reveal">
              <div className="now-head">
                <span className="mono">$ status --now</span>
                <span className="now-live">
                  <i /> live
                </span>
              </div>
              <div className="now-body">
                <div className="now-row">
                  <span className="now-k">degree.exe</span>
                  <div className="now-bar" aria-label="Degree 100% complete">
                    <i />
                  </div>
                  <span className="now-v">100%</span>
                </div>
                <div className="now-row">
                  <span className="now-k">building</span>
                  <span className="now-v wide">FinAgent, since July 2026</span>
                </div>
                <div className="now-row">
                  <span className="now-k">local time</span>
                  <span className="now-v wide">
                    {time} in Montréal
                  </span>
                </div>
                <div className="now-row">
                  <span className="now-k">looking for</span>
                  <span className="now-v wide">software & AI engineering roles</span>
                </div>
              </div>
            </article>
          </div>

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
