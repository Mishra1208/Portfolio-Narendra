// ─────────────────────────────────────────────────────────────
//  All site content lives here. Edit this file to update the site.
//  Replace the `github` / `live` links below with your real repo + app URLs.
// ─────────────────────────────────────────────────────────────

import photo from "./assets/profile.webp";

export const profile = {
  name: "Narendra Mishra",
  first: "Narendra",
  last: "Mishra",
  roles: [
    "AI / multi-agent systems",
    "full-stack web apps",
    "tools students actually use",
    "3D on the web",
  ],
  headline: "I build for real users.",
  tagline:
    "Computer Science graduate from Concordia University in Montréal. I build multi-agent AI systems, cloud-first web platforms and interactive 3D on the web.",
  location: "Montréal, QC",
  status: "Open to software & AI engineering roles",
  email: "mishranarendra1208@gmail.com",
  phone: "+1 (438) 979-4342",
  github: "https://github.com/Mishra1208",
  linkedin: "https://linkedin.com/in/narendramishracs",
  resume: import.meta.env.BASE_URL + "Narendra_Mishra_Resume.pdf",
  photo,
};

export const services = [
  {
    title: "AI & agent systems",
    text: "LangGraph pipelines, hybrid RAG with real citations, and guardrails that keep LLM output checkable.",
    color: "var(--lilac)",
    icon: "agents",
  },
  {
    title: "Full-stack platforms",
    text: "Next.js and FastAPI apps with Postgres, auth and Docker, built to serve thousands of students.",
    color: "var(--yellow)",
    icon: "stack",
  },
  {
    title: "3D & interactive web",
    text: "Three.js and React Three Fiber scenes, WebGL starfields and real math running in the browser.",
    color: "var(--pink)",
    icon: "cube",
  },
];

export const stats = [
  { value: 5000, suffix: "+", label: "active students on ConU Planner" },
  { value: 7900, suffix: "+", label: "courses mapped in a prerequisite DAG" },
  { value: 100, suffix: "%", label: "citation grounding in FinAgent" },
  { value: 500, suffix: "+", label: "attendees at events I've run" },
];

export const education = {
  degree: "Bachelor of Computer Science",
  school: "Concordia University",
  place: "Montréal, QC",
  dates: "Sept 2022 – Aug 2026",
  coursework: [
    "Artificial Intelligence",
    "Machine Learning",
    "Data Structures & Algorithms",
    "Databases & SQL",
    "Operating Systems",
    "Software Engineering",
    "Web-Based Enterprise App Design",
    "Mathematics for CS",
  ],
};

export const projects = [
  {
    id: "finagent",
    index: "01",
    name: "FinAgent",
    kicker: "Enterprise SEC Multi-Agent Intelligence System",
    dates: "July 2026 – Present",
    visual: "agents",
    accent: "var(--lilac)",
    stack: ["Python", "LangGraph", "ChromaDB", "BM25", "RRF", "FastAPI", "Streamlit", "Ragas"],
    points: [
      "Autonomous financial-auditing platform: LangGraph routes state across Supervisor, Quant Analyst, Risk Auditor and Grounding Verifier agents to analyze Form 10-K filings.",
      "Hybrid RAG fusing ChromaDB dense vectors with BM25 keyword search via Reciprocal Rank Fusion — every answer carries a verified citation.",
      "Deterministic Python math sandbox for YoY growth, operating margins and leverage ratios, behind prompt-injection defense, PII scrubbing and Pydantic validation.",
    ],
    github: "https://github.com/Mishra1208",
    live: "",
  },
  {
    id: "conu",
    index: "02",
    name: "ConU Planner",
    kicker: "Cloud-First Academic Planning Engine",
    dates: "Oct 2025 – Present",
    visual: "dag",
    accent: "var(--yellow)",
    stack: ["Next.js", "React", "FastAPI", "PostgreSQL", "Chrome MV3", "Puppeteer", "Clerk", "Docker"],
    points: [
      "Academic planning platform with server-side persistence used by 5,000+ students to sequence requirements, track progress and forecast GPA.",
      "Topological-sort Degree Pathfinder over a prerequisite DAG of 7,900+ courses, generating optimal graduation schedules for CS and 6+ engineering programs.",
      "Chrome MV3 extension + client-side PDF.js parser that imports PeopleSoft transcripts in under 60 s; Puppeteer scrapers with dynamic rate-limiting watch seat availability.",
    ],
    github: "https://github.com/Mishra1208",
    live: "",
  },
  {
    id: "aacharya",
    index: "03",
    name: "Aacharya",
    kicker: "3D Celestial Astrophysics Engine",
    dates: "Aug 2024 – Present",
    visual: "orbit",
    accent: "var(--pink)",
    stack: ["Next.js", "Three.js", "React Three Fiber", "WebGL", "Canvas API", "Framer Motion"],
    points: [
      "Client-side engine computing sidereal planetary longitudes and coordinate projections from Local Sidereal Time and high-accuracy trig models.",
      "Interactive 3D solar system in React Three Fiber with GPU-accelerated starfields and real-time mouse-repulsion physics.",
      "Procedural SVG renderer drawing 12 celestial houses at runtime, plus a 36-point compatibility algorithm running in real time.",
    ],
    github: "https://github.com/Mishra1208",
    live: "",
  },
];

export const skills = [
  {
    group: "Languages",
    items: ["Python", "Java", "JavaScript (ES6+)", "TypeScript", "SQL", "HTML5", "CSS3"],
  },
  {
    group: "Frameworks & Libraries",
    items: ["LangGraph", "LangChain", "FastAPI", "Next.js", "React", "Node.js", "Express", "PyTorch", "Three.js", "React Three Fiber"],
  },
  {
    group: "Data, Cloud & DevOps",
    items: ["PostgreSQL", "MongoDB", "Redis", "ChromaDB", "Docker", "GCP", "Git", "Linux / Bash", "CI/CD"],
  },
  {
    group: "Methods",
    items: ["Multi-Agent Orchestration", "Hybrid RAG (Chroma + BM25, RRF)", "System Design", "REST APIs", "Microservices"],
  },
];

export const experience = [
  {
    role: "Data & Customer Experience Consultant",
    org: "Riipen Labs (Level UP) — Client: Moms Against Racism",
    place: "Vancouver, BC · Remote",
    dates: "May 2026 – June 2026",
    points: [
      "Analyzed multi-channel engagement, subscriber-retention and cancellation data to pinpoint onboarding friction.",
      "Delivered a CX optimization brief and data-backed onboarding roadmap for a 500+ member non-profit platform to lift conversion and retention.",
    ],
  },
  {
    role: "Market Research Associate",
    org: "Access Research Inc.",
    place: "Montréal, QC",
    dates: "Jan 2023 – Apr 2023",
    points: [
      "Ran structured research interviews across 500+ corporate clients at 95% data-entry accuracy, within strict compliance and QA protocols.",
      "Handled high-friction conversations with active listening and de-escalation.",
    ],
  },
];

export const leadership = [
  {
    role: "Vice President of Events",
    org: "South Asian Student Association, Concordia",
    dates: "Sept 2024 – Aug 2026",
    text: "Planned, budgeted and ran cultural and networking events for 500+ attendees, leading student teams and sponsor outreach.",
  },
  {
    role: "Community Kitchen Volunteer",
    org: "People's Potato, Concordia",
    dates: "Sept 2023 – Jan 2026",
    text: "Part of a high-volume team preparing and serving free, healthy meals to 300+ students every day.",
  },
];
