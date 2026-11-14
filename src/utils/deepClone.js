// @ts-check
// src/utils/deepClone.js

/**
 * Copia profunda de datos simples (JSON). Sirve para guardar el estado anterior en deshacer/rehacer.
 * @template T
 * @param {T} v
 * @returns {T}
 */
export const deepClone = (v) => (v === undefined ? v : JSON.parse(JSON.stringify(v)));
