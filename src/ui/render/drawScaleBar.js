// src/ui/render/drawScaleBar.js
import { MINI_HEIGHT } from '@/config';
import { dom, session, viewport } from '@/state';

/** Dibuja la barra de escala. */
export function drawScaleBar() {
  if (session.viewOptions.scalebar) {
    const sc = session.userData.scale,
      tgt = (110 / viewport.scale) * sc,
      p10 = Math.pow(10, Math.floor(Math.log10(tgt))),
      f = tgt / p10,
      nice = (f >= 5 ? 5 : f >= 2 ? 2 : 1) * p10,
      px = (nice / sc) * viewport.scale,
      bx = viewport.width - 14 - px,
      by = viewport.height - 14 - (session.viewOptions.mini ? MINI_HEIGHT + 12 : 0);
    dom.ctx.beginPath();
    dom.ctx.moveTo(bx, by - 6);
    dom.ctx.lineTo(bx, by);
    dom.ctx.lineTo(bx + px, by);
    dom.ctx.lineTo(bx + px, by - 6);
    dom.ctx.strokeStyle = 'rgba(255,246,222,.9)';
    dom.ctx.lineWidth = 5;
    dom.ctx.stroke();
    dom.ctx.strokeStyle = '#3b2a1a';
    dom.ctx.lineWidth = 2;
    dom.ctx.stroke();
    dom.ctx.font = '600 18px Caveat,cursive';
    dom.ctx.textAlign = 'center';
    dom.ctx.textBaseline = 'bottom';
    const t = nice.toLocaleString('es') + ' ' + session.userData.unit;
    dom.ctx.lineWidth = 4;
    dom.ctx.strokeStyle = 'rgba(255,246,222,.9)';
    dom.ctx.strokeText(t, bx + px / 2, by - 7);
    dom.ctx.fillStyle = '#3b2a1a';
    dom.ctx.fillText(t, bx + px / 2, by - 7);
  }
}
