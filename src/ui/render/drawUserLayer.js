// src/ui/render/drawUserLayer.js
import { drawMarkers } from './drawMarkers';
import { drawRoute } from './drawRoute';
import { drawScaleBar } from './drawScaleBar';
import { dom, session } from '@/state';

/** Dibuja ruta, marcadores y barra de escala a tamaño constante de pantalla. */
export function drawUserLayer(P) {
  const dp = session.quality.dpr;
  dom.ctx.setTransform(dp, 0, 0, dp, 0, 0);
  dom.ctx.lineJoin = 'round';
  dom.ctx.lineCap = 'round';
  drawRoute();
  drawMarkers(P);
  drawScaleBar();
}
