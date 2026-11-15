// src/ui/controls/bindDataTransferControls.js
import { clearHistory, updateUserData } from '@/features/history';
import { buildFileName, buildPlayerData, buildPlayerExport, detectFileKind, mergePlayerData } from '@/features/sharing';
import { sanitizeUserData } from '@/services/storage';
import { session } from '@/state';
import { downloadBlob } from '@/ui/export';
import { closeSharedDialog, openSharedDialog } from '@/ui/lists';
import { showToast } from '@/ui/panels';
import { byId, emit } from '@/utils';

const json = (obj) => new Blob([JSON.stringify(obj, null, 1)], { type: 'application/json' });
const hasData = (u) => u.markers.length || u.route.length || u.labels.custom.length || Object.keys(u.labels.edits).length;

/** Aplica unos datos recibidos del DM fusionándolos con los del jugador (sin pisar lo suyo). */
function importAsPlayer(incoming, wasFullFile) {
  const { data, report } = mergePlayerData(session.userData, incoming);
  updateUserData('Datos importados', ['categories', 'markers', 'labels', 'nid', 'scale', 'unit'], (d) => {
    for (const k of ['categories', 'markers', 'labels', 'nid', 'scale', 'unit']) d[k] = data[k];
  });
  const parts = [`${report.added} nuevos`, `${report.updated} actualizados`];
  if (report.keptLocal) parts.push(`${report.keptLocal} conservados porque lo tuyo era más reciente`);
  if (report.renumbered) parts.push(`${report.renumbered} tuyos renumerados para no pisar los compartidos`);
  showToast('Importado: ' + parts.join(', ') + (wasFullFile ? '. Se descartó lo marcado como DM' : ''));
}

/** Conecta exportar e importar datos (completos, para jugadores y fusión en modo jugador). */
export function bindDataTransferControls() {
  byId('exp').onclick = () => downloadBlob(json(session.userData), buildFileName('mapa-datos', 'json'));
  byId('expPlayers').onclick = openSharedDialog;
  byId('shCancel').onclick = closeSharedDialog;
  byId('shOk').onclick = () => {
    downloadBlob(json(buildPlayerExport(session.userData)), buildFileName('mapa-jugadores', 'json'));
    closeSharedDialog();
    showToast('Archivo para jugadores exportado');
  };
  byId('imp').onchange = async (e) => {
    const f = e.target.files[0];
    e.target.value = '';
    if (!f) return;
    try {
      const { kind, data } = detectFileKind(JSON.parse(await f.text()));
      const incoming = sanitizeUserData(data);
      if (session.role === 'dm') {
        if (kind === 'jugadores') return showToast('Es un archivo para jugadores: impórtalo en modo jugador');
        if (!hasData(incoming)) throw 0;
        if (hasData(session.userData) && !confirm('Esto reemplaza tus marcadores, ruta y etiquetas actuales. ¿Continuar?')) return;
        session.userData = incoming;
        clearHistory();
        emit('userdata:changed', { keys: Object.keys(incoming) });
        return showToast('Datos importados');
      }
      // Modo jugador: siempre se filtra lo del DM (aunque llegue un archivo completo por error) y se fusiona.
      const shared = buildPlayerData(incoming);
      if (!hasData(shared)) throw 0;
      importAsPlayer(shared, kind === 'completo');
    } catch (err) {
      showToast('Archivo no válido');
    }
  };
}
