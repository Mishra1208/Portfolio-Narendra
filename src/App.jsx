import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Services from "./components/Services.jsx";
import Projects from "./components/Projects.jsx";
import About from "./components/About.jsx";
import Experience from "./components/Experience.jsx";
import Contact from "./components/Contact.jsx";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function App() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Services />
        <Projects />
        <About />
        <Experience />
        <Contact />
      </main>
    </>
  );
}
