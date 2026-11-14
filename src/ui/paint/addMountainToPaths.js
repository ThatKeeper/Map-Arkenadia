// src/ui/paint/addMountainToPaths.js

/** Añade una montaña (y su sombreado) a los trazados. */
export function addMountainToPaths(PM, PL, x, y, sz, hat) {
  PM.moveTo(x - sz, y);
  PM.lineTo(x - sz * 0.25, y - sz * 1.1);
  PM.lineTo(x, y - sz * 0.8);
  PM.lineTo(x + sz * 0.25, y - sz * 1.5);
  PM.lineTo(x + sz * 1.1, y);
  for (let k = 1; k <= hat; k++) {
    const t = k / (hat + 1),
      bx = x + sz * 0.25 + sz * 0.77 * t,
      by = y - sz * 1.35 * (1 - t);
    PL.moveTo(bx, by);
    PL.lineTo(bx - sz * 0.35, by + sz * 0.55 * (1 - t * 0.3));
  }
}
