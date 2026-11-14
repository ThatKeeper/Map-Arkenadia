// src/features/quality/computeQuality.js
import { OPTION_KEYS, PRESETS } from '@/config';
import { session } from '@/state';

/** Calcula los parámetros de calidad efectivos (resolución, teselas, memoria). */
export function computeQuality() {
  const b = PRESETS[session.tier];
  session.quality = Object.assign({}, b);
  for (const o of OPTION_KEYS) session.quality[o] = session.settings[o];
  session.quality.dpr = Math.min(window.devicePixelRatio || 1, session.quality.res);
  const mem = navigator.deviceMemory;
  let mb = b.mb;
  if (mem && mem <= 2) mb *= 0.5;
  session.quality.maxTiles = Math.max(
    24,
    Math.floor(
      ((mb * 1e6) / (session.quality.tile * session.quality.tile * 4)) *
        (session.quality.premax ? 1.8 : 1),
    ),
  );
}
