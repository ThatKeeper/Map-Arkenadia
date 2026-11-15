// src/ui/lists/openSharedDialog.js
import { summarizePlayerExport } from '@/features/sharing';
import { session } from '@/state';
import { byId, createEl } from '@/utils';

/** Muestra qué se compartirá (y qué queda fuera) antes de exportar para jugadores. */
export function openSharedDialog() {
  const s = summarizePlayerExport(session.userData),
    box = byId('sharedSummary');
  box.textContent = '';
  box.appendChild(createEl('p', `Se compartirán ${s.markersShared} marcador(es) y ${s.labelsShared} etiqueta(s) marcados como «Todos».`));
  if (s.markerNames.length) {
    const ul = createEl('ul');
    for (const n of s.markerNames.slice(0, 40)) ul.appendChild(createEl('li', n));
    if (s.markerNames.length > 40) ul.appendChild(createEl('li', `… y ${s.markerNames.length - 40} más`));
    box.appendChild(ul);
  }
  const out = [];
  if (s.markersExcluded) out.push(`${s.markersExcluded} marcador(es) ocultos o personales`);
  if (s.labelsExcluded) out.push(`${s.labelsExcluded} etiqueta(s) ocultas o personales`);
  if (s.privateNotes) out.push(`${s.privateNotes} nota(s) privada(s) del DM`);
  if (s.routeExcluded) out.push('la ruta');
  box.appendChild(createEl('p', out.length ? 'Se quedan fuera: ' + out.join(', ') + '.' : 'No hay nada oculto que excluir.'));
  byId('sharedd').hidden = false;
}
