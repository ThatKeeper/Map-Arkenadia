// src/ui/panels/refreshAfterFilterChange.js
import { getMarkerById, getVisibleMarkers } from '@/features/markers';
import { session } from '@/state';
import { closeMarkerPopup, renderCategoryList, renderMarkerList } from '@/ui/lists';
import { requestRedraw } from '@/ui/loop';

/** Repinta lista, categorías y mapa al cambiar el filtro de categorías; cierra el editor si su marcador queda oculto. */
export function refreshAfterFilterChange() {
  renderMarkerList();
  renderCategoryList();
  const open = getMarkerById(session.selectedMarkerId);
  if (open && !getVisibleMarkers().includes(open)) closeMarkerPopup();
  requestRedraw();
}
