import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

export default defineConfig({
  base: "/portfolio-terminal/",
  plugins: [preact()],
  server: { host: true, port: 3000 },
});
