// src/features/quality/setTier.js
import { applyPresetToSettings } from './applyPresetToSettings';
import { applyQuality } from './applyQuality';
import { saveSettings } from '@/services/storage';
import { session } from '@/state';

/** Cambia el nivel de calidad y lo aplica. */
export function setTier(t) {
  session.tier = t;
  applyPresetToSettings();
  saveSettings();
  applyQuality();
}
