// tests/core/chaikinSmooth.test.js
import { describe, expect, it } from 'vitest';
import { chaikinSmooth } from '@/core/chaikinSmooth';

const square = [0, 0, 4, 0, 4, 4, 0, 4];

describe('chaikinSmooth', () => {
  it('sin iteraciones devuelve el mismo lazo', () => {
    const { pts, n } = chaikinSmooth(square, 0);
    expect(n).toBe(4);
    expect(pts).toEqual(square);
  });

  it('cada iteración duplica el número de puntos', () => {
    expect(chaikinSmooth(square, 1).n).toBe(8);
    expect(chaikinSmooth(square, 2).n).toBe(16);
    expect(chaikinSmooth(square, 2).pts).toHaveLength(32);
  });

  it('corta cada arista al 25 % y al 75 %', () => {
    const { pts } = chaikinSmooth(square, 1);
    expect(pts.slice(0, 4)).toEqual([1, 0, 3, 0]);
  });

  it('cierra el lazo (la última arista va del último punto al primero)', () => {
    const { pts } = chaikinSmooth(square, 1);
    // última arista: (0,4) → (0,0); sus cortes al 25 % y 75 % son (0,3) y (0,1)
    expect(pts.slice(12, 16)).toEqual([0, 3, 0, 1]);
  });

  it('los puntos nuevos quedan dentro de la caja del polígono original', () => {
    const { pts, n } = chaikinSmooth(square, 3);
    for (let i = 0; i < n; i++) {
      expect(pts[i * 2]).toBeGreaterThanOrEqual(0);
      expect(pts[i * 2]).toBeLessThanOrEqual(4);
      expect(pts[i * 2 + 1]).toBeGreaterThanOrEqual(0);
      expect(pts[i * 2 + 1]).toBeLessThanOrEqual(4);
    }
  });
});
