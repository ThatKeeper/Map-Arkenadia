// @ts-check
// src/services/storage/loadSearchPrefs.js
import { session } from '@/state';
import { readStoredJson, truncate } from '@/utils';

/** Carga las búsquedas recientes y favoritas. */
export function loadSearchPrefs() {
  const j = readStoredJson('mapaBusq') || {};
  const list = (v) =>
    Array.isArray(v)
      ? [...new Set(v.filter((s) => typeof s === 'string' && s.trim()).map((s) => truncate(s, 60)))].slice(0, 20)
      : [];
  session.searchPrefs = { recientes: list(j.recientes), favoritos: list(j.favoritos) };
}
