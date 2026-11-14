// @ts-check
// src/features/search/isFavoriteSearch.js
import { session } from '@/state';

/**
 * Indica si un texto está en las búsquedas favoritas.
 * @param {string} text
 */
export const isFavoriteSearch = (text) => session.searchPrefs.favoritos.includes(text);
