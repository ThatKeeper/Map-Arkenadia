// @ts-check
// src/utils/normalizeText.js

/**
 * Minúsculas y sin acentos, para comparar textos sin distinguir tildes ni mayúsculas.
 * @param {unknown} v
 */
export const normalizeText = (v) =>
  String(v == null ? '' : v)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
