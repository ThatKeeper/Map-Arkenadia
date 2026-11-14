// src/core/marchSquares.js

/**
 * Marching squares: enlaza los cruces de arista del campo `f` con el nivel L.
 * Rellena B.PX/PY (puntos) y B.A1/A2 (vecinos). Devuelve la lista de aristas usadas.
 */
export function marchSquares(f, w, h, L, B, W2) {
  const { PX, PY, A1, A2 } = B;
  const used = [];
  const g = (x, y) => (x < 0 || y < 0 || x >= w || y >= h ? 0 : f[y * w + x]);
  const eH = (x, y) => ((y + 1) * W2 + x + 1) * 2;
  const eV = (x, y) => eH(x, y) + 1;
  const link = (a, b) => {
    if (A1[a] < 0) {
      A1[a] = b;
      used.push(a);
    } else A2[a] = b;
    if (A1[b] < 0) {
      A1[b] = a;
      used.push(b);
    } else A2[b] = a;
  };
  for (let y = -1; y < h; y++) {
    for (let x = -1; x < w; x++) {
      const a = g(x, y);
      const b = g(x + 1, y);
      const c = g(x + 1, y + 1);
      const d = g(x, y + 1);
      const i = (a >= L) * 8 + (b >= L) * 4 + (c >= L) * 2 + (d >= L);
      if (i === 0 || i === 15) continue;
      const T = eH(x, y);
      const R = eV(x + 1, y);
      const Bt = eH(x, y + 1);
      const Lf = eV(x, y);
      if (a >= L !== b >= L) {
        PX[T] = x + (L - a) / (b - a);
        PY[T] = y;
      }
      if (b >= L !== c >= L) {
        PX[R] = x + 1;
        PY[R] = y + (L - b) / (c - b);
      }
      if (d >= L !== c >= L) {
        PX[Bt] = x + (L - d) / (c - d);
        PY[Bt] = y + 1;
      }
      if (a >= L !== d >= L) {
        PX[Lf] = x;
        PY[Lf] = y + (L - a) / (d - a);
      }
      switch (i) {
        case 1:
        case 14:
          link(Lf, Bt);
          break;
        case 2:
        case 13:
          link(Bt, R);
          break;
        case 3:
        case 12:
          link(Lf, R);
          break;
        case 4:
        case 11:
          link(T, R);
          break;
        case 6:
        case 9:
          link(T, Bt);
          break;
        case 7:
        case 8:
          link(T, Lf);
          break;
        default: {
          const m = (a + b + c + d) / 4 >= L;
          if ((i === 5) === m) {
            link(T, Lf);
            link(R, Bt);
          } else {
            link(T, R);
            link(Lf, Bt);
          }
        }
      }
    }
  }
  return used;
}
