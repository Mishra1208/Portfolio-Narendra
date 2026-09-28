# Narendra Mishra — Portfolio v2

Neo-brutalist personal site built with **React 18 + Vite**, **Three.js** (interactive 3D retro computer in the hero), **GSAP** and **Lenis**.
Live at 👉 https://mishra1208.github.io/Portfolio-Narendra/

## Highlights
- 3D hero: a glossy retro computer running a live terminal on its screen, floating keycaps, follows the cursor
- Cream + ink neo-brutalist UI: thick outlines, hard shadows, flat colour
- Animated project diagrams: LangGraph agent pipeline (FinAgent), prerequisite DAG in topological order (ConU Planner), orbital system (Aacharya)
- Responsive, respects `prefers-reduced-motion`

## Edit content
Everything (text, links, projects, skills, experience) lives in **`src/data.js`**.
Add your GitHub repo / live-app URLs to each project's `github` and `live` fields.
Replace `public/Narendra_Mishra_Resume.pdf` to update the résumé.

## Run locally
```bash
npm install
npm run dev
```

## Deploy (GitHub Pages)
A workflow in `.github/workflows/deploy.yml` builds and deploys on every push to `main`.
One-time: repo **Settings → Pages → Source: GitHub Actions**.
