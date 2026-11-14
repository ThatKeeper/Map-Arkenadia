// src/ui/lists/initPanels.js
import { initMarkerIconPicker } from './initMarkerIconPicker';
import { renderBiomeList } from './renderBiomeList';
import { renderMarkerList } from './renderMarkerList';
import { renderRouteList } from './renderRouteList';
import { restoreSavedTab } from './restoreSavedTab';
import {
  bindDataTransferControls,
  bindDockControls,
  bindFullscreenButton,
  bindHoverTip,
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
  bindRouteControls();
  bindDataTransferControls();
  bindSearchControls();
  bindFullscreenButton();
  bindHoverTip();
  syncViewOptions();
  renderMarkerList();
  renderRouteList();
  renderBiomeList();
  sizeMinimap();
}
