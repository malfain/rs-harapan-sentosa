import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Build untuk GitHub Pages: situs disajikan di https://<user>.github.io/rs-harapan-sentosa/
const PAGES_BASE = '/rs-harapan-sentosa/'

// https://vite.dev/config/
export default defineConfig(({ command, isPreview }) => ({
  base: command === 'build' || isPreview ? PAGES_BASE : '/',
  plugins: [react()],
  server: { port: Number(process.env.PORT) || 5173 },
}))
