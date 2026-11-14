// @ts-check
// src/ui/loop/getFrameDelta.js
import { loop } from '@/state';

/**
 * Segundos desde el fotograma anterior (máx. 0,05; 0,016 tras una pausa larga).
 * También actualiza la marca de tiempo del último fotograma.
 * @param {number} now marca de tiempo actual (ms)
 */
export function getFrameDelta(now) {
  let dt = Math.min(0.05, (now - loop.lastTickTime) / 1000);
  if (now - loop.lastTickTime > 120) dt = 0.016;
  loop.lastTickTime = now;
  return dt;
}
