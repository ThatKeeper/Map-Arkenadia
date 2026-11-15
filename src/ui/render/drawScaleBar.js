// src/ui/render/drawScaleBar.js
import { drawScaleBarOn } from './drawScaleBarOn';
import { MINI_HEIGHT } from '@/config';
import { dom, session, viewport } from '@/state';

/** Dibuja la barra de escala. */
export function drawScaleBar() {
  if (session.viewOptions.scalebar)
    drawScaleBarOn(
      dom.ctx,
      viewport.scale,
      viewport.width,
      viewport.height,
      session.viewOptions.mini ? MINI_HEIGHT + 12 : 0,
      session.userData.scale,
      session.userData.unit,
    );
}
