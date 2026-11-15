// @ts-check
// src/features/export/getColumnLabel.js

/**
 * Rótulo de columna de la cuadrícula: A, B … Z, AA, AB …
 * @param {number} i índice desde 0
 */
export function getColumnLabel(i) {
  let n = Math.max(0, Math.floor(i)) + 1,
    s = '';
  while (n > 0) {
    s = String.fromCharCode(65 + ((n - 1) % 26)) + s;
    n = Math.floor((n - 1) / 26);
  }
  return s;
}
