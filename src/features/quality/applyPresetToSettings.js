// src/features/quality/applyPresetToSettings.js
import { OPTION_KEYS, PRESETS } from '@/config';
import { session } from '@/state';
import { prefersReducedMotion } from '@/utils';

/** Copia las opciones del nivel actual a la configuración. */
export function applyPresetToSettings() {
  for (const o of OPTION_KEYS) session.settings[o] = PRESETS[session.tier][o];
  if (prefersReducedMotion()) session.settings.smooth = false;
}
