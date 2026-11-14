// @ts-check
// src/ui/loop/measureFrameRate.js
import { downgradeQuality } from '@/features/quality';
import { loop, session } from '@/state';

/**
 * Mide los fotogramas durante la interacción y, en modo Auto, baja la calidad si hay tirones sostenidos.
 * @param {number} now marca de tiempo del fotograma (ms)
 * @param {boolean} interacting hay gesto o animación en curso
 */
export function measureFrameRate(now, interacting) {
  if (!interacting) {
    loop.lastFrameTime = 0;
    loop.slowFrames = Math.max(0, loop.slowFrames - 2);
    return;
  }
  const fd = now - loop.lastFrameTime;
  if (loop.lastFrameTime && fd < 250) {
    loop.fpsFrames++;
    loop.fpsTime += fd;
    loop.slowFrames = fd > 34 ? loop.slowFrames + 1 : Math.max(0, loop.slowFrames - 1);
    if (loop.slowFrames > 45 && session.settings.q === 'auto' && session.tier !== 'baja') {
      loop.slowFrames = 0;
      downgradeQuality();
    }
  }
  loop.lastFrameTime = now;
}
