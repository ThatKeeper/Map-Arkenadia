// @ts-check
// src/services/storage/saveSettings.js
import { session } from '@/state';

/** Guarda la configuración de calidad en localStorage. */
export const saveSettings = () => {
  try {
    localStorage.setItem('mapaCfg', JSON.stringify(session.settings));
  } catch (e) {}
};
