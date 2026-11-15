// src/ui/export/drawExportOverlays.js
import { drawGridOn } from './drawGridOn';
import { drawLegendOn } from './drawLegendOn';
import { getLegendEntries } from '@/features/export';
import { session } from '@/state';
import { drawLabelsOn, drawMarkersOn, drawOverlay, drawRouteOn, drawScaleBarOn } from '@/ui/render';

/**
 * Dibuja sobre la base lo que se haya elegido: título y rosa, cuadrícula, etiquetas (en coordenadas del mundo)
 * y, a tamaño de pantalla escalado por `k`, ruta, marcadores, barra de escala y leyenda.
 * @param {CanvasRenderingContext2D} ctx
 * @param {{ width: number, height: number, ppu: number, k: number, zoom: number, region: {x:number,y:number,w:number,h:number} }} size
 * @param {{ markers: import('../../types').Marker[], labels: import('../../types').EffectiveLabel[], route: Array<{x:number,y:number}> }} data
 * @param {{ markers: boolean, route: boolean, labels: boolean, grid: boolean, legend: boolean, scalebar: boolean }} options
 * @param {Record<string, any>} P paleta
 */
export function drawExportOverlays(ctx, size, data, options, P) {
  const { region, ppu, k, zoom } = size,
    box = /** @type {[number, number, number, number]} */ ([region.x, region.y, region.x + region.w, region.y + region.h]);
  ctx.save();
  ctx.setTransform(ppu, 0, 0, ppu, -region.x * ppu, -region.y * ppu);
  drawOverlay(P, box[0], box[1], box[2], box[3], ctx, zoom);
  if (options.grid) drawGridOn(ctx, size, P);
  if (options.labels) drawLabelsOn(ctx, P, data.labels, zoom, box);
  ctx.restore();

  ctx.save();
  ctx.setTransform(k, 0, 0, k, 0, 0);
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  const w = size.width / k,
    h = size.height / k,
    view = { ctx, toScreen: /** @type {(x: number, y: number) => [number, number]} */ ((x, y) => [((x - region.x) * ppu) / k, ((y - region.y) * ppu) / k]), width: w, height: h };
  if (options.route) drawRouteOn(view, data.route);
  if (options.markers) {
    const colors = new Map(session.userData.categories.map((c) => [c.id, c.color]));
    drawMarkersOn(view, P, data.markers, colors, session.paletteMode, null);
  }
  if (options.scalebar) drawScaleBarOn(ctx, ppu / k, w, h, 0, session.userData.scale, session.userData.unit);
  if (options.legend)
    drawLegendOn(ctx, getLegendEntries(session.userData.categories, options.markers ? data.markers : []), P, h);
  ctx.restore();
}
