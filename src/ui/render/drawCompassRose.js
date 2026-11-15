// src/ui/render/drawCompassRose.js
import { TAU, WORLD_HEIGHT, WORLD_WIDTH } from '@/config';
import { dom, viewport } from '@/state';
import { screenLineWidth } from '@/ui/paint';

/** Dibuja la rosa de los vientos. */
export function drawCompassRose(P, vx0, vy0, vx1, vy1, ctx = dom.ctx, zoom = viewport.scale) {
  const cx = 0.93 * WORLD_WIDTH,
    cy = 0.9 * WORLD_HEIGHT;
  if (!(vx1 < cx - 90 || vx0 > cx + 90 || vy1 < cy - 110 || vy0 > cy + 90)) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(1.5, 1.5);
    ctx.strokeStyle = P.txt;
    ctx.fillStyle = P.txt;
    ctx.lineWidth = (zoom === viewport.scale ? screenLineWidth(2) : 2 * Math.pow(zoom, -0.7)) / 1.5;
    ctx.beginPath();
    ctx.arc(0, 0, 30, 0, TAU);
    ctx.setLineDash([3, 4]);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(0, -44);
    ctx.lineTo(7, -7);
    ctx.lineTo(44, 0);
    ctx.lineTo(7, 7);
    ctx.lineTo(0, 44);
    ctx.lineTo(-7, 7);
    ctx.lineTo(-44, 0);
    ctx.lineTo(-7, -7);
    ctx.closePath();
    ctx.globalAlpha = 0.25;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.stroke();
    ctx.font = '700 22px Caveat,cursive';
    ctx.textAlign = 'center';
    ctx.fillText('N', 0, -50);
    ctx.restore();
  }
}
