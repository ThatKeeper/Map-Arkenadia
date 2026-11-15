// @ts-check
// src/features/sharing/formatFileDate.js

/**
 * Fecha para nombres de archivo (AAAA-MM-DD, en hora local).
 * @param {Date} [d]
 */
export function formatFileDate(d = new Date()) {
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}
