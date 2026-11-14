// src/core/chaikinSmooth.js

/** Suaviza un lazo cerrado con `it` iteraciones de Chaikin. Devuelve { pts, n } (n = nº de puntos). */
export function chaikinSmooth(points, it) {
  let pts = points;
  let n = pts.length >> 1;
  for (let k = 0; k < it; k++) {
    const q = new Array(n * 4);
    for (let i = 0; i < n; i++) {
      const j = ((i + 1) % n) * 2;
      const i2 = i * 2;
      const ax = pts[i2];
      const ay = pts[i2 + 1];
      const bx = pts[j];
      const by = pts[j + 1];
      q[i * 4] = 0.75 * ax + 0.25 * bx;
      q[i * 4 + 1] = 0.75 * ay + 0.25 * by;
      q[i * 4 + 2] = 0.25 * ax + 0.75 * bx;
      q[i * 4 + 3] = 0.25 * ay + 0.75 * by;
    }
    pts = q;
    n *= 2;
  }
  return { pts, n };
}
