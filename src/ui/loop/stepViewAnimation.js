// @ts-check
// src/ui/loop/stepViewAnimation.js
import { loop, session, viewport } from '@/state';

/** Recalcula el desplazamiento de la vista a partir de escala y ancla actuales. */
function syncPanToAnchor() {
  viewport.panX = viewport.anchorX - viewport.anchorWorldX * viewport.scale;
  viewport.panY = viewport.anchorY - viewport.anchorWorldY * viewport.scale;
}

/**
 * Acerca la vista (zoom y ancla) a su objetivo con suavizado; si ya casi llegó, la fija.
 * @param {number} dt segundos desde el fotograma anterior
 * @returns {boolean} true si sigue animándose (solo con suavizado activado)
 */
export function stepViewAnimation(dt) {
  const k = session.quality.smooth ? 1 - Math.exp(-dt / 0.09) : 1;
  if (
    Math.abs(Math.log(viewport.targetScale / viewport.scale)) > 0.0004 ||
    Math.abs(viewport.targetAnchorX - viewport.anchorX) > 0.3 ||
    Math.abs(viewport.targetAnchorY - viewport.anchorY) > 0.3
  ) {
    viewport.scale *= Math.pow(viewport.targetScale / viewport.scale, k);
    viewport.anchorX += (viewport.targetAnchorX - viewport.anchorX) * k;
    viewport.anchorY += (viewport.targetAnchorY - viewport.anchorY) * k;
    syncPanToAnchor();
    loop.dirty = true;
    return session.quality.smooth;
  }
  if (
    viewport.scale !== viewport.targetScale ||
    viewport.anchorX !== viewport.targetAnchorX ||
    viewport.anchorY !== viewport.targetAnchorY
  ) {
    viewport.scale = viewport.targetScale;
    viewport.anchorX = viewport.targetAnchorX;
    viewport.anchorY = viewport.targetAnchorY;
    syncPanToAnchor();
    loop.dirty = true;
  }
  return false;
}
