// src/ui/render/drawLabelsOn.js
import { drawLabel } from './drawLabel';

/**
 * Dibuja una lista de etiquetas en un contexto con la transformación del mundo ya aplicada.
 * @param {CanvasRenderingContext2D} ctx
 * @param {Record<string, any>} P paleta
 * @param {import('../../types').EffectiveLabel[]} labels
 * @param {number} zoom zoom de diseño (decide cuáles se ven y su tamaño)
 * @param {[number, number, number, number]} region [x0, y0, x1, y1] zona visible del mundo
 * @param {string|null} [selectedId] etiqueta marcada como seleccionada
 */
export function drawLabelsOn(ctx, P, labels, zoom, region, selectedId = null) {
  const [vx0, vy0, vx1, vy1] = region;
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'left';
  ctx.lineJoin = 'round';
  for (const l of labels) {
    if (zoom < l.minZoom) continue;
    if (l.x < vx0 - 300 || l.x > vx1 + 300 || l.y < vy0 - 100 || l.y > vy1 + 100) continue;
    drawLabel(P, l.texto, l.x, l.y, l.tipo, l.minZoom, l.rot, l.id === selectedId ? l : undefined, l.tam, ctx, zoom);
  }
}
