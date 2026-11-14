// @ts-check
// src/services/assets/preloadFonts.js
import { letterWidthCache } from '@/state';
import { requestRedraw } from '@/ui/loop';

/** Carga las tipografías del mapa y limpia la caché de anchos de letra. */
export function preloadFonts() {
  document.fonts &&
    Promise.all([
      document.fonts.load('50px "IM Fell English SC"'),
      document.fonts.load('500 30px Caveat'),
      document.fonts.load('700 70px Caveat'),
    ])
      .catch(() => {})
      .then(() => {
        letterWidthCache.clear();
        requestRedraw();
      });
}
