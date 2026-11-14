// src/ui/render/drawRoute.js
import { TAU } from '@/config';
import { worldToScreen } from '@/features/navigation';
import { dom, session } from '@/state';

/** Dibuja la ruta del usuario. */
export function drawRoute() {
  const R = session.userData.route;
  if (R.length) {
    dom.ctx.beginPath();
    R.forEach((p, i) => {
      const [x, y] = worldToScreen(p.x, p.y);
      i ? dom.ctx.lineTo(x, y) : dom.ctx.moveTo(x, y);
    });
    dom.ctx.strokeStyle = 'rgba(255,246,222,.85)';
    dom.ctx.lineWidth = 6;
    dom.ctx.stroke();
    dom.ctx.strokeStyle = '#8c2a22';
    dom.ctx.lineWidth = 3;
    dom.ctx.setLineDash([10, 7]);
    dom.ctx.stroke();
    dom.ctx.setLineDash([]);
    dom.ctx.font = '700 14px Caveat,sans-serif';
    dom.ctx.textAlign = 'center';
    dom.ctx.textBaseline = 'middle';
    R.forEach((p, i) => {
      const [x, y] = worldToScreen(p.x, p.y);
      dom.ctx.beginPath();
      dom.ctx.arc(x, y, 9, 0, TAU);
      dom.ctx.fillStyle = '#8c2a22';
      dom.ctx.fill();
      dom.ctx.strokeStyle = '#fff6de';
      dom.ctx.lineWidth = 2;
      dom.ctx.stroke();
      dom.ctx.fillStyle = '#fff6de';
      dom.ctx.fillText(i + 1, x, y + 0.5);
    });
  }
}
