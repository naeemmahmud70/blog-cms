import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["quill", "react-quilljs"], // pre-bundle QuillJS & react-quilljs
  },
  ssr: {
    noExternal: ["quill", "react-quilljs"], // prevents Vite from leaving Node-only code in bundle
  },
});
