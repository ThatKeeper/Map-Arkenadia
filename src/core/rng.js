// src/core/rng.js
import { coreState } from './coreState';

/** Siguiente número pseudoaleatorio (0..1) del generador con semilla del núcleo. */
export function nextRandom() {
  coreState.seed = (coreState.seed * 16807) % 2147483647;
  return (coreState.seed - 1) / 2147483646;
}

/** Reinicia el generador del núcleo con una semilla concreta. */
export function setSeed(value) {
  coreState.seed = value;
}
