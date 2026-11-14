// tests/core/noise.test.js
import { describe, expect, it } from 'vitest';
import { fbm, getNoiseTables, valueNoise } from '@/core/noise';

describe('ruido', () => {
  it('las tablas se generan una sola vez y tienen 4096 valores en [0, 1]', () => {
    const t = getNoiseTables();
    expect(getNoiseTables()).toBe(t);
    expect(t.T1).toHaveLength(4096);
    expect(t.T2).toHaveLength(4096);
    for (const v of t.T1) {
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThanOrEqual(1);
    }
  });

  it('valueNoise en coordenadas enteras devuelve el valor de la tabla', () => {
    const { T1 } = getNoiseTables();
    expect(valueNoise(T1, 3, 5)).toBeCloseTo(T1[5 * 64 + 3], 10);
    expect(valueNoise(T1, 0, 0)).toBeCloseTo(T1[0], 10);
  });

  it('es periódico cada 64 celdas', () => {
    const { T1 } = getNoiseTables();
    expect(valueNoise(T1, 70.3, 12.6)).toBeCloseTo(valueNoise(T1, 6.3, 12.6), 10);
  });

  it('fbm es determinista y queda en [0, 1]', () => {
    const { T1 } = getNoiseTables();
    for (let i = 0; i < 100; i++) {
      const x = i * 0.37,
        y = i * 0.91;
      const v = fbm(T1, x, y);
      expect(v).toBe(fbm(T1, x, y));
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThanOrEqual(1);
    }
  });
});
