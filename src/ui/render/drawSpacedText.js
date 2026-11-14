// @ts-check
// src/ui/render/drawSpacedText.js
import { dom } from '@/state';
import { supportsLetterSpacing } from '@/utils';

/**
 * Dibuja un texto con separación entre letras, centrado en el origen (contorno y relleno).
 * Usa `letterSpacing` si el navegador lo admite; si no, coloca cada letra a mano.
 * @param {string} text
 * @param {{sum: number, n: number, w: number[]}} letters anchos de letra normalizados
 * @param {number} fontSize
 * @param {number} spacing separación entre letras (px)
 */
export function drawSpacedText(text, letters, fontSize, spacing) {
  const total = letters.sum * fontSize + spacing * (letters.n - 1),
    start = -total / 2;
  if (supportsLetterSpacing()) {
    dom.ctx.letterSpacing = spacing + 'px';
    dom.ctx.strokeText(text, start, 0);
    dom.ctx.fillText(text, start, 0);
    return;
  }
  let i = 0,
    xx = start;
  for (const ch of text) {
    dom.ctx.strokeText(ch, xx, 0);
    xx += letters.w[i++] * fontSize + spacing;
  }
  i = 0;
  xx = start;
  for (const ch of text) {
    dom.ctx.fillText(ch, xx, 0);
    xx += letters.w[i++] * fontSize + spacing;
  }
}
