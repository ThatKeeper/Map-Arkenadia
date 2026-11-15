// @ts-check
// src/ui/render/drawInkIcon.js
import { getIconPaths } from './getIconPaths';
import { dom } from '@/state';

/**
 * Dibuja un icono de tinta centrado en (cx, cy).
 * @param {string} id id del icono
 * @param {number} cx
 * @param {number} cy
 * @param {number} size lado en píxeles
 * @param {string} color color del trazo
 * @param {CanvasRenderingContext2D} [ctx] contexto de destino (por defecto, el del mapa)
 */
export function drawInkIcon(id, cx, cy, size, color, ctx = dom.ctx) {
  const s = size / 24;
  ctx.save();
  ctx.translate(cx - size / 2, cy - size / 2);
  ctx.scale(s, s);
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.7;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  for (const p of getIconPaths(id)) ctx.stroke(p);
  ctx.restore();
}
