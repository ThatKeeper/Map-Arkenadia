// src/features/navigation/flyTo.js
import { clampZoom } from './clampZoom';
import { loop, viewport } from '@/state';
import { requestRedraw } from '@/ui/loop';

/** Desplaza el mapa hasta el punto (x,y) con zoom z. */
export function flyTo(x, y, z) {
  viewport.targetScale = clampZoom(z);
  viewport.anchorWorldX = x;
  viewport.anchorWorldY = y;
  viewport.anchorX = viewport.panX + x * viewport.scale;
  viewport.anchorY = viewport.panY + y * viewport.scale;
  viewport.targetAnchorX = viewport.width / 2;
  viewport.targetAnchorY = viewport.height / 2;
  loop.lastWheel = performance.now();
  requestRedraw();
}
