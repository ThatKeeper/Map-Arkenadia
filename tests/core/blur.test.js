// tests/core/blur.test.js
import { describe, expect, it } from 'vitest';
import { blur } from '@/core/blur';

describe('blur (caja separable)', () => {
  it('un campo constante no cambia', () => {
    const a = new Float32Array(6 * 5).fill(0.7);
    blur(a, 6, 5, 2, 3);
    for (const v of a) expect(v).toBeCloseTo(0.7, 5);
  });

  it('reparte un impulso central en una caja 3×3 (radio 1, una pasada)', () => {
    const w = 5,
      h = 5,
      a = new Float32Array(w * h);
    a[2 * w + 2] = 1;
    blur(a, w, h, 1, 1);
    for (let y = 1; y <= 3; y++)
      for (let x = 1; x <= 3; x++) expect(a[y * w + x]).toBeCloseTo(1 / 9, 5);
    expect(a[0]).toBeCloseTo(0, 6);
    expect(a[4 * w + 4]).toBeCloseTo(0, 6);
  });

  it('modifica y devuelve el mismo arreglo', () => {
    const a = new Float32Array(9);
    expect(blur(a, 3, 3, 1, 1)).toBe(a);
  });

  it('no inventa valores: el resultado queda entre el mínimo y el máximo original', () => {
    const a = Float32Array.from({ length: 64 }, (_, i) => (i % 7) / 7);
    blur(a, 8, 8, 1, 2);
    for (const v of a) {
      expect(v).toBeGreaterThanOrEqual(-1e-6);
      expect(v).toBeLessThanOrEqual(6 / 7 + 1e-6);
    }
  });
});
