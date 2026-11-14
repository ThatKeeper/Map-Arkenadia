// src/ui/loop/requestFrame.js
import { onAnimationFrame } from './onAnimationFrame';
import { loop } from '@/state';

/** Pide un fotograma de animación si no hay uno pendiente. */
export function requestFrame() {
  if (!loop.rafId) loop.rafId = requestAnimationFrame(onAnimationFrame);
}
