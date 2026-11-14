// @ts-check
// src/features/geometry/storeGeometryResult.js
import { buildChunkIndex } from './buildChunkIndex';
import { buildPath2D } from './buildPath2D';
import { BIOME_PAINT_ORDER } from '@/config';
import { build } from '@/state';

/**
 * Convierte el resultado del núcleo en trazados Path2D e índices por trozos y lo guarda en `build`.
 * @param {Record<string, any>} r resultado de la tarea (con `geo` y `ms`)
 * @param {number} quality calidad de geometría con la que se calculó
 */
export function storeGeometryResult(r, quality) {
  const g = { b: {} };
  for (const k of ['m', 'sh', 'lt', 'land', 'r1', 'r2']) g[k] = buildPath2D(r.geo[k]);
  for (const k of BIOME_PAINT_ORDER) g.b[k] = buildPath2D(r.geo.b[k]);
  build.geometry = g;
  build.geometryQuality = quality;
  build.geometryMs = r.ms;
  build.chunks = {};
  for (const k of ['m', 'sh', 'r1', 'r2', 'land']) build.chunks[k] = buildChunkIndex(r.geo[k]);
}
