// @ts-check
// src/services/migrations/migrateV2toV3.js

/**
 * v2 → v3: los marcadores ganan `notaDm` (nota privada, solo visible para el DM; vacía al migrar).
 * Las etiquetas pueden llevar `visibilidad` y `actualizado`, pero son opcionales: no hay nada que convertir.
 * @param {Record<string, any>} data
 * @returns {Record<string, any>}
 */
export function migrateV2toV3(data) {
  return {
    ...data,
    schemaVersion: 3,
    markers: Array.isArray(data.markers)
      ? data.markers.map((m) => (m && typeof m === 'object' ? { ...m, notaDm: m.notaDm !== undefined ? m.notaDm : '' } : m))
      : [],
  };
}
