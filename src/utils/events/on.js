// @ts-check
// src/utils/events/on.js
import { listeners } from './listeners';
import { off } from './off';

/**
 * Suscribe un manejador a un evento del bus.
 * @param {string} event
 * @param {(payload?: any) => void} handler
 * @returns {() => void} función que cancela la suscripción
 */
export function on(event, handler) {
  let set = listeners.get(event);
  if (!set) listeners.set(event, (set = new Set()));
  set.add(handler);
  return () => off(event, handler);
}
