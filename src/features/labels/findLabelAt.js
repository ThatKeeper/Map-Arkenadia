// @ts-check
// src/features/labels/findLabelAt.js
import { getVisibleLabels } from './getVisibleLabels';
import { getLabelBox } from './getLabelBox';
import { viewport } from '@/state';

/**
 * Etiqueta visible bajo un punto de pantalla (la de más arriba si se solapan).
 * Usa un recuadro aproximado del texto, girado como la etiqueta.
 * @param {number} cx
 * @param {number} cy
 * @returns {import('../../types').EffectiveLabel|null}
 */
export function findLabelAt(cx, cy) {
  const wx = (cx - viewport.panX) / viewport.scale,
    wy = (cy - viewport.panY) / viewport.scale,
    pad = 8 / viewport.scale,
    list = getVisibleLabels();
  for (let i = list.length - 1; i >= 0; i--) {
    const l = list[i];
    if (viewport.scale < l.minZoom) continue;
    const { halfW, halfH } = getLabelBox(l),
      dx = wx - l.x,
      dy = wy - l.y,
      cos = Math.cos(-l.rot),
      sin = Math.sin(-l.rot),
      lx = dx * cos - dy * sin,
      ly = dx * sin + dy * cos;
    if (Math.abs(lx) <= halfW + pad && Math.abs(ly) <= halfH + pad) return l;
  }
  return null;
}
