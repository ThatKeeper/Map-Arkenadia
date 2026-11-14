// @ts-check
// src/ui/paint/strokeDetailPaths.js

/**
 * Rellena y traza los trazados de un nivel de detalle con la paleta activa.
 * @param {CanvasRenderingContext2D} g
 * @param {Record<string, any>} P paleta
 * @param {{PM: Path2D, PT: Path2D, PL: Path2D, PD: Path2D}} paths
 * @param {(w: number) => number} LW conversor de grosor de línea
 * @param {number} ls factor de grosor del nivel
 * @param {number} alpha opacidad del nivel
 */
export function strokeDetailPaths(g, P, paths, LW, ls, alpha) {
  g.globalAlpha = alpha;
  g.fillStyle = P.mt;
  g.fill(paths.PM);
  g.strokeStyle = `rgba(${P.ink},.85)`;
  g.lineWidth = LW(1.7 * ls);
  g.stroke(paths.PM);
  g.fillStyle = P.tree;
  g.fill(paths.PT);
  g.strokeStyle = `rgba(${P.ink},.75)`;
  g.lineWidth = LW(1.2 * ls);
  g.stroke(paths.PT);
  g.strokeStyle = `rgba(${P.ink},.55)`;
  g.lineWidth = LW(1 * ls);
  g.stroke(paths.PL);
  g.fillStyle = `rgba(${P.ink},.45)`;
  g.fill(paths.PD);
  g.globalAlpha = 1;
}
