// @ts-check
// src/features/geometry/needsGeometry.js
import { build, session } from '@/state';

/** Indica si falta la geometría o se calculó con otra calidad distinta de la actual. */
export function needsGeometry() {
  return !build.geometry || build.geometryQuality !== session.quality.geo;
}
