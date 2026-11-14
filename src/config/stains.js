// src/config/stains.js
import { WORLD_HEIGHT, WORLD_WIDTH } from './constants';
import { createRng } from '@/utils';

/** Manchas decorativas del papel [x, y, radio, oscura]. */
export const STAINS = (() => {
  const rn = createRng(21);
  return Array.from({ length: 18 }, () => [
    rn() * WORLD_WIDTH,
    rn() * WORLD_HEIGHT,
    150 + rn() * 380,
    rn() < 0.5,
  ]);
})();
