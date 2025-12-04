import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/sneakervault-react/',   // ✅ REQUIRED FOR GITHUB PAGES
  build: {
    outDir: 'dist',
  },
})
