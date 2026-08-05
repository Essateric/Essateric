import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import netlify from '@netlify/vite-plugin';

export default defineConfig({
  plugins: [react(), netlify()],

  optimizeDeps: {
    include: ['@splinetool/react-spline', 'framer-motion'],
    exclude: ['@splinetool/runtime'],
  },

  preview: {
    port: 4173,
    host: true,
    open: true,
  },

  server: {
    host: true,
    port: 3000,
    open: true,

    // Vite handles SPA routing by default; this option is more of a webpack thing.
    // Keeping your behavior via Vite's fallback:
    // (If you used historyApiFallback from another tool, Vite already does this.)
  },

  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
});
