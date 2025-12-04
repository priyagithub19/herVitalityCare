import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
      server: {
    prproxy: {
      '/api': {
        target: 'https://odphp.health.gov',
        changeOrigin: true,
        secure: true, 
        rewrite: (path) => path.replace(/^\/api/, ''), 
      },
    },
  },
    }),
  ],
})
