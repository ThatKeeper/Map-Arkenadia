// @ts-check
// src/services/migrations/migrateUserData.js
import { MIGRATION_STEPS } from './migrationSteps';
import { SCHEMA_VERSION } from '@/config';

/**
 * Lleva unos datos guardados o importados hasta la versión de esquema indicada.
 * - Sin `schemaVersion` (o inválida) se tratan como v0.
 * - Si ya son de una versión igual o mayor, se devuelven tal cual (nunca se "baja" de versión).
 * - Lo que no sea un objeto se devuelve sin cambios; `sanitizeUserData` se encarga de ello.
 * @param {any} data
 * @param {number} [target] versión de destino (por defecto la actual)
 * @returns {any}
 */
export function migrateUserData(data, target = SCHEMA_VERSION) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) return data;
  let current = data;
  let version = Number.isInteger(current.schemaVersion) && current.schemaVersion > 0 ? current.schemaVersion : 0;
  while (version < target) {
    const step = MIGRATION_STEPS[version];
    if (!step) break;
    const next = step(current);
    // Seguridad: un paso que no avanza la versión rompería el bucle.
    if (!next || !(next.schemaVersion > version)) break;
    current = next;
    version = next.schemaVersion;
  }
  return current;
}
