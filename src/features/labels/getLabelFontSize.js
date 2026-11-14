// @ts-check
// src/features/labels/getLabelFontSize.js
import { LABEL_FONT_SIZES } from '@/config';
import { viewport } from '@/state';

/**
 * Tamaño de letra (en unidades del mundo) de una etiqueta: crece despacio al acercar el zoom.
 * @param {string} kind tipo de etiqueta
 * @param {number} [sizeMul] multiplicador del usuario
 */
export function getLabelFontSize(kind, sizeMul = 1) {
  return LABEL_FONT_SIZES[kind] * Math.pow(Math.max(viewport.scale, 0.3), -0.3) * sizeMul;
}
