// src/features/navigation/resetView.js
import { WORLD_HEIGHT, WORLD_WIDTH } from '@/config';
import { viewport } from '@/state';
import { requestRedraw } from '@/ui/loop';

/** Vuelve a mostrar todo el mapa. */
export function resetView() {
  viewport.anchorWorldX = WORLD_WIDTH / 2;
  viewport.anchorWorldY = WORLD_HEIGHT / 2;
  viewport.anchorX = viewport.panX + viewport.anchorWorldX * viewport.scale;
  viewport.anchorY = viewport.panY + viewport.anchorWorldY * viewport.scale;
  viewport.targetAnchorX = viewport.width / 2;
  viewport.targetAnchorY = viewport.height / 2;
  viewport.targetScale = viewport.fitScale;
  requestRedraw();
}
