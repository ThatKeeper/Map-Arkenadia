// src/ui/lists/closeExportDialog.js
import { interaction } from '@/state';
import { byId } from '@/utils';

/** Cierra el diálogo de exportar imagen; si hay una exportación en curso, la cancela. */
export function closeExportDialog() {
  if (interaction.exporting) interaction.exporting.cancel = true;
  byId('expd').hidden = true;
}
