import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    // Keep fingerprinted app bundles separate from mutable portfolio assets so
    // Netlify can safely give them a long-lived browser cache.
    assetsDir: "_app",
  },
});
