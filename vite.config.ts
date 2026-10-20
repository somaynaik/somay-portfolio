import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  return {
    base: './',
    plugins: [react()],
    server: {
      port: 3000,
      open: true,
      proxy: {
        '/api': {
          target: 'http://localhost:5000',
          changeOrigin: true,
        },
      },
    },
    build: {
      outDir: 'build',
    },
    define: {
      'process.env.REACT_APP_ENABLE_UPLOAD': JSON.stringify(process.env.REACT_APP_ENABLE_UPLOAD || ''),
      'process.env.NODE_ENV': JSON.stringify(mode),
    },
  };
});
