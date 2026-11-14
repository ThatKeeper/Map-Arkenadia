// @ts-check
// src/features/search/findPlace.js
import { searchPlaces } from './searchPlaces';

/**
 * Mejor resultado con posición (marcador o lugar) para un texto, o null.
 * @param {string} q
 */
export function findPlace(q) {
  return searchPlaces(q, 20).find((r) => r.x !== undefined) || null;
}
