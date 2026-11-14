// src/core/computeGeometry.js
import { GRID_WIDTH, GRID_HEIGHT, BIOME_PAINT_ORDER } from '@/config';
import { coreState } from './coreState';
import { blur } from './blur';
import { contour } from './contour';
import { upsample1x } from './upsample1x';
import { upsample2x } from './upsample2x';

const noTick = () => Promise.resolve();
const DEPTH_VALUES = [0.06, 0.22, 0.38, 0.46];
const SEA_LEVELS = [
  ['m', 0.14],
  ['sh', 0.3],
  ['lt', 0.42],
  ['land', 0.7],
  ['r1', 0.6],
  ['r2', 0.52],
];

/**
 * Calcula los contornos del mapa (mar, costas y biomas) a partir de las clases de terreno.
 * @param {number} q Calidad de geometría (>=2 = alta resolución)
 * @param {Function} [tick] Función asíncrona que cede el hilo entre pasos
 */
export async function computeGeometry(q, tick) {
  tick = tick || noTick;
  const { CLS } = coreState;
  const raw = new Float32Array(GRID_WIDTH * GRID_HEIGHT);
  for (let i = 0; i < raw.length; i++) raw[i] = CLS[i] < 4 ? DEPTH_VALUES[CLS[i]] : 1;
  coreState.FA = blur(raw, GRID_WIDTH, GRID_HEIGHT, 2, 3);
  await tick();
  const hi = q >= 2;
  const F = hi ? upsample2x(coreState.FA) : upsample1x(coreState.FA);
  const w = hi ? GRID_WIDTH * 2 : GRID_WIDTH;
  const h = hi ? GRID_HEIGHT * 2 : GRID_HEIGHT;
  const sc = hi ? 2 : 4;
  const geo = { b: {} };
  await tick();
  for (const [name, level] of SEA_LEVELS) {
    geo[name] = contour(F, w, h, level, sc, 1);
    await tick();
  }
  for (const k of BIOME_PAINT_ORDER) {
    const ind = new Float32Array(GRID_WIDTH * GRID_HEIGHT);
    for (let i = 0; i < ind.length; i++) ind[i] = CLS[i] === k ? 1 : 0;
    blur(ind, GRID_WIDTH, GRID_HEIGHT, 1, k === 9 ? 1 : 2);
    geo.b[k] = contour(ind, GRID_WIDTH, GRID_HEIGHT, 0.4, 4, 2);
    await tick();
  }
  coreState.bufs = {};
  return geo;
}
