// src/ui/lists/readExportOptions.js
import { session } from '@/state';
import { byId } from '@/utils';

/** Lee las opciones del diálogo de exportar imagen. En modo jugador la versión es siempre «jugadores». */
export function readExportOptions() {
  const radio = (name) => /** @type {HTMLInputElement} */ (document.querySelector(`input[name="${name}"]:checked`)).value;
  const on = (id) => byId(id).checked && !byId(id).disabled;
  return {
    scope: radio('eScope'),
    factor: Number(radio('eFactor')),
    format: radio('eFormat'),
    version: session.role === 'dm' ? radio('eVer') : 'jugadores',
    markers: on('eMarkers'),
    route: on('eRoute'),
    labels: on('eLabels'),
    grid: on('eGrid'),
    fog: on('eFog'),
    legend: on('eLegend'),
    scalebar: on('eScalebar'),
  };
}
