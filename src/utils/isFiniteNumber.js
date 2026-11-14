// src/utils/isFiniteNumber.js

/** Indica si v es un número finito. */
export const isFiniteNumber = (v) => typeof v === 'number' && isFinite(v);
