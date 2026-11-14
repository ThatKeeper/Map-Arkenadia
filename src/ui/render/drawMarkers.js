// src/ui/render/drawMarkers.js
import { MARKER_ICONS, TAU } from '@/config';
import { worldToScreen } from '@/features/navigation';
import { dom, session, viewport } from '@/state';

/** Dibuja los marcadores del usuario. */
export function drawMarkers(P) {
  if (session.viewOptions.markers)
    for (const m of session.userData.markers) {
      const [x, y] = worldToScreen(m.x, m.y);
      if (x < -40 || y < -40 || x > viewport.width + 40 || y > viewport.height + 60) continue;
      const ic = MARKER_ICONS[m.i],
        cy = y - 20;
      dom.ctx.beginPath();
      dom.ctx.arc(x, cy, 13, 0.75 * Math.PI, 2.25 * Math.PI, false);
      dom.ctx.lineTo(x, y);
      dom.ctx.closePath();
      dom.ctx.fillStyle = ic[1];
      dom.ctx.fill();
      dom.ctx.strokeStyle = m.id === session.selectedMarkerId ? '#fff' : 'rgba(40,25,10,.9)';
      dom.ctx.lineWidth = m.id === session.selectedMarkerId ? 3 : 2;
      dom.ctx.stroke();
      dom.ctx.beginPath();
      dom.ctx.arc(x, cy, 9, 0, TAU);
      dom.ctx.fillStyle = 'rgba(255,248,230,.93)';
      dom.ctx.fill();
      dom.ctx.font = '14px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif';
      dom.ctx.textAlign = 'center';
      dom.ctx.textBaseline = 'middle';
      dom.ctx.fillStyle = '#000';
      dom.ctx.fillText(ic[0], x, cy + 1);
      dom.ctx.font = '600 19px Caveat,cursive';
      dom.ctx.textAlign = 'left';
      dom.ctx.lineWidth = 4;
      dom.ctx.strokeStyle = P.halo;
      dom.ctx.strokeText(m.n, x + 16, cy);
      dom.ctx.fillStyle = P.txt;
      dom.ctx.fillText(m.n, x + 16, cy);
    }
}
