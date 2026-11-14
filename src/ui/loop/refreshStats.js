// @ts-check
// src/ui/loop/refreshStats.js
import { loop, session } from '@/state';
import { updateStatsPanel } from '@/ui/panels';

/**
 * Actualiza el panel de rendimiento (como mucho cada 500 ms) si está activado.
 * @param {number} now marca de tiempo del fotograma (ms)
 */
export function refreshStats(now) {
  if (!session.settings.stats || now - loop.lastStatsTime <= 500) return;
  loop.lastStatsTime = now;
  if (loop.fpsTime > 0) {
    loop.fpsValue = Math.round((1000 * loop.fpsFrames) / loop.fpsTime);
    loop.fpsFrames = 0;
    loop.fpsTime = 0;
  }
  updateStatsPanel();
}
