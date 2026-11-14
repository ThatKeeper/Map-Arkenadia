// @ts-check
// src/services/storage/saveSearchPrefs.js
import { session } from '@/state';

/** Guarda las búsquedas recientes y favoritas. */
export function saveSearchPrefs() {
  try {
    localStorage.setItem('mapaBusq', JSON.stringify(session.searchPrefs));
  } catch (e) {}
}
