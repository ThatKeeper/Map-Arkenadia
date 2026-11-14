// src/features/navigation/centerOn.js
import { setZoomAnchor } from './setZoomAnchor';
import { viewport } from '@/state';
import { requestRedraw } from '@/ui/loop';

/** Centra la vista de inmediato en el punto (x,y) del mundo. */
export function centerOn(x, y) {
  viewport.panX = viewport.width / 2 - x * viewport.scale;
  viewport.panY = viewport.height / 2 - y * viewport.scale;
  setZoomAnchor(viewport.width / 2, viewport.height / 2);
  requestRedraw();
}
