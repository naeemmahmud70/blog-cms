import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['quill', 'react-quilljs'], // pre-bundle these deps
  },
  ssr: {
    noExternal: ['quill', 'react-quilljs'], // force Vite to bundle them for browser
  },
})
