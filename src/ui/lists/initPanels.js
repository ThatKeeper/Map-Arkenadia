// src/ui/lists/initPanels.js
import { initMarkerIconPicker } from './initMarkerIconPicker';
import { renderBiomeList } from './renderBiomeList';
import { renderCategoryList } from './renderCategoryList';
import { renderMarkerList } from './renderMarkerList';
import { renderRouteList } from './renderRouteList';
import { restoreSavedTab } from './restoreSavedTab';
import {
  bindCategoryControls,
  bindDataTransferControls,
  bindDockControls,
  bindFullscreenButton,
  bindHelpControls,
  bindHistoryControls,
  bindHoverTip,
  bindLabelControls,
  bindMarkerListControls,
  bindMarkerPopupControls,
  bindRouteControls,
  bindSearchControls,
} from '@/ui/controls';
import { sizeMinimap, syncViewOptions } from '@/ui/panels';

/** Inicializa todos los paneles y listas. */
export function initPanels() {
  initMarkerIconPicker();
  bindDockControls();
  restoreSavedTab();
  bindMarkerPopupControls();
  bindMarkerListControls();
  bindCategoryControls();
  bindLabelControls();
  bindHistoryControls();
  bindHelpControls();
  bindRouteControls();
  bindDataTransferControls();
  bindSearchControls();
  bindFullscreenButton();
  bindHoverTip();
  syncViewOptions();
  renderMarkerList();
  renderCategoryList();
  renderRouteList();
  renderBiomeList();
  sizeMinimap();
}
