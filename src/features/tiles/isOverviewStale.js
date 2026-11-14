// @ts-check
// src/features/tiles/isOverviewStale.js
import { tilesState } from '@/state';

/** Indica si la vista general falta o quedó obsoleta (hay que volver a pintarla). */
export function isOverviewStale() {
  return (
    tilesState.overviewStale ||
    !!(tilesState.overview && tilesState.overview.gen !== tilesState.generation)
  );
}
