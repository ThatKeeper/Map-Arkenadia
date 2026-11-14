// src/ui/paint/addTreeToPath.js
import { TAU } from '@/config';

/** Añade un árbol al trazado. */
export function addTreeToPath(P, x, y, c) {
  P.moveTo(x, y);
  P.lineTo(x, y - 6 * c);
  P.moveTo(x + 4 * c, y - 11 * c);
  P.ellipse(x, y - 11 * c, 4 * c, 6 * c, 0, 0, TAU);
}
