// src/ui/export/exportMapImage.js
import { encodeCanvas } from './encodeCanvas';
import { renderMapImage } from './renderMapImage';
import { computeExportSize, getExportData, getExportMaxPixels } from '@/features/export';
import { buildFileName } from '@/features/sharing';
import { viewport } from '@/state';

/**
 * Calcula el tamaño (respetando el límite de memoria), genera la imagen y la codifica.
 * @param {typeof import('@/config').DEFAULT_EXPORT_OPTIONS} options
 * @param {{ onProgress?: (fraction: number) => void, shouldCancel?: () => boolean }} [hooks]
 * @returns {Promise<{ blob: Blob, filename: string, size: ReturnType<typeof computeExportSize> }>}
 */
export async function exportMapImage(options, hooks = {}) {
  const size = computeExportSize({
    scope: /** @type {'view'|'full'} */ (options.scope),
    factor: options.factor,
    maxPixels: getExportMaxPixels(),
    view: viewport,
  });
  const data = getExportData({ ...options, version: /** @type {'completa'|'jugadores'} */ (options.version) });
  const canvas = await renderMapImage(size, data, options, hooks);
  const format = /** @type {'png'|'pdf'} */ (options.format);
  const blob = await encodeCanvas(canvas, format);
  canvas.width = canvas.height = 1;
  return { blob, filename: buildFileName(options.scope === 'full' ? 'mapa' : 'mapa-vista', format), size };
}
