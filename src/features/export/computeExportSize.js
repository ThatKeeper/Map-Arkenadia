// @ts-check
// src/features/export/computeExportSize.js
import { EXPORT_FULL_BASE_ZOOM, WORLD_HEIGHT, WORLD_WIDTH } from '@/config';

/**
 * Tamaño y escala de la imagen a exportar, respetando un máximo de píxeles (límite seguro de memoria).
 * - «view»: la vista actual; 1x = tamaño en pantalla.
 * - «full»: el mapa completo; 1x = 0,5 px por unidad del mundo (1200 px de ancho).
 * Si el factor pedido no cabe, se reduce (`clamped: true`) en lugar de fallar.
 * @param {{ scope: 'view'|'full', factor: number, maxPixels: number, view: { scale: number, width: number, height: number, panX: number, panY: number } }} p
 * @returns {{ region: {x:number,y:number,w:number,h:number}, width: number, height: number, ppu: number, zoom: number, k: number, pixels: number, clamped: boolean, requestedFactor: number }}
 */
export function computeExportSize({ scope, factor, maxPixels, view }) {
  const region =
    scope === 'view'
      ? { x: -view.panX / view.scale, y: -view.panY / view.scale, w: view.width / view.scale, h: view.height / view.scale }
      : { x: 0, y: 0, w: WORLD_WIDTH, h: WORLD_HEIGHT };
  const basePpu = scope === 'view' ? view.scale : EXPORT_FULL_BASE_ZOOM;
  const px = (f) => Math.round(region.w * basePpu * f) * Math.round(region.h * basePpu * f);
  let k = factor;
  if (px(k) > maxPixels) k = Math.floor(factor * Math.sqrt(maxPixels / px(factor)) * 100) / 100;
  while (k > 0.05 && px(k) > maxPixels) k = Math.floor((k - 0.01) * 100) / 100;
  const ppu = basePpu * k;
  const width = Math.max(1, Math.round(region.w * ppu)),
    height = Math.max(1, Math.round(region.h * ppu));
  return {
    region,
    width,
    height,
    ppu,
    // Zoom «de diseño»: define detalle, grosores y qué etiquetas se ven. En la vista actual es el zoom de pantalla.
    zoom: scope === 'view' ? view.scale : ppu,
    k,
    pixels: width * height,
    clamped: k < factor,
    requestedFactor: factor,
  };
}
