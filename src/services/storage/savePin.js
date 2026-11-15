// @ts-check
// src/services/storage/savePin.js
import { session } from '@/state';

/** Guarda (o borra, si no hay PIN) el hash del PIN del DM. */
export function savePin() {
  try {
    if (session.pin) localStorage.setItem('mapaPin', JSON.stringify(session.pin));
    else localStorage.removeItem('mapaPin');
  } catch (e) {}
}
