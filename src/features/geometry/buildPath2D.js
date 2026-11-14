// src/features/geometry/buildPath2D.js

/** Convierte lazos de contorno en un Path2D cerrado. */
export const buildPath2D = (g) => {
  const p = new Path2D(),
    P = g.pts;
  let o = 0;
  for (const n of g.lens) {
    p.moveTo(P[o], P[o + 1]);
    for (let i = 1; i < n; i++) p.lineTo(P[o + 2 * i], P[o + 2 * i + 1]);
    p.closePath();
    o += 2 * n;
  }
  return p;
};
