// src/features/quality/downgradeQuality.js
import { setTier } from './setTier';
import { TIERS } from '@/config';
import { session } from '@/state';
import { showToast } from '@/ui/panels';

/** Baja un nivel de calidad automáticamente cuando hay tirones. */
export function downgradeQuality() {
  const i = TIERS.indexOf(session.tier);
  if (i < 0 || i >= TIERS.length - 1) return;
  setTier(TIERS[i + 1]);
  showToast('Ajusté la calidad a «' + TIERS[i + 1] + '» para que se mueva con fluidez');
}
