// src/ui/loop/requestRedraw.js
import { requestFrame } from './requestFrame';
import { loop } from '@/state';

/** Marca el lienzo como sucio y pide un fotograma. */
export function requestRedraw() {
  loop.dirty = true;
  requestFrame();
}
