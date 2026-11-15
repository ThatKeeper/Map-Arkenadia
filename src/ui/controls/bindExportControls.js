// src/ui/controls/bindExportControls.js
import { interaction } from '@/state';
import { closeExportDialog, openExportDialog, readExportOptions, updateExportReadout } from '@/ui/lists';
import { downloadBlob, exportMapImage } from '@/ui/export';
import { byId } from '@/utils';

/** Conecta el diálogo de exportar imagen: opciones, progreso, cancelar y descarga. */
export function bindExportControls() {
  byId('expImg').onclick = openExportDialog;
  byId('expd').onchange = updateExportReadout;
  byId('eCancel').onclick = () => {
    if (interaction.exporting) {
      interaction.exporting.cancel = true;
      byId('eMsg').textContent = 'Cancelando…';
    } else closeExportDialog();
  };
  byId('eGo').onclick = async () => {
    if (interaction.exporting) return;
    const state = { cancel: false };
    interaction.exporting = state;
    byId('eGo').disabled = true;
    byId('eCancel').textContent = 'Cancelar';
    byId('eProg').hidden = false;
    byId('eProg').value = 0;
    byId('eMsg').textContent = 'Generando la imagen… puedes seguir usando el mapa.';
    try {
      const r = await exportMapImage(readExportOptions(), {
        onProgress: (f) => (byId('eProg').value = f),
        shouldCancel: () => state.cancel,
      });
      downloadBlob(r.blob, r.filename);
      byId('eMsg').textContent = `Listo: ${r.filename} (${r.size.width} × ${r.size.height} px).`;
    } catch (err) {
      byId('eMsg').textContent =
        err && err.name === 'AbortError'
          ? 'Exportación cancelada.'
          : 'No se pudo exportar (quizá falta memoria). Prueba con una resolución menor.';
      if (!(err && err.name === 'AbortError')) console.error(err);
    } finally {
      interaction.exporting = null;
      byId('eGo').disabled = false;
      byId('eCancel').textContent = 'Cerrar';
      byId('eProg').hidden = true;
    }
  };
}
