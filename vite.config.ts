import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Base path './' agar aset dapat dibaca di GitHub Pages (subfolder)
  base: './',
  define: {
    // Menanam API Key langsung ke dalam build agar langsung jalan tanpa setting GitHub Secrets
    'process.env.API_KEY': JSON.stringify("AIzaSyCBtFigW2LU8fgNdxGq9e_1yQItYV4leKI")
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    emptyOutDir: true
  }
});