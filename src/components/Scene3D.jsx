import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import gsap from "gsap";

const C = {
  blue: "#3d5afe",
  blueDark: "#2438c7",
  navy: "#0b1233",
  white: "#f7f7fb",
  yellow: "#ffd23f",
  pink: "#ff6fb5",
  teal: "#22b8a5",
  orange: "#ff8a3d",
  lilac: "#a9b6ff",
  ink: "#111111",
};

/* ── canvas textures ─────────────────────────────── */
function labelTexture(text, bg, fg = C.ink, size = 256) {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const g = c.getContext("2d");
  g.fillStyle = bg;
  g.fillRect(0, 0, size, size);
  g.fillStyle = fg;
  g.textAlign = "center";
  g.textBaseline = "middle";
  const fs = text.length > 3 ? 70 : 92;
  g.font = `800 ${fs}px "Archivo", "Arial Black", system-ui, sans-serif`;
  g.fillText(text, size / 2, size / 2 + 4);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

function gridTexture() {
  const s = 512;
  const c = document.createElement("canvas");
  c.width = c.height = s;
  const g = c.getContext("2d");
  g.fillStyle = "#ffffff";
  g.fillRect(0, 0, s, s);
  g.strokeStyle = "#d9dcea";
  g.lineWidth = 2;
  for (let i = 0; i <= s; i += 32) {
    g.beginPath(); g.moveTo(i, 0); g.lineTo(i, s); g.stroke();
    g.beginPath(); g.moveTo(0, i); g.lineTo(s, i); g.stroke();
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(2, 1);
  return t;
}

/** The monitor screen: a tiny terminal that loops. */
function makeScreen() {
  const W = 1024, H = 736;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const g = c.getContext("2d");
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;

  const script = [
    { p: "$ ", t: "whoami", c: "#ffffff" },
    { p: "", t: "narendra — cs @ concordia", c: "#8fa2ff" },
    { p: "$ ", t: "ls projects/", c: "#ffffff" },
    { p: "", t: "finagent/  conu-planner/  aacharya/", c: "#ffd23f" },
    { p: "$ ", t: "./hire --me", c: "#ffffff" },
    { p: "", t: "ready ✓", c: "#5ef0b4" },
  ];
  const total = script.reduce((n, l) => n + l.t.length, 0);
  let frame = 0;

  const bg = () => {
    g.fillStyle = C.navy;
    g.fillRect(0, 0, W, H);
    // scanlines
    g.fillStyle = "rgba(255,255,255,0.025)";
    for (let y = 0; y < H; y += 6) g.fillRect(0, y, W, 2);
  };

  const drawHello = (blink) => {
    bg();
    g.fillStyle = "#ffffff";
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.font = `900 150px "Archivo", "Arial Black", system-ui, sans-serif`;
    g.fillText("HELLO", W / 2, H / 2 - 70);
    g.fillText("WORLD" + (blink ? "_" : " "), W / 2 + (blink ? 0 : 0), H / 2 + 90);
  };

  const drawTerm = (chars, blink) => {
    bg();
    g.textAlign = "left";
    g.textBaseline = "top";
    g.font = `600 44px "JetBrains Mono", ui-monospace, Menlo, monospace`;
    let left = chars;
    let y = 70;
    for (const l of script) {
      if (left <= 0) break;
      const shown = l.t.slice(0, left);
      left -= l.t.length;
      g.fillStyle = "#5ef0b4";
      g.fillText(l.p, 60, y);
      const px = 60 + g.measureText(l.p).width;
      g.fillStyle = l.c;
      g.fillText(shown, px, y);
      if (left <= 0 && blink) {
        g.fillStyle = "#ffffff";
        g.fillRect(px + g.measureText(shown).width + 6, y + 4, 24, 44);
      }
      y += 96;
    }
  };

  // timeline in ticks of ~50ms: 50 hello, typing, 60 hold
  const tick = () => {
    frame++;
    const blink = Math.floor(frame / 10) % 2 === 0;
    const HELLO = 55;
    if (frame < HELLO) drawHello(blink);
    else {
      const typed = Math.min(total, Math.floor((frame - HELLO) * 1.1));
      drawTerm(typed, blink);
      if (typed >= total && frame > HELLO + total / 1.1 + 70) frame = 0;
    }
    tex.needsUpdate = true;
  };
  tick();
  return { tex, tick };
}

/* ── scene ─────────────────────────────── */
export default function Scene3D() {
  const mount = useRef(null);

  useEffect(() => {
    let cleanup = () => {};
    let cancelled = false;
    const start = () => {
      if (!cancelled) cleanup = init(mount.current) || (() => {});
    };
    (document.fonts?.ready || Promise.resolve()).then(start);
    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return <div className="scene3d" ref={mount} aria-label="3D illustration: a glossy blue retro computer on a desk, surrounded by floating keycaps" role="img" />;
}

function init(el) {
  {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      el.classList.add("no-webgl");
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.NeutralToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
    camera.position.set(0, 1.4, 12.5);

    // lights
    scene.add(new THREE.HemisphereLight("#ffffff", "#c9cde0", 0.6));
    const sun = new THREE.DirectionalLight("#ffffff", 1.6);
    sun.position.set(4, 8, 6);
    sun.castShadow = true;
    sun.shadow.mapSize.set(1024, 1024);
    sun.shadow.camera.left = -6;
    sun.shadow.camera.right = 6;
    sun.shadow.camera.top = 6;
    sun.shadow.camera.bottom = -6;
    sun.shadow.radius = 6;
    scene.add(sun);

    const glossy = (color, extra = {}) =>
      new THREE.MeshPhysicalMaterial({ color, roughness: 0.28, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.15, ...extra });
    const matte = (color, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.55, ...extra });

    const disposables = [];
    const add = (parent, mesh, pos, rot) => {
      if (pos) mesh.position.set(...pos);
      if (rot) mesh.rotation.set(...rot);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      parent.add(mesh);
      disposables.push(mesh);
      return mesh;
    };

    const rig = new THREE.Group(); // whole desk, follows the pointer
    scene.add(rig);

    // pedestal
    const grid = gridTexture();
    const pedMats = [matte("#ffffff", { map: grid }), matte("#ffffff", { map: grid }), matte("#ffffff"), matte("#ffffff"), matte("#ffffff", { map: grid }), matte("#ffffff", { map: grid })];
    add(rig, new THREE.Mesh(new RoundedBoxGeometry(4.4, 0.9, 3.0, 5, 0.12), pedMats), [0, -0.85, 0]);

    // monitor
    const monitor = new THREE.Group();
    monitor.position.set(0, 0, -0.35);
    rig.add(monitor);
    const blue = glossy(C.blue);
    add(monitor, new THREE.Mesh(new RoundedBoxGeometry(3.1, 2.5, 2.2, 6, 0.38), blue), [0, 1.15, 0]);
    add(monitor, new THREE.Mesh(new RoundedBoxGeometry(2.6, 1.95, 0.2, 4, 0.12), glossy(C.blueDark)), [0, 1.15, 1.03]);
    const screen = makeScreen();
    const scr = add(monitor, new THREE.Mesh(new THREE.PlaneGeometry(2.36, 1.7), new THREE.MeshBasicMaterial({ map: screen.tex, toneMapped: false })), [0, 1.15, 1.135]);
    scr.castShadow = false;
    // side speaker knob
    const knob = add(monitor, new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.14, 40), new THREE.MeshPhysicalMaterial({ color: "#dfe3ee", metalness: 0.9, roughness: 0.25 })), [1.56, 1.35, 0.2], [0, 0, Math.PI / 2]);
    add(monitor, new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.16, 32), glossy(C.blueDark)), [1.6, 1.35, 0.2], [0, 0, Math.PI / 2]);
    // top floppy slot
    add(monitor, new THREE.Mesh(new RoundedBoxGeometry(1.1, 0.12, 0.5, 3, 0.05), glossy(C.blueDark)), [0.55, 2.4, 0.2]);
    // neck
    add(monitor, new THREE.Mesh(new RoundedBoxGeometry(1.0, 0.45, 1.0, 3, 0.1), glossy(C.blue)), [0, -0.25, 0]);
    // sticky note
    const note = new THREE.Mesh(new THREE.PlaneGeometry(0.62, 0.62), matte(C.yellow, { map: labelTexture("CS '26", C.yellow), side: THREE.DoubleSide }));
    add(monitor, note, [1.05, 2.05, 1.16], [0, 0, -0.18]);

    // keyboard + keys
    const kb = add(rig, new THREE.Mesh(new RoundedBoxGeometry(2.5, 0.16, 0.8, 3, 0.06), glossy(C.white)), [-0.1, -0.32, 1.05]);
    const keyGeo = new RoundedBoxGeometry(0.15, 0.08, 0.15, 2, 0.03);
    const keys = new THREE.InstancedMesh(keyGeo, glossy(C.lilac), 36);
    const m = new THREE.Matrix4();
    let k = 0;
    for (let r = 0; r < 3; r++)
      for (let q = 0; q < 12; q++) {
        m.makeTranslation(-1.05 + q * 0.19 - 0.1, -0.22, 0.8 + r * 0.22);
        keys.setMatrixAt(k++, m);
      }
    keys.castShadow = true;
    rig.add(keys);
    disposables.push(keys, kb);
    // mouse
    const mouse = add(rig, new THREE.Mesh(new THREE.SphereGeometry(0.3, 32, 16), glossy(C.blue)), [1.75, -0.32, 1.05]);
    mouse.scale.set(0.8, 0.4, 1.1);
    // coffee mug
    const mug = new THREE.Group();
    mug.position.set(-1.85, -0.1, 0.6);
    rig.add(mug);
    add(mug, new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.3, 0.62, 40), glossy(C.white)), [0, 0, 0]);
    add(mug, new THREE.Mesh(new THREE.CylinderGeometry(0.325, 0.325, 0.14, 40), glossy(C.pink)), [0, 0.05, 0]);
    add(mug, new THREE.Mesh(new THREE.CylinderGeometry(0.27, 0.27, 0.02, 32), matte("#4a2a1a", { roughness: 0.2 })), [0, 0.3, 0]);
    add(mug, new THREE.Mesh(new THREE.TorusGeometry(0.17, 0.05, 12, 24), glossy(C.white)), [-0.34, 0, 0], [0, 0, 0]);

    // shadow catcher
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), new THREE.ShadowMaterial({ opacity: 0.12 }));
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1.32;
    ground.receiveShadow = true;
    scene.add(ground);

    // floating keycaps + shapes (outside the rig so they parallax differently)
    const floaters = new THREE.Group();
    scene.add(floaters);
    const capGeo = new RoundedBoxGeometry(1, 0.55, 1, 5, 0.18);
    const caps = [
      { t: "Ctrl", c: C.orange, p: [-2.8, -0.9, 1.6], r: [0.5, 0.5, 0.25] },
      { t: "</>", c: C.teal, p: [2.6, 2.2, 0.6], r: [0.6, -0.5, -0.3] },
      { t: "{ }", c: C.pink, p: [-2.6, 2.9, -0.2], r: [0.7, 0.3, 0.35] },
      { t: "Esc", c: C.yellow, p: [2.8, -0.9, 1.4], r: [0.45, -0.6, 0.15] },
      { t: "git", c: C.lilac, p: [0.6, 4.1, -1.2], r: [0.8, 0.2, -0.2] },
    ].map((d) => {
      const g = new THREE.Group();
      g.position.set(...d.p);
      g.rotation.set(...d.r);
      add(g, new THREE.Mesh(capGeo, glossy(d.c)), [0, 0, 0]);
      const top = new THREE.Mesh(new THREE.PlaneGeometry(0.78, 0.78), new THREE.MeshStandardMaterial({ map: labelTexture(d.t, d.c), roughness: 0.35 }));
      top.rotation.x = -Math.PI / 2;
      top.position.y = 0.281;
      g.add(top);
      disposables.push(top);
      floaters.add(g);
      return g;
    });
    // playful arcs like the reference
    const arc = (color, pos, rot, s = 1) => {
      const mesh = add(floaters, new THREE.Mesh(new THREE.TorusGeometry(0.5 * s, 0.2 * s, 20, 48, Math.PI * 1.4), glossy(color)), pos, rot);
      return mesh;
    };
    const arcs = [arc(C.pink, [-3.0, 0.9, -1.5], [0.4, 0.6, 1.2], 0.8), arc(C.teal, [3.0, 0.4, -1.8], [1.1, -0.3, 0.3], 0.7)];
    const ball = add(floaters, new THREE.Mesh(new THREE.SphereGeometry(0.28, 32, 16), glossy(C.yellow)), [-1.2, 3.9, -0.5]);

    // sizing
    const resize = () => {
      const w = el.clientWidth, h = el.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      // pull back on narrow (portrait) panels so everything fits
      const a = w / h;
      camera.position.z = a >= 1.1 ? 12.5 : 12.5 * Math.pow(1.1 / a, 0.85);
      camera.lookAt(0, 0.7, 0);
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    resize();

    // pointer follow
    const target = { x: 0, y: 0 };
    const onMove = (e) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove);

    // motion
    const tweens = [];
    if (!reduce) {
      tweens.push(gsap.from(rig.scale, { x: 0.6, y: 0.6, z: 0.6, duration: 1.4, ease: "elastic.out(1, 0.6)", delay: 0.2 }));
      tweens.push(gsap.from(rig.rotation, { y: -0.9, duration: 1.6, ease: "power3.out", delay: 0.2 }));
      [...caps, ...arcs, ball].forEach((o, i) => {
        tweens.push(gsap.from(o.scale, { x: 0, y: 0, z: 0, duration: 0.9, ease: "back.out(2.2)", delay: 0.7 + i * 0.08 }));
        tweens.push(gsap.to(o.position, { y: `+=${0.22 + (i % 3) * 0.08}`, duration: 2.2 + (i % 4) * 0.4, yoyo: true, repeat: -1, ease: "sine.inOut", delay: i * 0.2 }));
        tweens.push(gsap.to(o.rotation, { y: `+=${i % 2 ? 0.5 : -0.5}`, z: `+=${i % 2 ? 0.15 : -0.15}`, duration: 3.5 + i * 0.3, yoyo: true, repeat: -1, ease: "sine.inOut" }));
      });
      tweens.push(gsap.to(note.rotation, { z: -0.1, duration: 1.6, yoyo: true, repeat: -1, ease: "sine.inOut" }));
    }

    // loop (paused when off screen)
    let visible = true, raf = 0, last = 0;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(el);
    const render = (t) => {
      raf = requestAnimationFrame(render);
      if (!visible) return;
      rig.rotation.y += (target.x * 0.35 - 0.12 - rig.rotation.y) * 0.05;
      rig.rotation.x += (target.y * 0.08 - rig.rotation.x) * 0.05;
      floaters.rotation.y += (target.x * 0.18 - floaters.rotation.y) * 0.04;
      floaters.position.x += (target.x * 0.25 - floaters.position.x) * 0.04;
      if (t - last > 55) {
        screen.tick();
        last = t;
      }
      renderer.render(scene, camera);
    };
    if (reduce) {
      rig.rotation.y = -0.12;
      for (let i = 0; i < 130; i++) screen.tick();
      renderer.render(scene, camera);
      // still re-render on resize
      const rr = () => renderer.render(scene, camera);
      ro.disconnect();
      const ro2 = new ResizeObserver(() => { resize(); rr(); });
      ro2.observe(el);
    } else raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      tweens.forEach((t) => t.kill());
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      disposables.forEach((o) => {
        o.geometry?.dispose();
        [].concat(o.material || []).forEach((mm) => {
          mm.map?.dispose();
          mm.dispose();
        });
      });
      pmrem.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }
}
