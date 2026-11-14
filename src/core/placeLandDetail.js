// src/core/placeLandDetail.js
import { nextRandom } from './rng';

/**
 * Decide qué detalle de terreno colocar en tierra firme (v>.8) según el bioma k.
 * Tipos: 1 montaña, 2 árbol, 3 punto, 4 pico nevado, 5 mata, 6 duna.
 */
export function placeLandDetail(k, r, l, dens, sz, px, py, place) {
  if (k === 9) {
    if (r < (l ? 0.5 : 0.7) * dens) place(1, px, py, (8 + nextRandom() * 9) * sz);
  } else if (k === 8) {
    if (r < (l ? 0.4 : 0.5) * dens) place(2, px, py, sz);
  } else if (k === 7 || k === 6) {
    if (r < (l ? 0.1 + 0.08 * l : 0.07) * dens) place(l > 1 ? 5 : 2, px, py, l > 1 ? sz * 3 : sz);
  } else if (k === 4 || k === 5) {
    if (r < 0.3 * dens) place(3, px, py, sz);
    else if (r < 0.325 * dens) place(6, px, py, 7 * sz);
  } else if (k === 11 && r < 0.012 * (l + 1) * dens) {
    place(4, px, py, Math.max(0.5, sz * 1.2));
  }
}
