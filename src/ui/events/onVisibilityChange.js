// src/ui/events/onVisibilityChange.js
import { requestRedraw } from '@/ui/loop';

/** Redibuja al volver a la pestaña. */
export function onVisibilityChange() {
  if (!document.hidden) requestRedraw();
}
