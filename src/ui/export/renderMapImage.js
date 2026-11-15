// src/ui/export/renderMapImage.js
import { drawExportOverlays } from './drawExportOverlays';
import { paintExportBase } from './paintExportBase';
import { PALETTES } from '@/config';
import { session } from '@/state';

/**
 * Genera la imagen del mapa: base por franjas y después las capas elegidas.
 * @param {ReturnType<import('@/features/export').computeExportSize>} size
 * @param {ReturnType<import('@/features/export').getExportData>} data
 * @param {{ markers: boolean, route: boolean, labels: boolean, grid: boolean, legend: boolean, scalebar: boolean }} options
 * @param {{ onProgress?: (fraction: number) => void, shouldCancel?: () => boolean }} [hooks]
 * @returns {Promise<HTMLCanvasElement>}
 */
export async function renderMapImage(size, data, options, hooks = {}) {
  const out = document.createElement('canvas');
  out.width = size.width;
  out.height = size.height;
  await paintExportBase(out, size, hooks);
  drawExportOverlays(/** @type {CanvasRenderingContext2D} */ (out.getContext('2d')), size, data, options, PALETTES[session.paletteMode]);
  return out;
}
