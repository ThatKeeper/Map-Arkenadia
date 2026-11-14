// @ts-check
// src/features/search/rememberSearch.js
import { saveSearchPrefs } from '@/services/storage';
import { session } from '@/state';

/**
 * Apunta un texto como búsqueda reciente (la más nueva primero, máx. 8).
 * @param {string} text
 */
export function rememberSearch(text) {
  const t = text.trim();
  if (!t) return;
  session.searchPrefs.recientes = [t, ...session.searchPrefs.recientes.filter((r) => r !== t)].slice(0, 8);
  saveSearchPrefs();
}
