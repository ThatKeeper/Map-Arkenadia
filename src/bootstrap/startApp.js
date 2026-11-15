// src/bootstrap/startApp.js
import { cacheDom } from './cacheDom';
import { fitToWindow, resizeCanvas } from '@/features/navigation';
import { computeQuality } from '@/features/quality';
import { loadClassMap, preloadFonts } from '@/services/assets';
import { loadRole, loadSearchPrefs, loadSettings, loadShortcuts, loadUserData } from '@/services/storage';
import { startWorker } from '@/services/worker';
import { session, tilesState } from '@/state';
import {
  bindMinimapEvents,
  bindModeToggle,
  bindQualityControls,
  bindZoomButtons,
} from '@/ui/controls';
import { bindViewEvents } from '@/ui/events';
import { initPanels } from '@/ui/lists';
import { syncQualityPanel } from '@/ui/panels';

/** Arranca la aplicación: DOM, datos guardados, eventos, calidad, worker, fuentes y mapa. */
export function startApp() {
  cacheDom();
  loadSettings();
  loadUserData();
  loadRole();
  loadSearchPrefs();
  loadShortcuts();
  bindQualityControls();
  bindZoomButtons();
  bindModeToggle();
  bindViewEvents();
  bindMinimapEvents();
  computeQuality();
  tilesState.maxTiles = session.quality.maxTiles;
  syncQualityPanel();
  initPanels();
  resizeCanvas();
  fitToWindow();
  startWorker();
  preloadFonts();
  loadClassMap();
}
