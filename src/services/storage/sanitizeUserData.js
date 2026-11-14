// @ts-check
// src/services/storage/sanitizeUserData.js
import { DISTANCE_UNITS, MARKER_ICONS, SCHEMA_VERSION, WORLD_HEIGHT, WORLD_WIDTH } from '@/config';
import { migrateUserData } from '@/services/migrations';
import { isFiniteNumber, truncate } from '@/utils';

/**
 * Valida y normaliza datos de usuario (importados o guardados).
 * Primero los migra a la versión actual del esquema y después los depura.
 * @param {any} input
 * @returns {import('../../types').UserData}
 */
export function sanitizeUserData(input) {
  const j = migrateUserData(input);
  /** @type {import('../../types').UserData} */
  const d = { schemaVersion: SCHEMA_VERSION, markers: [], route: [], scale: 1, unit: 'leguas', nid: 1 };
  if (!j || typeof j !== 'object') return d;
  if (Array.isArray(j.markers))
    for (const m of j.markers.slice(0, 500))
      if (m && isFiniteNumber(m.x) && isFiniteNumber(m.y)) {
        const i = m.i | 0;
        d.markers.push({
          id: d.nid++,
          x: Math.max(0, Math.min(WORLD_WIDTH, m.x)),
          y: Math.max(0, Math.min(WORLD_HEIGHT, m.y)),
          n: truncate(m.n, 40) || 'Marcador',
          i: i >= 0 && i < MARKER_ICONS.length ? i : 0,
          t: truncate(m.t, 200),
        });
      }
  if (Array.isArray(j.route))
    for (const p of j.route.slice(0, 500))
      if (p && isFiniteNumber(p.x) && isFiniteNumber(p.y))
        d.route.push({ x: p.x, y: p.y, n: truncate(p.n, 40) });
  if (isFiniteNumber(j.scale) && j.scale > 0 && j.scale < 1e6) d.scale = j.scale;
  if (DISTANCE_UNITS.includes(j.unit)) d.unit = j.unit;
  return d;
}
