// src/core/noise.js
import { createRng } from '@/utils';

const TABLE_SIZE = 4096;
let tables = null;

/** Devuelve las dos tablas de ruido (se generan una sola vez, con semilla fija 11). */
export function getNoiseTables() {
  if (!tables) {
    const rnd = createRng(11);
    const makeTable = () => Array.from({ length: TABLE_SIZE }, rnd);
    tables = { T1: makeTable(), T2: makeTable() };
  }
  return tables;
}

const smoothstep = (t) => t * t * (3 - 2 * t);

/** Ruido de valor 2D interpolado sobre la tabla T. */
export function valueNoise(T, x, y) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const u = smoothstep(x - xi);
  const v = smoothstep(y - yi);
  const g = (a, b) => T[(b & 63) * 64 + (a & 63)];
  return (
    (g(xi, yi) * (1 - u) + g(xi + 1, yi) * u) * (1 - v) +
    (g(xi, yi + 1) * (1 - u) + g(xi + 1, yi + 1) * u) * v
  );
}

/** Ruido fractal (3 octavas) normalizado a 0..1. */
export function fbm(T, x, y) {
  return (
    (0.5 * valueNoise(T, x, y) +
      0.25 * valueNoise(T, x * 2, y * 2) +
      0.125 * valueNoise(T, x * 4, y * 4)) /
    0.875
  );
}
