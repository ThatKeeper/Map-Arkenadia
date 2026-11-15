// src/ui/lists/updateExportReadout.js
import { readExportOptions } from './readExportOptions';
import { computeExportSize, getExportMaxPixels } from '@/features/export';
import { viewport } from '@/state';
import { byId } from '@/utils';

/** Muestra el tamaño resultante y avisa si se reduce por el límite de memoria o si será grande. */
export function updateExportReadout() {
  const o = readExportOptions(),
    max = getExportMaxPixels(),
    s = computeExportSize({ scope: o.scope, factor: o.factor, maxPixels: max, view: viewport }),
    mp = (s.pixels / 1e6).toFixed(1);
  let t = `${s.width} × ${s.height} px (${mp} Mpx).`;
  if (s.clamped)
    t += ` Aviso: se reduce de ${o.factor}x a ${s.k}x para no agotar la memoria (máx. ${(max / 1e6).toFixed(0)} Mpx).`;
  else if (s.pixels > 16e6) t += ' Es una imagen grande: puede tardar unos segundos.';
  byId('eSize').textContent = t;
}
