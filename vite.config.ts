import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

export default defineConfig({
  base: "/terminal-portfolio/",
  plugins: [preact()],
  server: { host: true, port: 3000 },
});
