import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": {},
    global: {},
  },
  resolve: {
    alias: {
      "util": "rollup-plugin-node-polyfills/polyfills/util",
    },
  },
});