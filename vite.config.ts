import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// dokumentasi Vite
export default defineConfig({
  plugins: [react()],
  // Base path './' agar aset dapat dibaca di GitHub Pages (subfolder)
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    emptyOutDir: true
  }
});