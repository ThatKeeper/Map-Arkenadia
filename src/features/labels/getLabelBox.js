// @ts-check
// src/features/labels/getLabelBox.js
import { getLabelFontSize } from './getLabelFontSize';

/**
 * Medio ancho y medio alto aproximados (unidades del mundo) del texto de una etiqueta.
 * @param {import('../../types').EffectiveLabel} l
 */
export function getLabelBox(l) {
  const fs = getLabelFontSize(l.tipo, l.tam),
    spacing = l.tipo === 'c' ? fs * 0.14 : l.tipo === 's' ? fs * 0.45 : 0;
  return {
    fs,
    halfW: (l.texto.length * fs * 0.5 + spacing * Math.max(0, l.texto.length - 1)) / 2,
    halfH: fs * 0.6,
  };
}
