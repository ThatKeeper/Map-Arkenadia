// src/features/navigation/resizeCanvas.js
import { dom, session, viewport } from '@/state';
import { sizeMinimap } from '@/ui/panels';

/** Ajusta el canvas al tamaño de la ventana y la densidad de píxeles. */
export function resizeCanvas() {
  const dp = session.quality.dpr;
  viewport.width = dom.view.clientWidth;
  viewport.height = dom.view.clientHeight;
  dom.canvas.width = Math.round(viewport.width * dp);
  dom.canvas.height = Math.round(viewport.height * dp);
  sizeMinimap();
}
