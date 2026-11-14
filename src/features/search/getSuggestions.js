// @ts-check
// src/features/search/getSuggestions.js
import { searchPlaces } from './searchPlaces';
import { session } from '@/state';

/**
 * Sugerencias para el buscador: con texto, los resultados; sin texto, favoritos y recientes.
 * @param {string} query
 * @returns {import('./searchPlaces').SearchResult[]}
 */
export function getSuggestions(query) {
  if (query.trim()) return searchPlaces(query);
  const { favoritos, recientes } = session.searchPrefs;
  return [
    ...favoritos.map((t) => ({ tipo: /** @type {const} */ ('historial'), texto: t, detalle: 'Favorito', favorito: true })),
    ...recientes
      .filter((t) => !favoritos.includes(t))
      .map((t) => ({ tipo: /** @type {const} */ ('historial'), texto: t, detalle: 'Reciente', favorito: false })),
  ].slice(0, 8);
}
