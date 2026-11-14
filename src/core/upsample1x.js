// src/core/upsample1x.js
import { GRID_WIDTH, GRID_HEIGHT } from '@/config';
import { fbm, valueNoise, getNoiseTables } from './noise';

/** Campo ×1 (calidad baja): mismo ruido que ×2, sin cambiar la resolución. */
export function upsample1x(a) {
  const { T1, T2 } = getNoiseTables();
  const f = new Float32Array(GRID_WIDTH * GRID_HEIGHT);
  for (let y = 0; y < GRID_HEIGHT; y++) {
    for (let x = 0; x < GRID_WIDTH; x++) {
      const X = x * 2 + 0.5;
      const Y = y * 2 + 0.5;
      f[y * GRID_WIDTH + x] =
        a[y * GRID_WIDTH + x] +
        (fbm(T1, X * 0.06, Y * 0.06) - 0.5) * 0.1 +
        (valueNoise(T2, X * 0.35, Y * 0.35) - 0.5) * 0.05;
    }
  }
  return f;
}
