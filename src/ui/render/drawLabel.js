// src/ui/render/drawLabel.js
import { drawSpacedText } from './drawSpacedText';
import { getLabelAlpha } from './getLabelAlpha';
import { getLabelFont } from './getLabelFont';
import { getLetterWidths } from './getLetterWidths';
import { getLabelBox, getLabelFontSize } from '@/features/labels';
import { dom, viewport } from '@/state';

/**
 * Dibuja una etiqueta (texto, posición ya en mundo, tipo, rotación).
 * @param {Record<string, any>} P paleta
 * @param {string} text
 * @param {number} x posición en el mundo
 * @param {number} y
 * @param {string} kind tipo de etiqueta
 * @param {number} minScale zoom mínimo
 * @param {number} rotation radianes
 * @param {import('../../types').EffectiveLabel} [selected] si se pasa, se marca como seleccionada
 * @param {number} [sizeMul] multiplicador de tamaño
 * @param {CanvasRenderingContext2D} [ctx] contexto de destino (por defecto, el del mapa)
 * @param {number} [zoom] zoom de diseño (por defecto, el de pantalla)
 */
export function drawLabel(P, text, x, y, kind, minScale, rotation, selected, sizeMul = 1, ctx = dom.ctx, zoom = viewport.scale) {
  const alpha = getLabelAlpha(minScale, kind, zoom),
    fs = getLabelFontSize(kind, sizeMul, zoom),
    sp = kind === 'c' ? fs * 0.14 : kind === 's' ? fs * 0.45 : 0;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.globalAlpha = alpha;
  const letters = sp ? getLetterWidths(text, kind) : null;
  ctx.font = getLabelFont(kind, fs);
  ctx.lineWidth = fs * 0.14;
  ctx.strokeStyle = P.halo;
  ctx.fillStyle = kind === 'n' ? P.note : P.txt;
  if (sp) drawSpacedText(text, letters, fs, sp, ctx);
  else {
    ctx.textAlign = 'center';
    ctx.strokeText(text, 0, 0);
    ctx.fillText(text, 0, 0);
  }
  if (selected) {
    const { halfW, halfH } = getLabelBox(selected);
    ctx.globalAlpha = 1;
    ctx.setLineDash([fs * 0.25, fs * 0.15]);
    ctx.strokeStyle = '#2a6fb0';
    ctx.lineWidth = fs * 0.06;
    ctx.strokeRect(-halfW - fs * 0.15, -halfH, 2 * halfW + fs * 0.3, 2 * halfH);
    ctx.setLineDash([]);
  }
  ctx.restore();
}
