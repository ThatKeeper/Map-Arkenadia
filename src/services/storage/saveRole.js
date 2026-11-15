// @ts-check
// src/services/storage/saveRole.js
import { session } from '@/state';

/** Guarda el rol activo. */
export function saveRole() {
  try {
    localStorage.setItem('mapaRol', session.role);
  } catch (e) {}
}
