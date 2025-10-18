import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, "/api"),
        // Don't rewrite the path - keep /api prefix
        // rewrite: (path) => path.replace(/^\/api/, '')
      },
      // Alternative proxy without /api prefix - forwards all requests to backend
      // Uncomment the following if you want to proxy all requests without /api prefix
      // '/': {
      //   target: 'http://localhost:3000',
      //   changeOrigin: true,
      //   secure: false,
      //   // Don't proxy static assets
      //   filter: (path) => !path.startsWith('/src') && !path.startsWith('/public') && !path.includes('.')
      // }
    }
  }
})
