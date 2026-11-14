// @ts-check
// src/services/migrations/migrateV1toV2.js

/**
 * v1 → v2 (PREPARADA PARA LA FASE 1, aún no se aplica: `SCHEMA_VERSION` sigue en 1).
 * La Fase 1 convertirá aquí los marcadores al formato nuevo
 * (`id, nombre, nota, categoría, icono, visibilidad, creado, actualizado`).
 * @param {Record<string, any>} data
 * @returns {Record<string, any>}
 */
export function migrateV1toV2(data) {
  return { ...data, schemaVersion: 2 };
}
