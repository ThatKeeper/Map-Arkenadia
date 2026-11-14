// tests/utils/helpers.test.js
import { describe, expect, it } from 'vitest';
import { createRng, isFiniteNumber, truncate } from '@/utils';

describe('utilidades puras', () => {
  it('truncate convierte a texto y recorta', () => {
    expect(truncate('abcdef', 3)).toBe('abc');
    expect(truncate(null, 5)).toBe('');
    expect(truncate(undefined, 5)).toBe('');
    expect(truncate(12345, 2)).toBe('12');
  });

  it('isFiniteNumber solo acepta números finitos', () => {
    expect(isFiniteNumber(0)).toBe(true);
    expect(isFiniteNumber(-3.5)).toBe(true);
    expect(isFiniteNumber(NaN)).toBe(false);
    expect(isFiniteNumber(Infinity)).toBe(false);
    expect(isFiniteNumber('3')).toBe(false);
    expect(isFiniteNumber(null)).toBe(false);
  });

  it('createRng es determinista y devuelve valores en [0, 1]', () => {
    const a = createRng(42),
      b = createRng(42);
    for (let i = 0; i < 50; i++) {
      const v = a();
      expect(v).toBe(b());
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThanOrEqual(1);
    }
  });

  it('semillas distintas dan secuencias distintas', () => {
    expect(createRng(1)()).not.toBe(createRng(2)());
  });
});
