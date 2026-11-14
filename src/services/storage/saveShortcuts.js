// @ts-check
// src/services/storage/saveShortcuts.js
import { session } from '@/state';

/** Guarda los atajos personalizados. */
export function saveShortcuts() {
  try {
    localStorage.setItem('mapaAtajos', JSON.stringify(session.shortcuts));
  } catch (e) {}
}
