import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const reduce = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Play looping timelines only while the visual is on screen. */
function playWhenVisible(el, animations, stillAt = 0.5) {
  const list = [].concat(animations);
  if (reduce()) {
    list.forEach((a) => a.progress(stillAt).pause());
    return;
  }
  list.forEach((a) => a.pause());
  gsap.timeline({
    scrollTrigger: {
      trigger: el,
      start: "top bottom",
      end: "bottom top",
      onToggle: (self) => list.forEach((a) => (self.isActive ? a.play() : a.pause())),
    },
  });
}

/* ───────────── FinAgent: multi-agent graph ───────────── */
const A = {
  doc: [44, 150, "10-K"],
  rag: [130, 150, "HYBRID RAG"],
  sup: [218, 150, "SUPERVISOR"],
  quant: [306, 76, "QUANT"],
  risk: [306, 224, "RISK"],
  ver: [392, 150, "VERIFIER"],
  out: [452, 150, "✓"],
};
const AE = [
  ["doc", "rag"],
  ["rag", "sup"],
  ["sup", "quant"],
  ["sup", "risk"],
  ["quant", "ver"],
  ["risk", "ver"],
  ["ver", "out"],
];

export function AgentsVisual() {
  const ref = useRef(null);
  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const P = (k) => ({ attr: { cx: A[k][0], cy: A[k][1] } });
      const flash = (k) => gsap.fromTo(q(`[data-n="${k}"] rect`), { attr: { "stroke-opacity": 1 }, fillOpacity: 0.35 }, { attr: { "stroke-opacity": 0.35 }, fillOpacity: 0.08, duration: 0.8 });

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.6, defaults: { ease: "power1.inOut", duration: 0.55 } });
      tl.set(q(".pk"), { opacity: 0 })
        .set(q(".pk1"), { opacity: 1, ...P("doc") })
        .add(flash("doc"))
        .to(q(".pk1"), P("rag"))
        .add(flash("rag"))
        .to(q(".pk1"), P("sup"))
        .add(flash("sup"))
        .set(q(".pk2"), { opacity: 1, ...P("sup") })
        .to(q(".pk1"), P("quant"))
        .to(q(".pk2"), P("risk"), "<")
        .add(flash("quant"))
        .add(flash("risk"), "<")
        .to(q(".pk1"), P("ver"))
        .to(q(".pk2"), P("ver"), "<")
        .add(flash("ver"))
        .set(q(".pk2"), { opacity: 0 })
        .to(q(".pk1"), P("out"))
        .add(flash("out"))
        .to(q(".out-ring"), { attr: { r: 26 }, opacity: 0, duration: 0.9, ease: "power2.out" }, "<")
        .set(q(".out-ring"), { attr: { r: 14 }, opacity: 1 })
        .to(q(".pk1"), { opacity: 0, duration: 0.3 });

      const dash = gsap.to(q(".edge"), { strokeDashoffset: -24, duration: 1.2, ease: "none", repeat: -1 });
      playWhenVisible(ref.current, [tl, dash]);
    },
    { scope: ref }
  );

  return (
    <svg ref={ref} viewBox="0 0 496 300" className="viz" role="img" aria-label="Diagram: a 10-K filing flows through hybrid retrieval to a supervisor agent, which routes to quant and risk agents, then a grounding verifier.">
      {AE.map(([a, b]) => (
        <line key={a + b} className="edge" x1={A[a][0]} y1={A[a][1]} x2={A[b][0]} y2={A[b][1]} />
      ))}
      {Object.entries(A).map(([k, [x, y, label]]) =>
        k === "out" ? (
          <g key={k} data-n={k}>
            <circle className="out-ring" cx={x} cy={y} r="14" />
            <rect x={x - 14} y={y - 14} width="28" height="28" rx="14" className="node" />
            <text x={x} y={y + 4} className="node-t big">{label}</text>
          </g>
        ) : (
          <g key={k} data-n={k}>
            <rect x={x - 38} y={y - 15} width="76" height="30" rx="7" className="node" />
            <text x={x} y={y + 3.5} className="node-t">{label}</text>
          </g>
        )
      )}
      <circle className="pk pk1" r="5" cx={A.doc[0]} cy={A.doc[1]} />
      <circle className="pk pk2" r="5" cx={A.sup[0]} cy={A.sup[1]} />
      <text x="248" y="290" className="viz-cap">langgraph · stateful routing</text>
    </svg>
  );
}

/* ───────────── ConU Planner: prerequisite DAG ───────────── */
const D = {
  248: [60, 64, 0],
  232: [60, 150, 0],
  228: [60, 236, 0],
  249: [180, 64, 1],
  352: [300, 150, 2],
  346: [420, 64, 3],
  353: [420, 150, 3],
  472: [420, 236, 3],
};
const DE = [
  [248, 249],
  [249, 352],
  [232, 352],
  [228, 346],
  [352, 346],
  [352, 353],
  [352, 472],
];
const curve = (a, b) => {
  const [x1, y1] = D[a], [x2, y2] = D[b];
  const mx = (x1 + x2) / 2;
  return `M${x1 + 34} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2 - 34} ${y2}`;
};

export function DagVisual() {
  const ref = useRef(null);
  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      q(".dedge").forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.2 });
      tl.set(q(".dnode"), { attr: { class: "dnode" } });
      tl.set(q(".sem"), { opacity: 0.25 });
      [0, 1, 2, 3].forEach((layer) => {
        tl.addLabel(`L${layer}`);
        tl.to(q(`.sem-${layer}`), { opacity: 1, duration: 0.3 }, `L${layer}`);
        tl.to(q(`.dnode[data-l="${layer}"]`), { attr: { class: "dnode on" }, duration: 0.01, stagger: 0.12 }, `L${layer}`);
        tl.fromTo(q(`.dnode[data-l="${layer}"] rect`), { scale: 0.85, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.5, ease: "back.out(3)", stagger: 0.12 }, `L${layer}`);
        tl.to(q(`.dedge[data-from-l="${layer}"]`), { strokeDashoffset: 0, duration: 0.7, ease: "power2.inOut", stagger: 0.08 }, `L${layer}+=0.3`);
      });
      tl.to({}, { duration: 1.6 });
      tl.to(q(".dedge"), { strokeDashoffset: (i, el) => -el.getTotalLength(), duration: 0.6, ease: "power2.in" });
      tl.set(q(".dedge"), { strokeDashoffset: (i, el) => el.getTotalLength() });
      playWhenVisible(ref.current, tl, 0.72);
    },
    { scope: ref }
  );

  return (
    <svg ref={ref} viewBox="0 0 480 300" className="viz" role="img" aria-label="Diagram: Concordia courses as a prerequisite graph, lit up in topological order across four semesters.">
      {DE.map(([a, b]) => (
        <path key={`${a}-${b}`} d={curve(a, b)} className="dedge" data-from-l={D[a][2]} />
      ))}
      {Object.entries(D).map(([code, [x, y, l]]) => (
        <g key={code} className="dnode" data-l={l}>
          <rect x={x - 34} y={y - 15} width="68" height="30" rx="7" />
          <text x={x} y={y + 3.5}>COMP {code}</text>
        </g>
      ))}
      {[60, 180, 300, 420].map((x, i) => (
        <text key={x} x={x} y="288" className={`sem sem-${i} viz-cap`}>
          S{i + 1}
        </text>
      ))}
    </svg>
  );
}

/* ───────────── Aacharya: orbital system ───────────── */
const PLANETS = [
  { a: 62, e: 0.42, r: 3.5, dur: 5, c: "var(--blue)" },
  { a: 104, e: 0.42, r: 5, dur: 9, c: "var(--pink)" },
  { a: 150, e: 0.42, r: 4, dur: 14, c: "var(--teal)" },
  { a: 196, e: 0.42, r: 6.5, dur: 22, c: "var(--orange)" },
];

export function OrbitVisual() {
  const ref = useRef(null);
  const stars = useRef(
    Array.from({ length: 46 }, () => ({ x: Math.random() * 480, y: Math.random() * 300, r: Math.random() * 1.1 + 0.3 }))
  );
  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const anims = PLANETS.map((p, i) => {
        const el = q(`.planet-${i}`)[0];
        const o = { t: Math.random() * Math.PI * 2 };
        return gsap.to(o, {
          t: `+=${Math.PI * 2}`,
          duration: p.dur,
          ease: "none",
          repeat: -1,
          onUpdate: () => {
            el.setAttribute("cx", 240 + Math.cos(o.t) * p.a);
            el.setAttribute("cy", 150 + Math.sin(o.t) * p.a * p.e);
          },
        });
      });
      anims.push(gsap.to(q(".zodiac"), { rotation: 360, svgOrigin: "240 150", duration: 90, ease: "none", repeat: -1 }));
      anims.push(gsap.to(q(".star"), { opacity: 0.15, duration: () => gsap.utils.random(0.8, 2.4), repeat: -1, yoyo: true, stagger: { each: 0.08, from: "random" } }));
      anims.push(gsap.to(q(".sun-glow"), { attr: { r: 30 }, opacity: 0.35, duration: 2.2, yoyo: true, repeat: -1, ease: "sine.inOut" }));
      anims.forEach((a) => a.progress(Math.random()));
      playWhenVisible(ref.current, anims);
    },
    { scope: ref }
  );

  return (
    <svg ref={ref} viewBox="0 0 480 300" className="viz" role="img" aria-label="Illustration: planets orbiting a sun inside a rotating ring of twelve zodiac houses.">
      {stars.current.map((s, i) => (
        <circle key={i} className="star" cx={s.x} cy={s.y} r={s.r} />
      ))}
      <g className="zodiac">
        <ellipse cx="240" cy="150" rx="222" ry="222" className="z-ring" transform="matrix(1 0 0 0.6 0 60)" />
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i / 12) * Math.PI * 2;
          return (
            <line
              key={i}
              x1={240 + Math.cos(a) * 212}
              y1={150 + Math.sin(a) * 212 * 0.6}
              x2={240 + Math.cos(a) * 230}
              y2={150 + Math.sin(a) * 230 * 0.6}
              className="z-tick"
            />
          );
        })}
      </g>
      {PLANETS.map((p, i) => (
        <ellipse key={i} cx="240" cy="150" rx={p.a} ry={p.a * p.e} className="orbit" />
      ))}
      <circle className="sun-glow" cx="240" cy="150" r="22" />
      <circle className="sun" cx="240" cy="150" r="12" />
      {PLANETS.map((p, i) => (
        <circle key={i} className={`planet-${i}`} r={p.r} cx={240 + p.a} cy="150" fill={p.c} />
      ))}
      <text x="240" y="290" className="viz-cap">LST → sidereal longitude → projection</text>
    </svg>
  );
}
