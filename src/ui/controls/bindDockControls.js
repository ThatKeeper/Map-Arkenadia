// src/ui/controls/bindDockControls.js
import { closeDock, openDock, setTab, setTool } from '@/ui/panels';
import { byId } from '@/utils';

/** Conecta menú, pestañas y herramientas. */
export function bindDockControls() {
  byId('mnu').onclick = () => (byId('dock').hidden ? openDock() : closeDock());
  byId('tabs').onclick = (e) => {
    const b = e.target.closest('button');
    if (b) setTab(b.dataset.t);
  };
  byId('tMark').onclick = () => setTool('marker');
  byId('tRoute').onclick = () => setTool('route');
  byId('chipOk').onclick = () => setTool(null);
}
