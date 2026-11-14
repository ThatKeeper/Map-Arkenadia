// src/ui/render/blit.js
import { dom, session, viewport } from '@/state';

/** Dibuja una imagen del mundo en el canvas principal con la vista actual. */
export function blit(img, wx, wy, ww, wh, alpha) {
  const dp = session.quality.dpr,
    x0 = Math.round((wx * viewport.scale + viewport.panX) * dp),
    y0 = Math.round((wy * viewport.scale + viewport.panY) * dp),
    x1 = Math.round(((wx + ww) * viewport.scale + viewport.panX) * dp),
    y1 = Math.round(((wy + wh) * viewport.scale + viewport.panY) * dp);
  if (
    x1 <= x0 ||
    y1 <= y0 ||
    x0 >= dom.canvas.width ||
    y0 >= dom.canvas.height ||
    x1 <= 0 ||
    y1 <= 0
  )
    return;
  dom.ctx.globalAlpha = alpha;
  dom.ctx.drawImage(img, x0, y0, x1 - x0, y1 - y0);
}
