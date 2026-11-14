// @ts-check
// src/ui/paint/addDetailItemToPaths.js
import { addMountainToPaths } from './addMountainToPaths';
import { addTreeToPath } from './addTreeToPath';

/**
 * Añade un elemento de detalle (montaña, árbol, punto, pico, hierba, arbusto u ola) a su trazado.
 * @param {{PM: Path2D, PT: Path2D, PL: Path2D, PD: Path2D}} paths trazados por tipo de dibujo
 * @param {number} t tipo de elemento
 * @param {number} x
 * @param {number} y
 * @param {number} z tamaño relativo
 * @param {number} se escala efectiva de dibujo
 */
export function addDetailItemToPaths(paths, t, x, y, z, se) {
  const { PM, PT, PL, PD } = paths;
  if (t === 1) addMountainToPaths(PM, PL, x, y, z, Math.max(2, Math.min(9, Math.round((z * se) / 5))));
  else if (t === 2) addTreeToPath(PT, x, y, z);
  else if (t === 3) {
    const d = 1.5 * Math.max(z, 0.5);
    PD.rect(x, y, d, d);
  } else if (t === 4) {
    PL.moveTo(x - 6 * z, y);
    PL.lineTo(x, y - 7 * z);
    PL.lineTo(x + 6 * z, y);
  } else if (t === 5) {
    PL.moveTo(x, y);
    PL.lineTo(x - 2 * z, y - 5 * z);
    PL.moveTo(x, y);
    PL.lineTo(x, y - 6 * z);
    PL.moveTo(x, y);
    PL.lineTo(x + 2 * z, y - 5 * z);
  } else if (t === 6) {
    PL.moveTo(x + z * Math.cos(3.4), y + z * Math.sin(3.4));
    PL.arc(x, y, z, 3.4, 6);
  } else {
    PL.moveTo(x, y);
    PL.quadraticCurveTo(x + 7 * z, y - 8 * z, x + 14 * z, y);
    PL.quadraticCurveTo(x + 21 * z, y + 8 * z, x + 28 * z, y);
  }
}
