// src/features/navigation/fitToWindow.js
import { clampZoom } from './clampZoom';
import { resizeCanvas } from './resizeCanvas';
import { setZoomAnchor } from './setZoomAnchor';
import { WORLD_HEIGHT, WORLD_WIDTH } from '@/config';
import { flushAllTiles, renderVisibleSync } from '@/features/tiles';
import { loop, session, viewport } from '@/state';
import { requestRedraw } from '@/ui/loop';

/** Reacciona al cambio de tamaño de la ventana conservando el zoom relativo. */
export function fitToWindow() {
  const odp = session.quality.dpr;
  session.quality.dpr = Math.min(window.devicePixelRatio || 1, session.quality.res);
  if (odp !== session.quality.dpr) {
    flushAllTiles();
    if (loop.ready) renderVisibleSync();
  }
  resizeCanvas();
  const nf = Math.min(viewport.width / WORLD_WIDTH, viewport.height / WORLD_HEIGHT) * 0.95,
    r = viewport.fitScale ? viewport.targetScale / viewport.fitScale : 1;
  viewport.fitScale = nf;
  viewport.targetScale = clampZoom(viewport.fitScale * r);
  viewport.scale = viewport.targetScale;
  setZoomAnchor(viewport.width / 2, viewport.height / 2);
  if (!loop.ready || (r === 1 && !viewport.panX)) {
    viewport.panX = (viewport.width - WORLD_WIDTH * viewport.scale) / 2;
    viewport.panY = (viewport.height - WORLD_HEIGHT * viewport.scale) / 2;
    setZoomAnchor(viewport.width / 2, viewport.height / 2);
  }
  requestRedraw();
}
