// @ts-check
// src/features/search/findMatchRange.js
import { normalizeWithMap } from './normalizeWithMap';
import { normalizeText } from '@/utils';

/**
 * Posición [inicio, fin) de la primera coincidencia de `query` en `text`, ignorando tildes y mayúsculas.
 * @param {string} text
 * @param {string} query
 * @returns {[number, number]|null}
 */
export function findMatchRange(text, query) {
  const q = normalizeText(query).trim();
  if (!q) return null;
  const { norm, map } = normalizeWithMap(text);
  const at = norm.indexOf(q);
  if (at < 0) return null;
  const start = map[at];
  const lastChar = map[at + q.length - 1];
  const end = lastChar + (String.fromCodePoint(text.codePointAt(lastChar) || 32).length || 1);
  return [start, end];
}
