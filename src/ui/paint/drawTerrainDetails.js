// src/ui/paint/drawTerrainDetails.js
import { buildDetailPaths } from './buildDetailPaths';
import { getDetailLod } from './getDetailLod';
import { strokeDetailPaths } from './strokeDetailPaths';
import { LOD_SCALE_THRESHOLDS, LOD_STROKE_SCALE } from '@/config';
import { build } from '@/state';

/** Dibuja montañas, árboles, dunas y olas de los niveles de detalle visibles. */
export function drawTerrainDetails(g, P, sd, LW, x0, y0, x1, y1) {
  const se = sd * 1.12,
    lod = getDetailLod(se);
  g.lineJoin = 'round';
  for (let l = 0; l <= lod; l++) {
    const items = build.items[l];
    if (!items || !items.length) continue;
    const alpha = l
      ? Math.min(1, (se - LOD_SCALE_THRESHOLDS[l]) / (LOD_SCALE_THRESHOLDS[l] * 0.3))
      : 1;
    if (alpha <= 0) continue;
    const paths = buildDetailPaths(items, l, se, x0, y0, x1, y1);
    strokeDetailPaths(g, P, paths, LW, LOD_STROKE_SCALE[l], alpha);
  }
}
