// src/ui/lists/openExportDialog.js
import { updateExportReadout } from './updateExportReadout';
import { session } from '@/state';
import { byId } from '@/utils';

/** Abre el diálogo de exportar imagen (la elección de versión solo aparece en modo DM). */
export function openExportDialog() {
  byId('eVersionBox').hidden = session.role !== 'dm';
  byId('eMsg').textContent = '';
  byId('eProg').hidden = true;
  updateExportReadout();
  byId('expd').hidden = false;
  byId('eGo').focus();
}
