// src/ui/controls/bindQualityControls.js
import { applyQuality, computeQuality, detectTier, setTier } from '@/features/quality';
import { buildPreloadQueue } from '@/features/tiles';
import { saveSettings, saveViewOptions } from '@/services/storage';
import { session, tilesState } from '@/state';
import { requestRedraw } from '@/ui/loop';
import { syncQualityPanel, syncViewOptions, updateStatsPanel } from '@/ui/panels';
import { byId } from '@/utils';

/** Conecta los controles de calidad y opciones del panel. */
export function bindQualityControls() {
  byId('qSeg').onclick = (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    session.settings.q = b.dataset.q;
    session.tier = session.settings.q === 'auto' ? detectTier() : session.settings.q;
    setTier(session.tier);
  };
  byId('dock').onchange = (e) => {
    const v = e.target.closest('input[data-v]');
    if (v) {
      session.viewOptions[v.dataset.v] = v.checked;
      saveViewOptions();
      syncViewOptions();
      requestRedraw();
      return;
    }
    const i = e.target.closest('input[data-opt]');
    if (!i) return;
    const o = i.dataset.opt;
    session.settings[o] = i.checked;
    saveSettings();
    if (o === 'stats' || o === 'preload') {
      syncQualityPanel();
      updateStatsPanel();
      return;
    }
    if (o === 'premax') {
      computeQuality();
      tilesState.maxTiles = session.quality.maxTiles;
      buildPreloadQueue();
      syncQualityPanel();
      requestRedraw();
      return;
    }
    applyQuality();
  };
}
