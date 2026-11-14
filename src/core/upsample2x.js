// src/core/upsample2x.js
import { GRID_WIDTH, GRID_HEIGHT } from '@/config';
import { fbm, valueNoise, getNoiseTables } from './noise';

/** Campo ×2 (calidad alta): interpolación bilineal más ruido fino. */
export function upsample2x(a) {
  const { T1, T2 } = getNoiseTables();
  const w = GRID_WIDTH * 2;
  const h = GRID_HEIGHT * 2;
  const f = new Float32Array(w * h);
  for (let y = 0; y < h; y++) {
    const fy = Math.max(0, Math.min(GRID_HEIGHT - 1.001, (y + 0.5) / 2 - 0.5));
    const y0 = fy | 0;
    const ty = fy - y0;
    for (let x = 0; x < w; x++) {
      const fx = Math.max(0, Math.min(GRID_WIDTH - 1.001, (x + 0.5) / 2 - 0.5));
      const x0 = fx | 0;
      const tx = fx - x0;
      const i = y0 * GRID_WIDTH + x0;
      f[y * w + x] =
        (a[i] * (1 - tx) + a[i + 1] * tx) * (1 - ty) +
        (a[i + GRID_WIDTH] * (1 - tx) + a[i + GRID_WIDTH + 1] * tx) * ty +
        (fbm(T1, x * 0.06, y * 0.06) - 0.5) * 0.1 +
        (valueNoise(T2, x * 0.35, y * 0.35) - 0.5) * 0.05;
    }
  }
  return f;
}
