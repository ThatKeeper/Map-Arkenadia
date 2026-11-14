// src/core/footprintOf.js

/** Huella elíptica [cx, cy, rx, ry] de un detalle de tipo t en (x,y) con tamaño z. */
export function footprintOf(t, x, y, z) {
  if (t === 1) return [x + 0.05 * z, y - 0.75 * z, 1.05 * z, 0.75 * z];
  if (t === 2) return [x, y - 6 * z, 4 * z, 6.5 * z];
  if (t === 4) return [x, y - 3.5 * z, 6 * z, 3.5 * z];
  if (t === 5) return [x, y - 3 * z, 2 * z, 3 * z];
  if (t === 6) return [x, y, 0.9 * z, 0.9 * z];
  return [x + 14 * z, y, 14 * z, 4 * z];
}
