// src/ui/render/drawMapTitle.js
import { dom } from '@/state';

/** Dibuja el título del mapa. */
export function drawMapTitle(P, vx0, vy0, vx1, vy1, ctx = dom.ctx) {
  if (!(vx1 < 90 || vx0 > 1140 || vy1 < 40 || vy0 > 200)) {
    ctx.save();
    ctx.translate(108, 120);
    ctx.rotate(-0.035);
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 7;
    ctx.strokeStyle = P.halo;
    ctx.fillStyle = P.txt;
    ctx.font = '700 74px Caveat,cursive';
    ctx.strokeText('Mapa del Mundo Conocido', 0, 0);
    ctx.fillText('Mapa del Mundo Conocido', 0, 0);
    ctx.font = '500 34px Caveat,cursive';
    ctx.strokeText('dibujado en mis viajes, a mano y sin prisa…', 0, 46);
    ctx.fillText('dibujado en mis viajes, a mano y sin prisa…', 0, 46);
    ctx.restore();
  }
}
