// src/core/contour.js
import { getContourBuffers } from './getContourBuffers';
import { marchSquares } from './marchSquares';
import { traceLoop } from './traceLoop';
import { chaikinSmooth } from './chaikinSmooth';

/**
 * Curvas de nivel L del campo f (w×h) como lazos suavizados, escaladas por `sc`.
 * @returns {{pts: Float32Array, lens: Int32Array}} puntos (x,y…) y nº de puntos por lazo
 */
export function contour(f, w, h, L, sc, it) {
  const W2 = w + 3;
  const N = (h + 3) * W2 * 2;
  const B = getContourBuffers(N);
  B.A1.fill(-1);
  B.A2.fill(-1);
  B.vis.fill(0);
  const used = marchSquares(f, w, h, L, B, W2);
  const out = [];
  const lens = [];
  for (const start of used) {
    if (B.vis[start]) continue;
    const raw = traceLoop(start, B);
    if (raw.length >> 1 < 4) continue;
    const { pts, n } = chaikinSmooth(raw, it);
    for (let i = 0; i < n; i++) out.push((pts[i * 2] + 0.5) * sc, (pts[i * 2 + 1] + 0.5) * sc);
    lens.push(n);
  }
  return { pts: Float32Array.from(out), lens: Int32Array.from(lens) };
}
