import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  // Ruta base relativa: la app funciona igual en la raíz de un dominio y en
  // https://usuario.github.io/<repositorio>/ (GitHub Pages de proyecto).
  base: './',
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  worker: { format: 'es' },
});
