// src/ui/controls/bindDataTransferControls.js
import { sanitizeUserData, saveUserData } from '@/services/storage';
import { session } from '@/state';
import { closeMarkerPopup, renderMarkerList, renderRouteList } from '@/ui/lists';
import { requestRedraw } from '@/ui/loop';
import { showToast } from '@/ui/panels';
import { byId } from '@/utils';

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
      if (!d.markers.length && !d.route.length) throw 0;
      if (session.userData.markers.length || session.userData.route.length)
        if (!confirm('Esto reemplaza tus marcadores y ruta actuales. ¿Continuar?')) return;
      session.userData = d;
      saveUserData();
      renderMarkerList();
      renderRouteList();
      closeMarkerPopup();
      requestRedraw();
      showToast('Datos importados');
    } catch (err) {
      showToast('Archivo no válido');
    }
  };
}
