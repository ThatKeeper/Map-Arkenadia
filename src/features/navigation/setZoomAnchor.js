// src/features/navigation/setZoomAnchor.js
import { viewport } from '@/state';

/** Fija el punto de pantalla que se mantiene fijo al hacer zoom. */
export function setZoomAnchor(x, y) {
  viewport.anchorX = viewport.targetAnchorX = x;
  viewport.anchorY = viewport.targetAnchorY = y;
  viewport.anchorWorldX = (x - viewport.panX) / viewport.scale;
  viewport.anchorWorldY = (y - viewport.panY) / viewport.scale;
}
