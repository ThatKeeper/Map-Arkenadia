// src/ui/render/drawMapTitle.js
import { dom } from '@/state';

/** Dibuja el título del mapa. */
export function drawMapTitle(P, vx0, vy0, vx1, vy1) {
  if (!(vx1 < 90 || vx0 > 1140 || vy1 < 40 || vy0 > 200)) {
    dom.ctx.save();
    dom.ctx.translate(108, 120);
    dom.ctx.rotate(-0.035);
    dom.ctx.textAlign = 'left';
    dom.ctx.textBaseline = 'alphabetic';
    dom.ctx.lineJoin = 'round';
    dom.ctx.lineWidth = 7;
    dom.ctx.strokeStyle = P.halo;
    dom.ctx.fillStyle = P.txt;
    dom.ctx.font = '700 74px Caveat,cursive';
    dom.ctx.strokeText('Mapa del Mundo Conocido', 0, 0);
    dom.ctx.fillText('Mapa del Mundo Conocido', 0, 0);
    dom.ctx.font = '500 34px Caveat,cursive';
    dom.ctx.strokeText('dibujado en mis viajes, a mano y sin prisa…', 0, 46);
    dom.ctx.fillText('dibujado en mis viajes, a mano y sin prisa…', 0, 46);
    dom.ctx.restore();
  }
}
