// @ts-check
// src/utils/clamp.js

/**
 * Limita un número al rango [min, max].
 * @param {number} v
 * @param {number} min
 * @param {number} max
 */
export const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
