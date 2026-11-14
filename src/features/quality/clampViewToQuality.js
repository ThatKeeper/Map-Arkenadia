// src/features/quality/clampViewToQuality.js
import { session, viewport } from '@/state';

/** Limita el zoom al máximo permitido por la calidad. */
export function clampViewToQuality() {
  if (viewport.targetScale > session.quality.maxZ) {
    viewport.targetScale = session.quality.maxZ;
  }
  if (viewport.scale > session.quality.maxZ) {
    viewport.scale = session.quality.maxZ;
  }
}
