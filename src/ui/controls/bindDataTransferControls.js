// src/ui/controls/bindDataTransferControls.js
import { clearHistory } from '@/features/history';
import { sanitizeUserData } from '@/services/storage';
import { session } from '@/state';
import { showToast } from '@/ui/panels';
import { byId, emit } from '@/utils';

/** Conecta exportar e importar datos. */
export function bindDataTransferControls() {
  byId('exp').onclick = () => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(
      new Blob([JSON.stringify(session.userData, null, 1)], { type: 'application/json' }),
    );
    a.download = 'mapa-datos.json';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      URL.revokeObjectURL(a.href);
      a.remove();
    }, 500);
  };
  byId('imp').onchange = async (e) => {
    const f = e.target.files[0];
    e.target.value = '';
    if (!f) return;
    try {
      const d = sanitizeUserData(JSON.parse(await f.text()));
      const hasData = (u) => u.markers.length || u.route.length || u.labels.custom.length || Object.keys(u.labels.edits).length;
      if (!hasData(d)) throw 0;
      if (hasData(session.userData))
        if (!confirm('Esto reemplaza tus marcadores, ruta y etiquetas actuales. ¿Continuar?')) return;
      session.userData = d;
      clearHistory();
      emit('userdata:changed', { keys: Object.keys(d) });
      showToast('Datos importados');
    } catch (err) {
      showToast('Archivo no válido');
    }
  };
}
