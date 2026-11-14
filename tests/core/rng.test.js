// tests/core/rng.test.js
import { describe, expect, it } from 'vitest';
import { nextRandom, setSeed } from '@/core/rng';
import { createRng } from '@/utils';

describe('generador del núcleo', () => {
  it('con la misma semilla produce la misma secuencia', () => {
    setSeed(123);
    const a = Array.from({ length: 20 }, nextRandom);
    setSeed(123);
    const b = Array.from({ length: 20 }, nextRandom);
    expect(a).toEqual(b);
  });

  it('coincide con createRng (misma fórmula)', () => {
    setSeed(5);
    const rnd = createRng(5);
    for (let i = 0; i < 30; i++) expect(nextRandom()).toBe(rnd());
  });

  it('devuelve valores en [0, 1]', () => {
    setSeed(99);
    for (let i = 0; i < 200; i++) {
      const v = nextRandom();
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThanOrEqual(1);
    }
  });
});
