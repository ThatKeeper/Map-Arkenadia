// src/ui/render/drawTileLayers.js
import { collectUnpaintedTileRects } from './collectUnpaintedTileRects';
import { drawCurrentLevelTiles } from './drawCurrentLevelTiles';
import { drawGapFillers } from './drawGapFillers';
import { getTileGeometry, visibleTileRange } from '@/features/tiles';
import { dom, tilesState } from '@/state';

/** Dibuja capas de apoyo en los huecos y luego las teselas del nivel actual. */
export function drawTileLayers(now) {
  const k = tilesState.currentLevel,
    range = visibleTileRange(k, 0),
    { Tw } = getTileGeometry(k),
    miss = collectUnpaintedTileRects(k, range, Tw, now);
  dom.ctx.setTransform(1, 0, 0, 1, 0, 0);
  /* solo se dibujan capas de apoyo en los huecos; el resto de capas no se toca */
  if (miss.length) drawGapFillers(miss, k, now);
  drawCurrentLevelTiles(k, range, now);
  dom.ctx.globalAlpha = 1;
}
