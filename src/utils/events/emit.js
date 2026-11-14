// @ts-check
// src/utils/events/emit.js
import { listeners } from './listeners';

/**
 * Emite un evento: avisa a sus manejadores en el orden en que se suscribieron.
 * Un manejador que falle no impide que los demás se ejecuten.
 * @param {string} event
 * @param {any} [payload]
 * @returns {number} cuántos manejadores se avisaron
 */
export function emit(event, payload) {
  const set = listeners.get(event);
  if (!set) return 0;
  const copy = [...set];
  for (const handler of copy) {
    try {
      handler(payload);
    } catch (err) {
      console.error(`Error en un manejador del evento «${event}»`, err);
    }
  }
  return copy.length;
}
