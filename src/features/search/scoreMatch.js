// @ts-check
// src/features/search/scoreMatch.js

/**
 * Puntúa cuánto encaja un texto normalizado con la consulta (menor = mejor):
 * 0 igual, 1 empieza por, 2 una palabra empieza por, 3 contiene, -1 no encaja.
 * @param {string} norm texto normalizado
 * @param {string} q consulta normalizada
 */
export function scoreMatch(norm, q) {
  if (norm === q) return 0;
  if (norm.startsWith(q)) return 1;
  if (norm.split(/[\s\-–—,.'’]+/).some((w) => w.startsWith(q))) return 2;
  return norm.includes(q) ? 3 : -1;
}
