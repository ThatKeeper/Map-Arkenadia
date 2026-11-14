const browserGlobals = {
  window: 'readonly', document: 'readonly', navigator: 'readonly', localStorage: 'readonly',
  sessionStorage: 'readonly', matchMedia: 'readonly', performance: 'readonly',
  requestAnimationFrame: 'readonly', cancelAnimationFrame: 'readonly', setTimeout: 'readonly',
  clearTimeout: 'readonly', console: 'readonly', innerWidth: 'readonly', addEventListener: 'readonly',
  confirm: 'readonly', URL: 'readonly', Blob: 'readonly', Image: 'readonly', Path2D: 'readonly',
  CanvasRenderingContext2D: 'readonly', onmessage: 'writable', postMessage: 'readonly',
  Worker: 'readonly', Promise: 'readonly',
};

export default [
  { ignores: ['dist/**', 'node_modules/**', 'src/config/mapImage.js'] },
  {
    files: ['src/**/*.js'],
    languageOptions: { ecmaVersion: 2022, sourceType: 'module', globals: browserGlobals },
    rules: {
      'no-undef': 'error',
      'no-unused-vars': 'warn',
      'prefer-const': 'warn',
      'no-var': 'error',
      eqeqeq: ['warn', 'always', { null: 'ignore' }],
    },
  },
  {
    // Pruebas: Vitest + jsdom (los helpers de Vitest se importan de forma explícita)
    files: ['tests/**/*.js', 'vitest.config.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...browserGlobals, process: 'readonly', Buffer: 'readonly', global: 'readonly',
        globalThis: 'readonly', HTMLCanvasElement: 'readonly', MouseEvent: 'readonly',
        Event: 'readonly', Element: 'readonly', Uint8ClampedArray: 'readonly',
      },
    },
    rules: { 'no-undef': 'error', 'no-unused-vars': 'warn' },
  },
];
