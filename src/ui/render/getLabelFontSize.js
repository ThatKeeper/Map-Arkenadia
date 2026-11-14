// @ts-check
// src/ui/render/getLabelFontSize.js
import { LABEL_FONT_SIZES } from '@/config';
import { viewport } from '@/state';

/**
 * Tamaño de letra de una etiqueta: crece despacio al acercar el zoom.
 * @param {string} kind tipo de etiqueta
 */
export function getLabelFontSize(kind) {
  return LABEL_FONT_SIZES[kind] * Math.pow(Math.max(viewport.scale, 0.3), -0.3);
}
