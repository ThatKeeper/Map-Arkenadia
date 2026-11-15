// src/ui/panels/refreshAfterRoleChange.js
import { showToast } from './showToast';
import { syncRoleUi } from './syncRoleUi';
import { session } from '@/state';
import {
  closeCategoryPopup,
  closeLabelPopup,
  closeMarkerPopup,
  renderCategoryList,
  renderMarkerList,
} from '@/ui/lists';
import { requestRedraw } from '@/ui/loop';
import { byId } from '@/utils';

/** Tras cambiar de rol: cierra los editores (podrían mostrar algo del otro rol), repinta y avisa. */
export function refreshAfterRoleChange() {
  closeMarkerPopup();
  closeLabelPopup();
  closeCategoryPopup();
  syncRoleUi();
  renderMarkerList();
  renderCategoryList();
  const q = byId('q');
  if (q) q.value = '';
  requestRedraw();
  showToast(session.role === 'dm' ? 'Modo DM: ves todo lo oculto' : 'Modo jugador: no se ve lo del DM');
}
