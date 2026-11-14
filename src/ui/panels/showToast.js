// src/ui/panels/showToast.js
import { interaction } from '@/state';
import { byId } from '@/utils';

/** Muestra un aviso temporal. */
export function showToast(msg) {
  const t = byId('toast');
  t.textContent = msg;
  t.hidden = false;
  t.style.opacity = 1;
  clearTimeout(interaction.toastTimer);
  interaction.toastTimer = setTimeout(() => {
    t.style.opacity = 0;
    setTimeout(() => (t.hidden = true), 450);
  }, 3800);
}
