// @ts-check
// src/services/storage/sanitizeUserData.js
import { sanitizeCategories } from './sanitizeCategories';
import { sanitizeLabels } from './sanitizeLabels';
import { sanitizeMarkers } from './sanitizeMarkers';
import { DISTANCE_UNITS, SCHEMA_VERSION } from '@/config';
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
  const src = j && typeof j === 'object' && !Array.isArray(j) ? j : {};
  const categories = sanitizeCategories(src.categories);
  const { markers, nid } = sanitizeMarkers(src.markers, categories);
  /** @type {import('../../types').UserData} */
  const d = {
    schemaVersion: SCHEMA_VERSION,
    categories,
    markers,
    route: [],
    labels: sanitizeLabels(src.labels),
    scale: 1,
    unit: 'leguas',
    nid,
  };
  if (Array.isArray(src.route))
    for (const p of src.route.slice(0, 500))
      if (p && isFiniteNumber(p.x) && isFiniteNumber(p.y))
        d.route.push({ x: p.x, y: p.y, n: truncate(p.n, 40) });
  if (isFiniteNumber(src.scale) && src.scale > 0 && src.scale < 1e6) d.scale = src.scale;
  if (DISTANCE_UNITS.includes(src.unit)) d.unit = src.unit;
  return d;
}
