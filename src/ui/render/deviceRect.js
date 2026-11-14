// src/ui/render/deviceRect.js
import { session, viewport } from '@/state';

/** Rectángulo en píxeles de dispositivo de una región del mundo. */
export function deviceRect(wx, wy, ww, wh) {
  const dp = session.quality.dpr;
  return [
    Math.round((wx * viewport.scale + viewport.panX) * dp),
    Math.round((wy * viewport.scale + viewport.panY) * dp),
    Math.round(((wx + ww) * viewport.scale + viewport.panX) * dp),
    Math.round(((wy + wh) * viewport.scale + viewport.panY) * dp),
  ];
}
