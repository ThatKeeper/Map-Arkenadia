// src/ui/events/runShortcut.js
import { shortcutActions } from './shortcutActions';
import { showToast } from '@/ui/panels';
import { emit } from '@/utils';

/**
 * Ejecuta un atajo. Si no tiene acción propia, emite `shortcut:<id>` (la usarán las fases futuras)
 * y, si nadie la atiende, avisa de que aún no está disponible.
 * @param {string} id
 */
export function runShortcut(id) {
  const action = shortcutActions[id];
  if (action) action();
  else if (!emit('shortcut:' + id)) showToast('Esa función llegará en una próxima versión');
}
