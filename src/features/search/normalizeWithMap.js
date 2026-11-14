// @ts-check
// src/features/search/normalizeWithMap.js
import { normalizeText } from '@/utils';

/**
 * Normaliza un texto (sin tildes ni mayúsculas) recordando de qué carácter original viene cada uno,
 * para poder resaltar la coincidencia en el texto original.
 * @param {string} text
 * @returns {{ norm: string, map: number[] }}
 */
export function normalizeWithMap(text) {
  let norm = '';
  /** @type {number[]} */
  const map = [];
  let i = 0;
  for (const ch of text) {
    const n = normalizeText(ch);
    for (let k = 0; k < n.length; k++) map.push(i);
    norm += n;
    i += ch.length;
  }
  return { norm, map };
}
