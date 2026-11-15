// src/ui/export/drawGridOn.js
import { EXPORT_GRID_STEP, WORLD_HEIGHT, WORLD_WIDTH } from '@/config';
import { getColumnLabel } from '@/features/export';

/**
 * Cuadrícula de juego (columnas A, B, C… y filas 1, 2, 3…) con la transformación del mundo ya aplicada.
 * @param {CanvasRenderingContext2D} ctx
 * @param {{ region: {x:number,y:number,w:number,h:number}, ppu: number, k: number }} size
 * @param {Record<string, any>} P paleta
 */
export function drawGridOn(ctx, size, P) {
  const { region, ppu, k } = size,
    px = k / ppu, // un píxel de pantalla en unidades del mundo
    x0 = Math.max(0, region.x),
    y0 = Math.max(0, region.y),
    x1 = Math.min(WORLD_WIDTH, region.x + region.w),
    y1 = Math.min(WORLD_HEIGHT, region.y + region.h),
    c0 = Math.floor(x0 / EXPORT_GRID_STEP),
    c1 = Math.ceil(x1 / EXPORT_GRID_STEP),
    r0 = Math.floor(y0 / EXPORT_GRID_STEP),
    r1 = Math.ceil(y1 / EXPORT_GRID_STEP);
  ctx.save();
  ctx.beginPath();
  for (let c = c0; c <= c1; c++) {
    ctx.moveTo(c * EXPORT_GRID_STEP, y0);
    ctx.lineTo(c * EXPORT_GRID_STEP, y1);
  }
  for (let r = r0; r <= r1; r++) {
    ctx.moveTo(x0, r * EXPORT_GRID_STEP);
    ctx.lineTo(x1, r * EXPORT_GRID_STEP);
  }
  ctx.strokeStyle = `rgba(${P.ink},.28)`;
  ctx.lineWidth = px;
  ctx.stroke();
  ctx.font = `700 ${15 * px}px Caveat,cursive`;
  ctx.fillStyle = `rgba(${P.ink},.8)`;
  ctx.textBaseline = 'top';
  ctx.textAlign = 'center';
  for (let c = c0; c < c1; c++) ctx.fillText(getColumnLabel(c), (c + 0.5) * EXPORT_GRID_STEP, y0 + 3 * px);
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'left';
  for (let r = r0; r < r1; r++) ctx.fillText(String(r + 1), x0 + 4 * px, (r + 0.5) * EXPORT_GRID_STEP);
  ctx.restore();
}
