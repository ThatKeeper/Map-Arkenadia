// src/ui/export/drawLegendOn.js
import { TAU } from '@/config';
import { drawInkIcon } from '@/ui/render';

const MAX_ROWS = 14;

/**
 * Leyenda en la esquina inferior izquierda (en píxeles de pantalla; el contexto ya está escalado).
 * @param {CanvasRenderingContext2D} ctx
 * @param {Array<{ nombre: string, color: string, icono: string }>} entries categorías a mostrar
 * @param {Record<string, any>} P paleta
 * @param {number} height alto disponible (px de pantalla)
 */
export function drawLegendOn(ctx, entries, P, height) {
  if (!entries.length) return;
  const rows = entries.slice(0, MAX_ROWS),
    rowH = 26,
    pad = 10,
    titleH = 26;
  ctx.font = '600 19px Caveat,cursive';
  const textW = Math.max(...rows.map((e) => ctx.measureText(e.nombre).width), 60),
    w = pad * 2 + 28 + textW,
    h = pad * 2 + titleH + rows.length * rowH,
    x = 14,
    y = height - 14 - h;
  ctx.save();
  ctx.fillStyle = 'rgba(246,234,208,.93)';
  ctx.strokeStyle = `rgba(${P.ink},.9)`;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = `rgb(${P.ink})`;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.font = '700 22px Caveat,cursive';
  ctx.fillText('Leyenda', x + pad, y + pad + titleH / 2);
  ctx.font = '600 19px Caveat,cursive';
  rows.forEach((e, i) => {
    const cy = y + pad + titleH + i * rowH + rowH / 2;
    ctx.beginPath();
    ctx.arc(x + pad + 10, cy, 10, 0, TAU);
    ctx.fillStyle = e.color;
    ctx.fill();
    ctx.strokeStyle = `rgba(${P.ink},.9)`;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    drawInkIcon(e.icono, x + pad + 10, cy, 13, '#fff6de', ctx);
    ctx.fillStyle = `rgb(${P.ink})`;
    ctx.fillText(e.nombre, x + pad + 28, cy);
  });
  ctx.restore();
}
