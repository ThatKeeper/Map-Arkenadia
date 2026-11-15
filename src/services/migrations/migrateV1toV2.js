// @ts-check
// src/services/migrations/migrateV1toV2.js
import { DEFAULT_CATEGORIES, LEGACY_ICON_MAP } from '@/config';

/**
 * Convierte un marcador v1 (`n`, `t`, `i`) al formato v2. Si ya trae campos v2, los respeta.
 * @param {any} m
 */
function migrateMarker(m) {
  if (!m || typeof m !== 'object') return m;
  const [icono, categoria] = LEGACY_ICON_MAP[m.i | 0] || LEGACY_ICON_MAP[0];
  return {
    id: m.id,
    nombre: m.nombre !== undefined ? m.nombre : m.n,
    nota: m.nota !== undefined ? m.nota : m.t,
    x: m.x,
    y: m.y,
    categoria: m.categoria !== undefined ? m.categoria : categoria,
    icono: m.icono !== undefined ? m.icono : icono,
    visibilidad: m.visibilidad !== undefined ? m.visibilidad : 'todos',
    creado: m.creado !== undefined ? m.creado : 0,
    actualizado: m.actualizado !== undefined ? m.actualizado : 0,
    // Campos de versiones posteriores que ya vengan en el dato (datos sin `schemaVersion`) se respetan.
    ...(m.notaDm !== undefined ? { notaDm: m.notaDm } : {}),
  };
}

/**
 * v1 → v2: marcadores con categoría, icono por id, visibilidad y fechas; categorías y etiquetas editables.
 * - `n` → `nombre`, `t` → `nota`; el icono (índice del emoji antiguo) pasa a icono + categoría equivalentes.
 * - `creado`/`actualizado` valen 0 (se desconocen) para que la migración sea pura y repetible.
 * - Es tolerante: lo que ya esté en formato v2 (categorías, etiquetas, campos de marcador) se conserva,
 *   y lo que no encaje lo corrige después `sanitizeUserData`.
 * @param {Record<string, any>} data
 * @returns {Record<string, any>}
 */
export function migrateV1toV2(data) {
  return {
    ...data,
    schemaVersion: 2,
    categories: Array.isArray(data.categories) ? data.categories : DEFAULT_CATEGORIES.map((c) => ({ ...c })),
    markers: Array.isArray(data.markers) ? data.markers.map(migrateMarker) : [],
    labels: data.labels && typeof data.labels === 'object' ? data.labels : { edits: {}, custom: [], nid: 1 },
  };
}
