// src/features/tiles/visibleTileRange.js
import { getTileGeometry } from './getTileGeometry';
import { WORLD_HEIGHT, WORLD_WIDTH } from '@/config';
import { viewport } from '@/state';

/** Rango de teselas visibles de un nivel (con anillo opcional). */
export function visibleTileRange(k, ring) {
  const { Tw } = getTileGeometry(k),
    m = ring ? Tw * ring : 0,
    x0 = -viewport.panX / viewport.scale - m,
    y0 = -viewport.panY / viewport.scale - m,
    x1 = (viewport.width - viewport.panX) / viewport.scale + m,
    y1 = (viewport.height - viewport.panY) / viewport.scale + m;
  return [
    Math.max(Math.floor(x0 / Tw), Math.floor(-40 / Tw)),
    Math.min(Math.floor(x1 / Tw), Math.floor((WORLD_WIDTH + 40) / Tw)),
    Math.max(Math.floor(y0 / Tw), Math.floor(-40 / Tw)),
    Math.min(Math.floor(y1 / Tw), Math.floor((WORLD_HEIGHT + 40) / Tw)),
  ];
}
