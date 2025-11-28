import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // PENTING: base: './' memastikan path asset relatif, 
  // sehingga tidak error (404) saat di-host di subfolder GitHub Pages.
  base: './',
});