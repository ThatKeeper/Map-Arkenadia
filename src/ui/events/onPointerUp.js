// src/ui/events/onPointerUp.js
import { endPointer } from './endPointer';
import { activePointers, interaction } from '@/state';
import { handleMapTap } from '@/ui/panels';

/** Fin de puntero; si fue un toque corto, lo trata como clic. */
export function onPointerUp(e) {
  const d = interaction.tapCandidate;
  if (
    d &&
    !d.multi &&
    activePointers.size === 1 &&
    Math.hypot(e.clientX - d.x, e.clientY - d.y) < 7 &&
    performance.now() - d.t < 700
  )
    handleMapTap(e);
  endPointer(e);
}
