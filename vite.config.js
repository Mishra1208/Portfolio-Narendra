import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

// GitHub Pages serves this repo at /Portfolio-Narendra/
// `npm run build:single` makes a one-file preview build (used for sharing a quick preview).
export default defineConfig(({ mode }) => ({
  base: mode === "single" ? "./" : "/Portfolio-Narendra/",
  plugins: [react(), ...(mode === "single" ? [viteSingleFile()] : [])],
  build: { outDir: mode === "single" ? "dist-single" : "dist" },
}));
