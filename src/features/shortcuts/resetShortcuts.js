// @ts-check
// src/features/shortcuts/resetShortcuts.js
import { saveShortcuts } from '@/services/storage';
import { session } from '@/state';

/** Restaura todos los atajos a los valores por defecto. */
export function resetShortcuts() {
  session.shortcuts = {};
  saveShortcuts();
}
