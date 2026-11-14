// src/ui/render/drawFrame.js
import { drawLabels } from './drawLabels';
import { drawMinimap } from './drawMinimap';
import { drawOverlay } from './drawOverlay';
import { drawTileLayers } from './drawTileLayers';
import { drawUserLayer } from './drawUserLayer';
import { PALETTES } from '@/config';
import { build, dom, loop, session, tilesState, viewport } from '@/state';

/** Dibuja un fotograma completo (teselas, etiquetas, capa de usuario, minimapa). */
export function drawFrame(now) {
  const dp = session.quality.dpr,
    P = PALETTES[session.paletteMode];
  dom.ctx.setTransform(1, 0, 0, 1, 0, 0);
  dom.ctx.globalAlpha = 1;
  dom.ctx.fillStyle = '#1d130b';
  dom.ctx.fillRect(0, 0, dom.canvas.width, dom.canvas.height);
  loop.fading = false;
  tilesState.frameNo++;
  if (loop.ready && build.geometry) {
    drawTileLayers(now);
    dom.ctx.setTransform(
      dp * viewport.scale,
      0,
      0,
      dp * viewport.scale,
      dp * viewport.panX,
      dp * viewport.panY,
    );
    const vx0 = -viewport.panX / viewport.scale,
      vy0 = -viewport.panY / viewport.scale,
      vx1 = (viewport.width - viewport.panX) / viewport.scale,
      vy1 = (viewport.height - viewport.panY) / viewport.scale;
    drawOverlay(P, vx0, vy0, vx1, vy1);
    if (session.quality.labels) drawLabels(P, vx0, vy0, vx1, vy1);
    drawUserLayer(P);
    dom.ctx.setTransform(1, 0, 0, 1, 0, 0);
    drawMinimap();
  }
  dom.zoomLabel.textContent = Math.round((viewport.targetScale / viewport.fitScale) * 100) + '%';
}
