// src/ui/events/shortcutActions.js
import { doRedo } from './doRedo';
import { doUndo } from './doUndo';
import { focusSearch } from './focusSearch';
import { resetView, zoomBy } from '@/features/navigation';
import { openHelp } from '@/ui/lists';
import { closeDock, openDock, setTool } from '@/ui/panels';
import { byId } from '@/utils';

/**
 * Acciones de los atajos (id → función). Los atajos que no están aquí (funciones de fases futuras)
 * solo emiten el evento `shortcut:<id>`.
 */
export const shortcutActions = {
  toolMarker: () => setTool('marker'),
  toolRoute: () => setTool('route'),
  toolLabels: () => setTool('labels'),
  zoomIn: () => zoomBy(1.3),
  zoomOut: () => zoomBy(1 / 1.3),
  fitAll: () => resetView(),
  search: focusSearch,
  searchCtrl: focusSearch,
  togglePanel: () => (byId('dock').hidden ? openDock() : closeDock()),
  undo: doUndo,
  redo: doRedo,
  redoAlt: doRedo,
  save: () => byId('exp').click(),
  help: openHelp,
};
