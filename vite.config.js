import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Di v4, jika pakai PostCSS, kita tidak perlu import tailwindcss di sini
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api-desa': {
        target: 'https://waginopowakatobi.online/cms',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-desa/, '')
      }
    }
  }
})
