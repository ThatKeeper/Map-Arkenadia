// src/ui/controls/bindModeToggle.js
import { buildPreloadQueue } from '@/features/tiles';
import { session, tilesState } from '@/state';
import { renderBiomeList } from '@/ui/lists';
import { requestRedraw } from '@/ui/loop';
import { byId } from '@/utils';

/** Conecta el botón de color/pergamino. */
export function bindModeToggle() {
  const btn = byId('mode');
  btn.onclick = () => {
    session.paletteMode = 1 - session.paletteMode;
    btn.textContent = session.paletteMode ? 'Ver en pergamino' : 'Ver en color';
    tilesState.generation++;
    tilesState.overviewStale = true;
    buildPreloadQueue();
    renderBiomeList();
    requestRedraw();
  };
}
