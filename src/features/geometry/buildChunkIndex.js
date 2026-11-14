// src/features/geometry/buildChunkIndex.js

/** Divide los lazos en trozos con caja delimitadora para pintar solo lo visible. */
export function buildChunkIndex(g) {
  const CH = 48,
    P = g.pts,
    cs = [],
    cl = [],
    cn = [],
    bb = [],
    offs = new Int32Array(g.lens.length);
  let o = 0;
  g.lens.forEach((n, li) => {
    offs[li] = o;
    for (let i = 0; i < n; i += CH) {
      const c = Math.min(CH, n - i);
      let x0 = 1e9,
        y0 = 1e9,
        x1 = -1e9,
        y1 = -1e9;
      for (let j = 0; j <= c; j++) {
        const q = (i + j) % n,
          x = P[o + 2 * q],
          y = P[o + 2 * q + 1];
        if (x < x0) x0 = x;
        if (x > x1) x1 = x;
        if (y < y0) y0 = y;
        if (y > y1) y1 = y;
      }
      cs.push(i);
      cl.push(li);
      cn.push(c);
      bb.push(x0, y0, x1, y1);
    }
    o += 2 * n;
  });
  return {
    pts: P,
    lens: g.lens,
    offs,
    cs: Int32Array.from(cs),
    cl: Int32Array.from(cl),
    cn: Int32Array.from(cn),
    bb: Float32Array.from(bb),
  };
}
