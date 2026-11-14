// src/ui/events/bindViewEvents.js
import { endPointer } from './endPointer';
import { onKeyDown } from './onKeyDown';
import { onPointerDown } from './onPointerDown';
import { onPointerMove } from './onPointerMove';
import { onPointerUp } from './onPointerUp';
import { onVisibilityChange } from './onVisibilityChange';
import { onWheel } from './onWheel';
import { setTouchHint } from './setTouchHint';
import { fitToWindow } from '@/features/navigation';
import { dom } from '@/state';

/** Registra los eventos de la vista del mapa. */
export function bindViewEvents() {
  dom.view.addEventListener('wheel', onWheel, { passive: false });
  dom.view.addEventListener('pointerdown', onPointerDown);
  dom.view.addEventListener('pointermove', onPointerMove);
  dom.view.addEventListener('pointerup', onPointerUp);
  dom.view.addEventListener('pointercancel', endPointer);
  addEventListener('keydown', onKeyDown);
  addEventListener('resize', fitToWindow);
  document.addEventListener('visibilitychange', onVisibilityChange);
  setTouchHint();
}
