// @ts-check
// src/services/migrations/migrationSteps.js
import { migrateV0toV1 } from './migrateV0toV1';
import { migrateV1toV2 } from './migrateV1toV2';
import { migrateV2toV3 } from './migrateV2toV3';

/** Pasos de migración: la posición N convierte de la versión N a la N+1. */
export const MIGRATION_STEPS = [migrateV0toV1, migrateV1toV2, migrateV2toV3];
