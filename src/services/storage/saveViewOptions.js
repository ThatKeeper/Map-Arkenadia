// @ts-check
// src/services/storage/saveViewOptions.js
import { session } from '@/state';

/** Guarda las opciones de vista en localStorage. */
export const saveViewOptions = () => {
  try {
    localStorage.setItem('mapaVista', JSON.stringify(session.viewOptions));
  } catch (e) {}
};
