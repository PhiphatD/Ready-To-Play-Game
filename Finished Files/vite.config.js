import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/rawg': {
        target: 'https://api.rawg.io',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/rawg/, '/api'),
      }
    }
  }
})
