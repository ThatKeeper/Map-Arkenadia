// @ts-check
// src/features/export/getLegendEntries.js

/**
 * Entradas de la leyenda: las categorías (en su orden) que tienen algún marcador entre los exportados.
 * @param {import('../../types').Category[]} categories
 * @param {import('../../types').Marker[]} markers marcadores que irán en la imagen
 * @returns {Array<{ id: string, nombre: string, color: string, icono: string, cantidad: number }>}
 */
export function getLegendEntries(categories, markers) {
  /** @type {Record<string, number>} */
  const counts = {};
  for (const m of markers) counts[m.categoria] = (counts[m.categoria] || 0) + 1;
  return categories
    .filter((c) => counts[c.id])
    .map((c) => ({ id: c.id, nombre: c.nombre, color: c.color, icono: c.icono, cantidad: counts[c.id] }));
}
