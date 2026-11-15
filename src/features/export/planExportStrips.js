// @ts-check
// src/features/export/planExportStrips.js

/**
 * Divide la imagen en franjas horizontales de, como mucho, `stripPixels` píxeles,
 * para pintarlas una a una cediendo el hilo entre ellas.
 * @param {number} width ancho de la imagen (px)
 * @param {number} height alto de la imagen (px)
 * @param {number} stripPixels máximo de píxeles por franja
 * @returns {Array<{ y: number, h: number }>}
 */
export function planExportStrips(width, height, stripPixels) {
  const rows = Math.max(1, Math.floor(stripPixels / Math.max(1, width)));
  const strips = [];
  for (let y = 0; y < height; y += rows) strips.push({ y, h: Math.min(rows, height - y) });
  return strips;
}
