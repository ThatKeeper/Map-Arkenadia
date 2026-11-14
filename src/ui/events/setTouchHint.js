// src/ui/events/setTouchHint.js
import { byId } from '@/utils';

/** Cambia la ayuda si el dispositivo es táctil. */
export function setTouchHint() {
  if (matchMedia('(pointer:coarse)').matches)
    byId('hint').textContent =
      'Pellizca para acercar · arrastra para moverte · toca para ver el bioma';
}
