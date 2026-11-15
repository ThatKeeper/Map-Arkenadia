// src/ui/export/paintExportBase.js
import { EXPORT_STRIP_PIXELS } from '@/config';
import { planExportStrips } from '@/features/export';
import { paintWorldRegion } from '@/ui/paint';
import { yieldToMain } from '@/utils';

/**
 * Pinta la base del mapa (terreno, costas, detalles, papel) en franjas horizontales:
 * cada franja se pinta en un lienzo pequeño, se copia a la imagen y se cede el hilo antes de la siguiente,
 * así la interfaz sigue respondiendo y no se necesita un lienzo temporal gigante.
 * @param {HTMLCanvasElement} out imagen de salida
 * @param {{ width: number, height: number, ppu: number, zoom: number, region: {x:number,y:number,w:number,h:number} }} size
 * @param {{ onProgress?: (fraction: number) => void, shouldCancel?: () => boolean }} [hooks]
 * @returns {Promise<number>} número de franjas pintadas
 */
export async function paintExportBase(out, size, hooks = {}) {
  const octx = /** @type {CanvasRenderingContext2D} */ (out.getContext('2d', { alpha: false }));
  const strips = planExportStrips(size.width, size.height, EXPORT_STRIP_PIXELS);
  const strip = document.createElement('canvas');
  strip.width = size.width;
  for (let i = 0; i < strips.length; i++) {
    if (hooks.shouldCancel && hooks.shouldCancel()) throw new DOMException('Exportación cancelada', 'AbortError');
    const s = strips[i];
    strip.height = s.h;
    const g = /** @type {CanvasRenderingContext2D} */ (strip.getContext('2d', { alpha: false }));
    paintWorldRegion(g, size.region.x, size.region.y + s.y / size.ppu, size.region.w, s.h / size.ppu, size.zoom, size.ppu, 0, s.y, false);
    octx.drawImage(strip, 0, s.y);
    if (hooks.onProgress) hooks.onProgress((i + 1) / strips.length);
    await yieldToMain();
  }
  strip.width = strip.height = 1;
  return strips.length;
}
