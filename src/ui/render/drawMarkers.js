// src/ui/render/drawMarkers.js
import { drawInkIcon } from './drawInkIcon';
import { TAU } from '@/config';
import { worldToScreen } from '@/features/navigation';
import { getVisibleMarkers } from '@/features/markers';
import { dom, session, viewport } from '@/state';

/** Dibuja los marcadores visibles (según el filtro de categorías) con su icono de tinta. */
export function drawMarkers(P) {
  if (!session.viewOptions.markers) return;
  const colors = new Map(session.userData.categories.map((c) => [c.id, c.color]));
  for (const m of getVisibleMarkers()) {
    const [x, y] = worldToScreen(m.x, m.y);
    if (x < -40 || y < -40 || x > viewport.width + 40 || y > viewport.height + 60) continue;
    const cy = y - 20,
      selected = m.id === session.selectedMarkerId;
    dom.ctx.beginPath();
    dom.ctx.arc(x, cy, 13, 0.75 * Math.PI, 2.25 * Math.PI, false);
    dom.ctx.lineTo(x, y);
    dom.ctx.closePath();
    dom.ctx.globalAlpha = session.paletteMode === 0 ? 0.9 : 1;
    dom.ctx.fillStyle = colors.get(m.categoria) || '#6b4a2c';
    dom.ctx.fill();
    dom.ctx.globalAlpha = 1;
    dom.ctx.strokeStyle = selected ? '#fff' : `rgba(${P.ink},.9)`;
    dom.ctx.lineWidth = selected ? 3 : 2;
    dom.ctx.stroke();
    dom.ctx.beginPath();
    dom.ctx.arc(x, cy, 9, 0, TAU);
    dom.ctx.fillStyle = 'rgba(255,248,230,.93)';
    dom.ctx.fill();
    drawInkIcon(m.icono, x, cy, 14, `rgb(${P.ink})`);
    dom.ctx.font = '600 19px Caveat,cursive';
    dom.ctx.textAlign = 'left';
    dom.ctx.textBaseline = 'middle';
    dom.ctx.lineWidth = 4;
    dom.ctx.strokeStyle = P.halo;
    dom.ctx.strokeText(m.nombre, x + 16, cy);
    dom.ctx.fillStyle = P.txt;
    dom.ctx.fillText(m.nombre, x + 16, cy);
  }
}
