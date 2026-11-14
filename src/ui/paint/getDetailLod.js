// @ts-check
// src/ui/paint/getDetailLod.js
import { LOD_SCALE_THRESHOLDS } from '@/config';
import { session } from '@/state';

/**
 * Nivel de detalle (0..3) a dibujar para una escala efectiva, limitado por la calidad.
 * @param {number} se escala efectiva de dibujo
 */
export function getDetailLod(se) {
  const wanted =
    se >= LOD_SCALE_THRESHOLDS[3]
      ? 3
      : se >= LOD_SCALE_THRESHOLDS[2]
        ? 2
        : se >= LOD_SCALE_THRESHOLDS[1]
          ? 1
          : 0;
  return Math.min(session.quality.lod, wanted);
}
