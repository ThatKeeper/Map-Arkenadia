// @ts-check
// src/services/storage/sanitizeMarkers.js
import { FALLBACK_CATEGORY_ID, INK_ICONS, VISIBILITIES, WORLD_HEIGHT, WORLD_WIDTH } from '@/config';
import { isFiniteNumber, truncate } from '@/utils';

const ICON_IDS = new Set(INK_ICONS.map((i) => i.id));
const VIS_IDS = new Set(VISIBILITIES.map((v) => v[0]));

/**
 * Depura los marcadores (máx. 500). Conserva los ids válidos y únicos; reasigna los demás.
 * @param {any} input
 * @param {import('../../types').Category[]} categories catálogo ya depurado
 * @param {number} [nidHint] siguiente id guardado: nunca se baja de él, para no reutilizar ids ya compartidos
 * @returns {{ markers: import('../../types').Marker[], nid: number }}
 */
export function sanitizeMarkers(input, categories, nidHint = 0) {
  /** @type {import('../../types').Marker[]} */
  const markers = [];
  const used = new Set();
  const byId = new Map(categories.map((c) => [c.id, c]));
  const fallback = byId.get(FALLBACK_CATEGORY_ID) || categories[0];
  const pending = [];
  if (Array.isArray(input))
    for (const m of input.slice(0, 500)) {
      if (!m || !isFiniteNumber(m.x) || !isFiniteNumber(m.y)) continue;
      const wanted = Number.isInteger(m.id) && m.id > 0 && !used.has(m.id) ? m.id : 0;
      if (wanted) used.add(wanted);
      pending.push({ m, id: wanted });
    }
  let nid = Number.isInteger(nidHint) && nidHint > 0 ? nidHint : 1;
  for (const id of used) nid = Math.max(nid, id + 1);
  for (const { m, id } of pending) {
    const cat = byId.get(m.categoria) || fallback;
    const creado = isFiniteNumber(m.creado) && m.creado >= 0 ? m.creado : 0;
    markers.push({
      id: id || nid++,
      nombre: truncate(m.nombre, 40).trim() || 'Marcador',
      nota: truncate(m.nota, 200),
      notaDm: truncate(m.notaDm, 500),
      x: Math.max(0, Math.min(WORLD_WIDTH, m.x)),
      y: Math.max(0, Math.min(WORLD_HEIGHT, m.y)),
      categoria: cat.id,
      icono: ICON_IDS.has(m.icono) ? m.icono : cat.icono,
      visibilidad: VIS_IDS.has(m.visibilidad) ? m.visibilidad : 'todos',
      creado,
      actualizado: isFiniteNumber(m.actualizado) && m.actualizado >= 0 ? m.actualizado : creado,
    });
  }
  return { markers, nid };
}
