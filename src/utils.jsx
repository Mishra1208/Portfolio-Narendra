import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export const MOTION = "(prefers-reduced-motion: no-preference)";

export function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -80, duration: 1.2 });
  else el.scrollIntoView({ behavior: "smooth" });
}

/** Small kicker + heading. Reveals with the section. */
export function SectionHead({ kicker, title, children }) {
  return (
    <header className="sec-head reveal">
      <p className="kicker">{kicker}</p>
      <h2>{title}</h2>
      {children && <p className="sec-sub">{children}</p>}
    </header>
  );
}

/** Fade-up any `.reveal` element inside `scope` as it enters the viewport. */
export function useReveal(scope) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        gsap.utils.toArray(scope.current.querySelectorAll(".reveal")).forEach((el) => {
          gsap.from(el, {
            y: 28,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          });
        });
      });
    },
    { scope }
  );
}

export function useScope() {
  const ref = useRef(null);
  useReveal(ref);
  return ref;
}
