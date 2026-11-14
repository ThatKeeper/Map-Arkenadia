// src/ui/render/drawTile.js
import { blit } from './blit';
import { TILE_FADE_MS } from '@/config';
import { getTileGeometry } from '@/features/tiles';
import { loop, tilesState } from '@/state';

/** Dibuja una tesela con su fundido de entrada. */
export function drawTile(t, now) {
  let al = 1;
  if (t.fade) {
    al = Math.min(1, (now - t.t0) / TILE_FADE_MS);
    if (al < 1) loop.fading = true;
  }
  t.last = tilesState.frameNo;
  const { Tw } = getTileGeometry(t.k);
  blit(t.cv, t.x * Tw, t.y * Tw, Tw, Tw, al);
}
