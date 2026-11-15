// src/ui/render/drawRouteOn.js
import { TAU } from '@/config';

/**
 * Dibuja una ruta (línea discontinua y paradas numeradas) en coordenadas de «pantalla».
 * @param {{ ctx: CanvasRenderingContext2D, toScreen: (x: number, y: number) => [number, number] }} view
 * @param {Array<{x: number, y: number}>} R puntos de la ruta
 */
export function drawRouteOn(view, R) {
  const { ctx } = view;
  if (R.length) {
    ctx.beginPath();
    R.forEach((p, i) => {
      const [x, y] = view.toScreen(p.x, p.y);
      i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
    });
    ctx.strokeStyle = 'rgba(255,246,222,.85)';
    ctx.lineWidth = 6;
    ctx.stroke();
    ctx.strokeStyle = '#8c2a22';
    ctx.lineWidth = 3;
    ctx.setLineDash([10, 7]);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.font = '700 14px Caveat,sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    R.forEach((p, i) => {
      const [x, y] = view.toScreen(p.x, p.y);
      ctx.beginPath();
      ctx.arc(x, y, 9, 0, TAU);
      ctx.fillStyle = '#8c2a22';
      ctx.fill();
      ctx.strokeStyle = '#fff6de';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = '#fff6de';
      ctx.fillText(i + 1, x, y + 0.5);
    });
  }
}
