// src/ui/render/drawScaleBarOn.js

/**
 * Dibuja una barra de escala con longitud «redonda» (1, 2 o 5 × 10ⁿ) en la esquina inferior derecha.
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} zoom píxeles de pantalla por unidad del mundo
 * @param {number} width ancho disponible (px de pantalla)
 * @param {number} height alto disponible (px de pantalla)
 * @param {number} bottomExtra espacio a reservar abajo (p. ej. el minimapa)
 * @param {number} scale unidades de distancia por unidad del mundo
 * @param {string} unit nombre de la unidad
 */
export function drawScaleBarOn(ctx, zoom, width, height, bottomExtra, scale, unit) {
  const sc = scale,
    tgt = (110 / zoom) * sc,
    p10 = Math.pow(10, Math.floor(Math.log10(tgt))),
    f = tgt / p10,
    nice = (f >= 5 ? 5 : f >= 2 ? 2 : 1) * p10,
    px = (nice / sc) * zoom,
    bx = width - 14 - px,
    by = height - 14 - bottomExtra;
  ctx.beginPath();
  ctx.moveTo(bx, by - 6);
  ctx.lineTo(bx, by);
  ctx.lineTo(bx + px, by);
  ctx.lineTo(bx + px, by - 6);
  ctx.strokeStyle = 'rgba(255,246,222,.9)';
  ctx.lineWidth = 5;
  ctx.stroke();
  ctx.strokeStyle = '#3b2a1a';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.font = '600 18px Caveat,cursive';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'bottom';
  const t = nice.toLocaleString('es') + ' ' + unit;
  ctx.lineWidth = 4;
  ctx.strokeStyle = 'rgba(255,246,222,.9)';
  ctx.strokeText(t, bx + px / 2, by - 7);
  ctx.fillStyle = '#3b2a1a';
  ctx.fillText(t, bx + px / 2, by - 7);
}
