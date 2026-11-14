// @ts-check
// src/ui/render/getLabelAlpha.js
import { viewport } from '@/state';

/**
 * Opacidad de una etiqueta según el zoom (aparece gradualmente a partir de `minScale`).
 * @param {number} minScale zoom mínimo de la etiqueta (0 = siempre visible)
 * @param {string} kind tipo de etiqueta ('c' región, 's' mar, 'n' nota…)
 */
export function getLabelAlpha(minScale, kind) {
  const fade = minScale ? Math.min(1, (viewport.scale - minScale) / (minScale * 0.3)) : 1;
  return fade * (kind === 's' ? 0.75 : 1);
}
