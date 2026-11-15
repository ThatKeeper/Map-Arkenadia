// @ts-check
// src/features/export/getExportMaxPixels.js
import { EXPORT_MAX_PIXELS_DESKTOP, EXPORT_MAX_PIXELS_MOBILE } from '@/config';

/** Píxeles máximos seguros para la imagen: menos en móviles y equipos con poca memoria. */
export function getExportMaxPixels() {
  const mem = typeof navigator !== 'undefined' ? /** @type {any} */ (navigator).deviceMemory : 0;
  const small = (typeof innerWidth === 'number' && innerWidth < 700) || (mem && mem <= 4);
  return small ? EXPORT_MAX_PIXELS_MOBILE : EXPORT_MAX_PIXELS_DESKTOP;
}
