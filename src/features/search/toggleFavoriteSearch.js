// @ts-check
// src/features/search/toggleFavoriteSearch.js
import { saveSearchPrefs } from '@/services/storage';
import { session } from '@/state';

/**
 * Añade o quita un texto de las búsquedas favoritas.
 * @param {string} text
 * @returns {boolean} true si queda como favorito
 */
export function toggleFavoriteSearch(text) {
  const fav = session.searchPrefs.favoritos;
  const has = fav.includes(text);
  session.searchPrefs.favoritos = has ? fav.filter((f) => f !== text) : [text, ...fav].slice(0, 20);
  saveSearchPrefs();
  return !has;
}
