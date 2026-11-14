// src/ui/events/moveLabelDrag.js
import { updateLabel } from '@/features/labels';
import { dom, interaction, viewport } from '@/state';

/**
 * Mueve la etiqueta que se arrastra (tras un pequeño umbral, para distinguir un toque de un arrastre).
 * Los movimientos seguidos se fusionan en una sola acción de deshacer.
 * @param {PointerEvent} e
 */
export function moveLabelDrag(e) {
  const d = interaction.dragLabel;
  if (!d) return;
  if (!d.moved && Math.hypot(e.clientX - d.sx, e.clientY - d.sy) < 5) return;
  d.moved = true;
  const r = dom.view.getBoundingClientRect();
  updateLabel(
    d.id,
    {
      x: Math.round((e.clientX - r.left - viewport.panX) / viewport.scale + d.dx),
      y: Math.round((e.clientY - r.top - viewport.panY) / viewport.scale + d.dy),
    },
    `etiqueta:${d.id}:mover`,
  );
}
