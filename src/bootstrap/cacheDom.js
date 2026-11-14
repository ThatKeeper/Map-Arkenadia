// src/bootstrap/cacheDom.js
import { dom } from '@/state';
import { byId } from '@/utils';

/** Guarda las referencias a los elementos del DOM y los contextos de canvas. */
export function cacheDom() {
  dom.canvas = byId('cv');
  dom.ctx = dom.canvas.getContext('2d', { alpha: false });
  dom.view = byId('view');
  dom.zoomLabel = byId('pct');
  dom.mini = byId('mini');
  dom.miniCtx = dom.mini.getContext('2d');
}
