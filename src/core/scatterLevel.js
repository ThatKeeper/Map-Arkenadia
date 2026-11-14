// src/core/scatterLevel.js
import { WORLD_WIDTH, WORLD_HEIGHT, GRID_WIDTH, GRID_HEIGHT } from '@/config';
import { coreState } from './coreState';
import { nextRandom, setSeed } from './rng';
import { footprintOf } from './footprintOf';
import { placeLandDetail } from './placeLandDetail';

const LEVELS = [
  { st: 16, sz: 1 },
  { st: 8, sz: 0.6 },
  { st: 4.4, sz: 0.36 },
  { st: 2.6, sz: 0.2 },
];

const gridIndex = (x, y) =>
  Math.min(GRID_HEIGHT - 1, (y / 4) | 0) * GRID_WIDTH + Math.min(GRID_WIDTH - 1, (x / 4) | 0);

/**
 * Reparte los detalles del nivel de zoom `l` (montañas, árboles, dunas, olas…).
 * Cada elemento reserva una huella; si choca con otra ya colocada se descarta.
 * @returns {Float32Array} secuencia (tipo, x, y, tamaño…)
 */
export function scatterLevel(l, dens, index) {
  const { st, sz } = LEVELS[l];
  const out = [];
  setSeed(100 + l);
  const place = (t, x, y, z) => {
    if (t !== 3) {
      const f = footprintOf(t, x, y, z);
      if (!index.free(f, t)) return;
      index.add(f, t);
    }
    out.push(t, x, y, z);
  };
  for (let y = 8; y < WORLD_HEIGHT - 8; y += st) {
    for (let x = 8; x < WORLD_WIDTH - 8; x += st) {
      const px = x + nextRandom() * st;
      const py = y + nextRandom() * st;
      const k = coreState.CLS[gridIndex(px, py)];
      const v = coreState.FA[gridIndex(px, py)];
      const r = nextRandom();
      if (v > 0.8) placeLandDetail(k, r, l, dens, sz, px, py, place);
      else if (v < 0.2 && k === 0 && r < 0.024 / Math.pow(4, l) * dens)
        place(7, px, py, Math.max(0.4, sz));
    }
  }
  return Float32Array.from(out);
}
