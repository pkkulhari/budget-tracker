import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDev = mode === 'development'

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: isDev ? 'http://127.0.0.1:8000' : 'https://budget-tracker-986o.onrender.com',
          changeOrigin: true,
          secure: false,
        },
      },
    },
  }
})
