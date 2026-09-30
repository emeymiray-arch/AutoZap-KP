import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  // Relative base works on both Vercel (/) and GitHub Pages (/AutoZap-KP/).
  base: './',
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 43147,
    strictPort: true,
    allowedHosts: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 43147,
    strictPort: true,
    allowedHosts: true,
  },
})
