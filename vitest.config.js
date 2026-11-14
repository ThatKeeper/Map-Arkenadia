import { defineConfig } from 'vitest/config';
import { fileURLToPath, URL } from 'node:url';

/** Sustituye el worker inline por un constructor que falla: la app usa entonces el respaldo en el hilo principal. */
const workerInlineStub = {
  name: 'stub-worker-inline',
  enforce: 'pre',
  resolveId(id) {
    if (id.endsWith('?worker&inline')) return '\0worker-inline-stub';
    return null;
  },
  load(id) {
    if (id === '\0worker-inline-stub')
      return 'export default class { constructor() { throw new Error("Worker no disponible en pruebas"); } }';
    return null;
  },
};

export default defineConfig({
  plugins: [workerInlineStub],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  test: {
    environment: 'jsdom',
    include: ['tests/**/*.test.js'],
    testTimeout: 120000,
    hookTimeout: 120000,
  },
});
