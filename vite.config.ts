import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8888',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  define: {
    // This ensures process.env is defined during build to prevent crashes in the browser
    // for libraries or code relying on it (like the geminiService)
    'process.env': {}
  }
});