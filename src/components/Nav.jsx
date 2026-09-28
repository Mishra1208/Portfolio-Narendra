import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { profile } from "../data.js";
import { scrollToId } from "../utils.jsx";

const LINKS = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useGSAP(() => {
    LINKS.forEach(({ id }) =>
      ScrollTrigger.create({
        trigger: document.getElementById(id),
        start: "top 50%",
        end: "bottom 50%",
        onToggle: (s) => s.isActive && setActive(id),
      })
    );
  });

  const go = (id) => (e) => {
    e.preventDefault();
    setOpen(false);
    scrollToId(id);
  };

  return (
    <header className={`nav ${open ? "is-open" : ""}`} ref={ref}>
      <div className="nav-inner">
        <a href="#top" className="logo" onClick={go("top")}>
          <span className="logo-mark">n</span>
          <span>
            narendra<span className="logo-dot">.dev</span>
          </span>
        </a>
        <nav className="nav-links" aria-label="Primary">
          {LINKS.map((l) => (
            <a key={l.id} href={`#${l.id}`} onClick={go(l.id)} className={active === l.id ? "is-active" : ""}>
              {l.label}
            </a>
          ))}
          <a className="btn btn-yellow nav-cta" href={profile.resume} target="_blank" rel="noreferrer">
            Résumé ↗
          </a>
        </nav>
        <button className="nav-burger" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
