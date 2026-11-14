// src/features/quality/applyQuality.js
import { clampViewToQuality } from './clampViewToQuality';
import { computeQuality } from './computeQuality';
import { requestGeometryBuild } from '@/features/geometry';
import { resizeCanvas } from '@/features/navigation';
import { buildPreloadQueue, flushAllTiles, renderVisibleSync } from '@/features/tiles';
import { loop, session, tilesState } from '@/state';
import { requestRedraw } from '@/ui/loop';
import { syncQualityPanel } from '@/ui/panels';

/** Aplica la calidad: reconstruye teselas, geometría y panel si hace falta. */
export function applyQuality() {
  const prev = session.quality;
  computeQuality();
  tilesState.maxTiles = session.quality.maxTiles;
  const structural =
    !prev || prev.tile !== session.quality.tile || prev.dpr !== session.quality.dpr;
  if (structural) {
    flushAllTiles();
    resizeCanvas();
  } else {
    tilesState.generation++;
    tilesState.overviewStale = true;
  }
  clampViewToQuality();
  syncQualityPanel();
  requestGeometryBuild();
  if (loop.ready && structural) renderVisibleSync();
  if (loop.ready) buildPreloadQueue();
  requestRedraw();
}
