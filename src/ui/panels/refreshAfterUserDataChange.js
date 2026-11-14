// src/ui/panels/refreshAfterUserDataChange.js
import { getCategoryById } from '@/features/categories';
import { getLabelById } from '@/features/labels';
import { getMarkerById } from '@/features/markers';
import { saveUserData } from '@/services/storage';
import { interaction, session } from '@/state';
import {
  closeCategoryPopup,
  closeLabelPopup,
  closeMarkerPopup,
  openCategoryPopup,
  openLabelPopup,
  openMarkerPopup,
  renderCategoryList,
  renderMarkerList,
  renderRouteList,
} from '@/ui/lists';
import { requestRedraw } from '@/ui/loop';
import { byId } from '@/utils';

/**
 * Pone al día interfaz y guardado tras cambiar `userData` (también al deshacer, rehacer o importar):
 * guarda, repinta listas y refresca (o cierra, si ya no existen) los editores abiertos.
 */
export function refreshAfterUserDataChange() {
  saveUserData();
  renderMarkerList();
  renderRouteList();
  renderCategoryList();
  if (!byId('pop').hidden) {
    if (getMarkerById(session.selectedMarkerId)) openMarkerPopup(/** @type {number} */ (session.selectedMarkerId));
    else closeMarkerPopup();
  }
  if (!byId('cpop').hidden) {
    if (interaction.editingCategoryId && getCategoryById(interaction.editingCategoryId))
      openCategoryPopup(interaction.editingCategoryId);
    else closeCategoryPopup();
  }
  if (!byId('lpop').hidden) {
    if (getLabelById(session.selectedLabelId)) openLabelPopup(/** @type {string} */ (session.selectedLabelId));
    else closeLabelPopup();
  }
  requestRedraw();
}
