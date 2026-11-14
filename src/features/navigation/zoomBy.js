// src/features/navigation/zoomBy.js
import { clampZoom } from './clampZoom';
import { setZoomAnchor } from './setZoomAnchor';
import { viewport } from '@/state';
import { requestRedraw } from '@/ui/loop';

/** Multiplica el zoom objetivo por un factor, centrado en la pantalla. */
export const zoomBy = (f) => {
  viewport.targetScale = clampZoom(viewport.targetScale * f);
  setZoomAnchor(viewport.width / 2, viewport.height / 2);
  requestRedraw();
};
