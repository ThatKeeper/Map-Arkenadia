// @ts-check
// src/ui/render/drawLabel.js
import { drawSpacedText } from './drawSpacedText';
import { getLabelAlpha } from './getLabelAlpha';
import { getLabelFont } from './getLabelFont';
import { getLabelFontSize } from './getLabelFontSize';
import { getLetterWidths } from './getLetterWidths';
import { dom } from '@/state';

/**
 * Dibuja una etiqueta (texto, posición ya en mundo, tipo, rotación).
 * @param {Record<string, any>} P paleta
 * @param {string} text
 * @param {number} x posición en el mundo
 * @param {number} y
 * @param {string} kind tipo de etiqueta
 * @param {number} minScale zoom mínimo
 * @param {number} rotation radianes
 */
export function drawLabel(P, text, x, y, kind, minScale, rotation) {
  const alpha = getLabelAlpha(minScale, kind),
    fs = getLabelFontSize(kind),
    sp = kind === 'c' ? fs * 0.14 : kind === 's' ? fs * 0.45 : 0;
  dom.ctx.save();
  dom.ctx.translate(x, y);
  dom.ctx.rotate(rotation);
  dom.ctx.globalAlpha = alpha;
  const letters = sp ? getLetterWidths(text, kind) : null;
  dom.ctx.font = getLabelFont(kind, fs);
  dom.ctx.lineWidth = fs * 0.14;
  dom.ctx.strokeStyle = P.halo;
  dom.ctx.fillStyle = kind === 'n' ? P.note : P.txt;
  if (sp) drawSpacedText(text, letters, fs, sp);
  else {
    dom.ctx.textAlign = 'center';
    dom.ctx.strokeText(text, 0, 0);
    dom.ctx.fillText(text, 0, 0);
  }
  dom.ctx.restore();
}
