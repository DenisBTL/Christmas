import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
  root: resolve("github"),
  base: "./",
  publicDir: resolve("public"),
  plugins: [react()],
  define: {
    __CHRISTMAS_REPLIES_API__: JSON.stringify("https://noel-laulau-reponses-github.norbertmoutier.chatgpt.site/api/replies"),
  },
  build: { outDir: resolve("docs"), emptyOutDir: true },
});
