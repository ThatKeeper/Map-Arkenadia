// src/features/tiles/hasTile.js
import { tileKey } from './tileKey';
import { tileCache, tilesState } from '@/state';

/** Indica si hay una tesela vigente para (k,x,y). */
export const hasTile = (k, x, y) => {
  const t = tileCache.get(tileKey(k, x, y));
  return !!t && t.gen === tilesState.generation;
};
