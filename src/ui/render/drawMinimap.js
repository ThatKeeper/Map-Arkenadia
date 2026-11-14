// src/ui/render/drawMinimap.js
import { worldToMiniX } from './worldToMiniX';
import { worldToMiniY } from './worldToMiniY';
import { MINI_HEIGHT, MINI_WIDTH, TAU } from '@/config';
import { getVisibleMarkers } from '@/features/markers';
import { dom, loop, session, tilesState, viewport } from '@/state';

/** Dibuja el minimapa con ruta, marcadores y zona visible. */
export function drawMinimap() {
  if (!session.viewOptions.mini || !loop.ready) return;
  const dp = session.quality.dpr;
  dom.miniCtx.setTransform(dp, 0, 0, dp, 0, 0);
  dom.miniCtx.fillStyle = '#1d130b';
  dom.miniCtx.fillRect(0, 0, MINI_WIDTH, MINI_HEIGHT);
  if (tilesState.overview)
    dom.miniCtx.drawImage(tilesState.overview.cv, 0, 0, MINI_WIDTH, MINI_HEIGHT);
  if (session.userData.route.length > 1) {
    dom.miniCtx.beginPath();
    session.userData.route.forEach((p, i) =>
      i
        ? dom.miniCtx.lineTo(worldToMiniX(p.x), worldToMiniY(p.y))
        : dom.miniCtx.moveTo(worldToMiniX(p.x), worldToMiniY(p.y)),
    );
    dom.miniCtx.strokeStyle = '#8c2a22';
    dom.miniCtx.lineWidth = 1.5;
    dom.miniCtx.stroke();
  }
  if (session.viewOptions.markers) {
    const colors = new Map(session.userData.categories.map((c) => [c.id, c.color]));
    for (const m of getVisibleMarkers()) {
      dom.miniCtx.beginPath();
      dom.miniCtx.arc(worldToMiniX(m.x), worldToMiniY(m.y), 2.6, 0, TAU);
      dom.miniCtx.fillStyle = colors.get(m.categoria) || '#6b4a2c';
      dom.miniCtx.fill();
      dom.miniCtx.strokeStyle = '#fff';
      dom.miniCtx.lineWidth = 1;
      dom.miniCtx.stroke();
    }
  }
  const x0 = worldToMiniX(-viewport.panX / viewport.scale),
    y0 = worldToMiniY(-viewport.panY / viewport.scale),
    x1 = worldToMiniX((viewport.width - viewport.panX) / viewport.scale),
    y1 = worldToMiniY((viewport.height - viewport.panY) / viewport.scale);
  dom.miniCtx.fillStyle = 'rgba(255,255,255,.14)';
  dom.miniCtx.fillRect(x0, y0, x1 - x0, y1 - y0);
  dom.miniCtx.strokeStyle = 'rgba(255,244,214,.95)';
  dom.miniCtx.lineWidth = 1.5;
  dom.miniCtx.strokeRect(x0, y0, x1 - x0, y1 - y0);
}
