import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Scene3D from "./Scene3D.jsx";
import { profile } from "../data.js";
import { MOTION, scrollToId } from "../utils.jsx";

export default function Hero() {
  const ref = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from(".hero-card", { y: 30, opacity: 0, duration: 0.8 })
          .from(".hero-hi", { y: 16, opacity: 0, duration: 0.5 }, "-=0.4")
          .from(".hero-title .ln > span", { yPercent: 105, duration: 0.8, stagger: 0.1 }, "-=0.3")
          .from([".hero-text", ".hero-ctas", ".hero-tags"], { y: 16, opacity: 0, duration: 0.6, stagger: 0.08 }, "-=0.45")
          .from(".hero-badge", { scale: 0, rotate: -20, duration: 0.6, ease: "back.out(2.5)" }, "-=0.3");
      });
    },
    { scope: ref }
  );

  const lines = ["I build", "for real", "users."];

  return (
    <section className="hero" id="top" ref={ref}>
      <div className="container">
        <div className="hero-card">
          <div className="hero-copy">
            <p className="hero-hi">Hi, my name is {profile.first}.</p>
            <h1 className="hero-title">
              {lines.map((l) => (
                <span className="ln" key={l}>
                  <span>{l}</span>
                </span>
              ))}
            </h1>
            <p className="hero-text">{profile.tagline}</p>
            <div className="hero-ctas">
              <a
                href="#work"
                className="btn btn-yellow btn-lg"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId("work");
                }}
              >
                See my work
              </a>
              <a href={profile.resume} className="btn btn-white btn-lg" target="_blank" rel="noreferrer">
                Résumé ↗
              </a>
            </div>
            <ul className="hero-tags">
              <li>LangGraph</li>
              <li>Next.js</li>
              <li>FastAPI</li>
              <li>Three.js</li>
            </ul>
          </div>

          <div className="hero-visual">
            <Scene3D />
            <span className="hero-badge">
              <i /> {profile.status}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
