import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@splinetool/react-spline', 'framer-motion'],
    exclude: ['@splinetool/runtime']
  },
  preview: {
    port: 4173,
    host: true,
    open: true
  },
  server: {
    host: true,
    port: 3000,
    open: true,
    historyApiFallback: true
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom']
        }
      }
    }
  }
});