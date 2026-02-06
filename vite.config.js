import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 1001,
    strictPort: true,
    hmr: {
      clientPort: 1001,
      host: '37.201.48.209' 
    },
    watch: {
      usePolling: true
    }
  }
});