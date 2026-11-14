// src/utils/truncate.js

/** Convierte a texto y recorta a n caracteres (null → ""). */
export const truncate = (v, n) => String(v == null ? '' : v).slice(0, n);
