// src/ui/render/drawCompassRose.js
import { TAU, WORLD_HEIGHT, WORLD_WIDTH } from '@/config';
import { dom } from '@/state';
import { screenLineWidth } from '@/ui/paint';

/** Dibuja la rosa de los vientos. */
export function drawCompassRose(P, vx0, vy0, vx1, vy1) {
  const cx = 0.93 * WORLD_WIDTH,
    cy = 0.9 * WORLD_HEIGHT;
  if (!(vx1 < cx - 90 || vx0 > cx + 90 || vy1 < cy - 110 || vy0 > cy + 90)) {
    dom.ctx.save();
    dom.ctx.translate(cx, cy);
    dom.ctx.scale(1.5, 1.5);
    dom.ctx.strokeStyle = P.txt;
    dom.ctx.fillStyle = P.txt;
    dom.ctx.lineWidth = screenLineWidth(2) / 1.5;
    dom.ctx.beginPath();
    dom.ctx.arc(0, 0, 30, 0, TAU);
    dom.ctx.setLineDash([3, 4]);
    dom.ctx.stroke();
    dom.ctx.setLineDash([]);
    dom.ctx.beginPath();
    dom.ctx.moveTo(0, -44);
    dom.ctx.lineTo(7, -7);
    dom.ctx.lineTo(44, 0);
    dom.ctx.lineTo(7, 7);
    dom.ctx.lineTo(0, 44);
    dom.ctx.lineTo(-7, 7);
    dom.ctx.lineTo(-44, 0);
    dom.ctx.lineTo(-7, -7);
    dom.ctx.closePath();
    dom.ctx.globalAlpha = 0.25;
    dom.ctx.fill();
    dom.ctx.globalAlpha = 1;
    dom.ctx.stroke();
    dom.ctx.font = '700 22px Caveat,cursive';
    dom.ctx.textAlign = 'center';
    dom.ctx.fillText('N', 0, -50);
    dom.ctx.restore();
  }
}
