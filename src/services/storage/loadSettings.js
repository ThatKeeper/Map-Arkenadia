// @ts-check
// src/services/storage/loadSettings.js
import { OPTION_KEYS, TIERS } from '@/config';
import { applyPresetToSettings, detectTier } from '@/features/quality';
import { session } from '@/state';

/** Carga la configuración guardada y fija el nivel de calidad inicial. */
export function loadSettings() {
  try {
    const j = JSON.parse(localStorage.getItem('mapaCfg') || 'null');
    if (j && typeof j === 'object') session.settings = Object.assign(session.settings, j);
  } catch (e) {}
  if (!TIERS.includes(session.settings.q) && session.settings.q !== 'auto')
    session.settings.q = 'auto';
  session.tier = session.settings.q === 'auto' ? detectTier() : session.settings.q;
  const saved = /** @type {Record<string, any>} */ (session.settings);
  if (OPTION_KEYS.some((o) => typeof saved[o] !== 'boolean')) applyPresetToSettings();
}
