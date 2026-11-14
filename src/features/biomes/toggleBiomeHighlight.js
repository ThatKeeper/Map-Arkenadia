// src/features/biomes/toggleBiomeHighlight.js
import { buildPreloadQueue } from '@/features/tiles';
import { session, tilesState } from '@/state';
import { renderBiomeList } from '@/ui/lists';
import { requestRedraw } from '@/ui/loop';

/** Resalta (o quita el resalte de) un bioma en el mapa. */
export function toggleBiomeHighlight(k) {
  session.highlightedBiome = session.highlightedBiome === k ? null : k;
  tilesState.generation++;
  tilesState.overviewStale = true;
  buildPreloadQueue();
  renderBiomeList();
  requestRedraw();
}
