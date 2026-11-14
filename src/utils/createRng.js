// src/utils/createRng.js

/** Crea un generador pseudoaleatorio determinista (0..1) a partir de una semilla. */
export const createRng = (sd) => {
  let q = sd;
  return () => ((q = (q * 16807) % 2147483647), (q - 1) / 2147483646);
};
