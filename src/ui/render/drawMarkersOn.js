// src/ui/render/drawMarkersOn.js
import { drawInkIcon } from './drawInkIcon';
import { TAU } from '@/config';

/**
 * Dibuja marcadores con su icono de tinta en un contexto, en coordenadas de «pantalla».
 * @param {{ ctx: CanvasRenderingContext2D, toScreen: (x: number, y: number) => [number, number], width: number, height: number }} view
 * @param {Record<string, any>} P paleta
 * @param {import('../../types').Marker[]} markers
 * @param {Map<string, string>} colors categoría → color
 * @param {number} paletteMode 0 pergamino, 1 color
 * @param {number|null} selectedId marcador seleccionado
 */
export function drawMarkersOn(view, P, markers, colors, paletteMode, selectedId) {
  const { ctx } = view;
  for (const m of markers) {
    const [x, y] = view.toScreen(m.x, m.y);
    if (x < -40 || y < -40 || x > view.width + 40 || y > view.height + 60) continue;
    const cy = y - 20,
      selected = m.id === selectedId;
    ctx.beginPath();
    ctx.arc(x, cy, 13, 0.75 * Math.PI, 2.25 * Math.PI, false);
    ctx.lineTo(x, y);
    ctx.closePath();
    ctx.globalAlpha = paletteMode === 0 ? 0.9 : 1;
    ctx.fillStyle = colors.get(m.categoria) || '#6b4a2c';
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.strokeStyle = selected ? '#fff' : `rgba(${P.ink},.9)`;
    ctx.lineWidth = selected ? 3 : 2;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, cy, 9, 0, TAU);
    ctx.fillStyle = 'rgba(255,248,230,.93)';
    ctx.fill();
    drawInkIcon(m.icono, x, cy, 14, `rgb(${P.ink})`, ctx);
    ctx.font = '600 19px Caveat,cursive';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.lineWidth = 4;
    ctx.strokeStyle = P.halo;
    ctx.strokeText(m.nombre, x + 16, cy);
    ctx.fillStyle = P.txt;
    ctx.fillText(m.nombre, x + 16, cy);
  }
}
