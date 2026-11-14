// @ts-check
// src/utils/events/off.js
import { listeners } from './listeners';

/**
 * Cancela la suscripción de un manejador (si no existe, no hace nada).
 * @param {string} event
 * @param {(payload?: any) => void} handler
 */
export function off(event, handler) {
  const set = listeners.get(event);
  if (!set) return;
  set.delete(handler);
  if (!set.size) listeners.delete(event);
}
