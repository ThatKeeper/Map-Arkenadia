// src/features/tiles/getTileGeometry.js
import { designScaleOf } from './designScaleOf';
import { session } from '@/state';

/** Escala y tamaño en el mundo de las teselas de un nivel. */
export function getTileGeometry(k) {
  const sd = designScaleOf(k),
    rs = sd * session.quality.dpr;
  return { sd, rs, Tw: session.quality.tile / rs };
}
