// src/ui/controls/bindZoomButtons.js
import { resetView, zoomBy } from '@/features/navigation';
import { byId } from '@/utils';

/** Conecta los botones +, − y ver todo. */
export function bindZoomButtons() {
  byId('zi').onclick = () => zoomBy(1.5);
  byId('zo').onclick = () => zoomBy(1 / 1.5);
  byId('zr').onclick = resetView;
}
