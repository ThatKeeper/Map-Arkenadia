// @ts-check
// src/ui/paint/findFirstVisibleItem.js

/**
 * Búsqueda binaria del primer elemento (de `n`, ordenados por Y) cuyo Y no queda por encima de `minY`.
 * @param {Float32Array} items lista plana [tipo, x, y, tamaño, …] ordenada por Y
 * @param {number} n número de elementos
 * @param {number} minY
 */
export function findFirstVisibleItem(items, n, minY) {
  let lo = 0,
    hi = n;
  while (lo < hi) {
    const q = (lo + hi) >> 1;
    if (items[q * 4 + 2] < minY) lo = q + 1;
    else hi = q;
  }
  return lo;
}
