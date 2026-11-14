// src/ui/panels/syncQualityPanel.js
import { AUTO_DESC, PRESETS } from '@/config';
import { session } from '@/state';
import { byId } from '@/utils';

/** Sincroniza el panel de rendimiento con la configuración. */
export function syncQualityPanel() {
  for (const b of document.querySelectorAll('#qSeg button'))
    b.setAttribute('aria-checked', String(b.dataset.q === session.settings.q));
  byId('qDesc').textContent =
    session.settings.q === 'auto'
      ? AUTO_DESC + ' (ahora: ' + session.tier + ')'
      : PRESETS[session.tier].desc;
  for (const i of document.querySelectorAll('#dock input[data-opt]'))
    i.checked = !!session.settings[i.dataset.opt];
  byId('stats').hidden = !session.settings.stats;
}
