import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Define fallbacks para variables de entorno
  define: {
    // Si alguna variable de entorno no está definida, usa valores por defecto
    __API_URL__: JSON.stringify(process.env.VITE_API_URL || 'http://localhost:3000/api')
  },
  // Configuración para tipos en TypeScript
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});