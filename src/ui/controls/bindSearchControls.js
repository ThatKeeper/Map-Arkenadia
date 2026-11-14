// src/ui/controls/bindSearchControls.js
import { findPlace, flyTo } from '@/features/navigation';
import { closeDock, showToast } from '@/ui/panels';
import { byId } from '@/utils';

/** Conecta el buscador de lugares. */
export function bindSearchControls() {
  const go = () => {
    const p = findPlace(byId('q').value);
    if (p) {
      flyTo(p.x, p.y, p.z);
      if (innerWidth < 700) closeDock();
    } else showToast('No encontré ese lugar');
  };
  byId('q').onchange = go;
  byId('q').onkeydown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      go();
    }
  };
}
