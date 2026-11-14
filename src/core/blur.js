// src/core/blur.js

/** Desenfoque de caja separable sobre un campo w×h (radio r, p pasadas). Modifica y devuelve `a`. */
export function blur(a, w, h, r, p) {
  const b = new Float32Array(a.length);
  const n = 2 * r + 1;
  const clampIndex = (v, m) => Math.min(m - 1, Math.max(0, v));
  for (let k = 0; k < p; k++) {
    for (let y = 0; y < h; y++) {
      let s = 0;
      const o = y * w;
      for (let x = -r; x <= r; x++) s += a[o + clampIndex(x, w)];
      for (let x = 0; x < w; x++) {
        b[o + x] = s / n;
        s += a[o + clampIndex(x + r + 1, w)] - a[o + clampIndex(x - r, w)];
      }
    }
    for (let x = 0; x < w; x++) {
      let s = 0;
      for (let y = -r; y <= r; y++) s += b[clampIndex(y, h) * w + x];
      for (let y = 0; y < h; y++) {
        a[y * w + x] = s / n;
        s += b[clampIndex(y + r + 1, h) * w + x] - b[clampIndex(y - r, h) * w + x];
      }
    }
  }
  return a;
}
