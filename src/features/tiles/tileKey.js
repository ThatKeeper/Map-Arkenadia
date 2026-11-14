// src/features/tiles/tileKey.js

/** Clave única de una tesela (nivel, x, y). */
export const tileKey = (k, x, y) => k + '|' + x + '|' + y;
