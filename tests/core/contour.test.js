// tests/core/contour.test.js
import { describe, expect, it } from 'vitest';
import { contour } from '@/core/contour';

/** Campo w×h con un cono: 1 en el centro y 0 a 8 celdas de distancia. */
function cone(w, h, cx, cy) {
  const f = new Float32Array(w * h);
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) f[y * w + x] = Math.max(0, 1 - Math.hypot(x - cx, y - cy) / 8);
  return f;
}

describe('contour (curvas de nivel)', () => {
  it('traza un único lazo cerrado alrededor del cono', () => {
    const { pts, lens } = contour(cone(24, 24, 12, 12), 24, 24, 0.5, 1, 0);
    expect(lens).toHaveLength(1);
    expect(pts.length).toBe(lens[0] * 2);
    expect(lens[0]).toBeGreaterThan(8);
  });

  it('el lazo queda a ~4 celdas del centro (nivel 0,5 de un cono de radio 8)', () => {
    const { pts, lens } = contour(cone(24, 24, 12, 12), 24, 24, 0.5, 1, 0);
    for (let i = 0; i < lens[0]; i++) {
      const d = Math.hypot(pts[i * 2] - 12.5, pts[i * 2 + 1] - 12.5);
      expect(d).toBeGreaterThan(3.6);
      expect(d).toBeLessThan(4.4);
    }
  });

  it('el factor de escala multiplica las coordenadas', () => {
    const a = contour(cone(24, 24, 12, 12), 24, 24, 0.5, 1, 0);
    const b = contour(cone(24, 24, 12, 12), 24, 24, 0.5, 4, 0);
    expect(b.lens[0]).toBe(a.lens[0]);
    expect(b.pts[0]).toBeCloseTo(a.pts[0] * 4, 4); // las coordenadas salen como (x + 0.5) * escala
  });

  it('un campo sin cruces del nivel no produce lazos', () => {
    const f = new Float32Array(100).fill(0.1);
    const { pts, lens } = contour(f, 10, 10, 0.5, 1, 0);
    expect(lens).toHaveLength(0);
    expect(pts).toHaveLength(0);
  });

  it('el suavizado de Chaikin duplica los puntos del lazo', () => {
    const sin = contour(cone(24, 24, 12, 12), 24, 24, 0.5, 1, 0);
    const con = contour(cone(24, 24, 12, 12), 24, 24, 0.5, 1, 1);
    expect(con.lens[0]).toBe(sin.lens[0] * 2);
  });

  it('es determinista', () => {
    const a = contour(cone(24, 24, 12, 12), 24, 24, 0.5, 2, 1);
    const b = contour(cone(24, 24, 12, 12), 24, 24, 0.5, 2, 1);
    expect(Array.from(a.pts)).toEqual(Array.from(b.pts));
    expect(Array.from(a.lens)).toEqual(Array.from(b.lens));
  });
});
