import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // ✅ makes all routes + assets work on GitHub Pages
  build: {
    outDir: 'dist',
  },
})