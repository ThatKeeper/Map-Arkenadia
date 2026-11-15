// @ts-check
// src/features/labels/getLabelFontSize.js
import { LABEL_FONT_SIZES } from '@/config';
import { viewport } from '@/state';

/**
 * Tamaño de letra (en unidades del mundo) de una etiqueta: crece despacio al acercar el zoom.
 * @param {string} kind tipo de etiqueta
 * @param {number} [sizeMul] multiplicador del usuario
 * @param {number} [zoom] zoom de diseño (por defecto, el de pantalla)
 */
export function getLabelFontSize(kind, sizeMul = 1, zoom = viewport.scale) {
  return LABEL_FONT_SIZES[kind] * Math.pow(Math.max(zoom, 0.3), -0.3) * sizeMul;
}
