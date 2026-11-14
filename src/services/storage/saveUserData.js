// @ts-check
// src/services/storage/saveUserData.js
import { session } from '@/state';

/** Guarda marcadores y ruta en localStorage (con retardo de 200 ms). */
export const saveUserData = (() => {
  let t = 0;
  return () => {
    clearTimeout(t);
    t = setTimeout(() => {
      try {
        localStorage.setItem('mapaDatos', JSON.stringify(session.userData));
      } catch (e) {}
    }, 200);
  };
})();
