// src/ui/lists/closeSharedDialog.js
import { byId } from '@/utils';

/** Cierra el aviso de exportación para jugadores. */
export function closeSharedDialog() {
  byId('sharedd').hidden = true;
}
