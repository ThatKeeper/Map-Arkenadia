// src/features/geometry/buildVisibleChunkPath.js

/** Construye un Path2D solo con los trozos que cruzan la región dada. */
export function buildVisibleChunkPath(h, x0, y0, x1, y1) {
  const p = new Path2D(),
    P = h.pts,
    bb = h.bb;
  for (let i = 0; i < h.cs.length; i++) {
    const b = i * 4;
    if (bb[b] > x1 || bb[b + 2] < x0 || bb[b + 1] > y1 || bb[b + 3] < y0) continue;
    const li = h.cl[i],
      n = h.lens[li],
      o = h.offs[li],
      s0 = h.cs[i],
      c = h.cn[i];
    let q = s0;
    p.moveTo(P[o + 2 * q], P[o + 2 * q + 1]);
    for (let j = 1; j <= c; j++) {
      q = (s0 + j) % n;
      p.lineTo(P[o + 2 * q], P[o + 2 * q + 1]);
    }
  }
  return p;
}
