// src/features/markers/addMarker.js
import { saveUserData } from '@/services/storage';
import { session } from '@/state';
import { openMarkerPopup, renderMarkerList } from '@/ui/lists';

/** Crea un marcador en (x,y) y abre su editor. */
export function addMarker(x, y) {
  const m = {
    id: session.userData.nid++,
    x: Math.round(x),
    y: Math.round(y),
    n: 'Marcador ' + (session.userData.markers.length + 1),
    i: 0,
    t: '',
  };
  session.userData.markers.push(m);
  saveUserData();
  renderMarkerList();
  openMarkerPopup(m.id);
}
