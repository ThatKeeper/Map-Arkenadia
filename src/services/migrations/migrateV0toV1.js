// @ts-check
// src/services/migrations/migrateV0toV1.js

/**
 * v0 → v1: los datos anteriores no tenían `schemaVersion`; solo se les asigna la 1.
 * No toca marcadores ni ruta (el formato es el mismo).
 * @param {Record<string, any>} data
 * @returns {Record<string, any>}
 */
export function migrateV0toV1(data) {
  return { ...data, schemaVersion: 1 };
}
