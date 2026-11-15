// @ts-check
// src/ui/render/getLabelAlpha.js
import { viewport } from '@/state';

/**
 * Opacidad de una etiqueta según el zoom (aparece gradualmente a partir de `minScale`).
 * @param {number} minScale zoom mínimo de la etiqueta (0 = siempre visible)
 * @param {string} kind tipo de etiqueta ('c' región, 's' mar, 'n' nota…)
 * @param {number} [zoom] zoom de diseño (por defecto, el de pantalla)
 */
export function getLabelAlpha(minScale, kind, zoom = viewport.scale) {
  const fade = minScale ? Math.min(1, (zoom - minScale) / (minScale * 0.3)) : 1;
  return fade * (kind === 's' ? 0.75 : 1);
}
