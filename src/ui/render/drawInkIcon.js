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
 */
export function drawInkIcon(id, cx, cy, size, color) {
  const s = size / 24;
  dom.ctx.save();
  dom.ctx.translate(cx - size / 2, cy - size / 2);
  dom.ctx.scale(s, s);
  dom.ctx.strokeStyle = color;
  dom.ctx.lineWidth = 1.7;
  dom.ctx.lineCap = 'round';
  dom.ctx.lineJoin = 'round';
  for (const p of getIconPaths(id)) dom.ctx.stroke(p);
  dom.ctx.restore();
}
