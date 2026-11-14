// src/ui/panels/showToast.js
import { interaction } from '@/state';
import { byId, createEl } from '@/utils';

/**
 * Muestra un aviso temporal, con un botón de acción opcional (p. ej. «Deshacer»).
 * @param {string} msg
 * @param {{ label: string, onClick: () => void }} [action]
 */
export function showToast(msg, action) {
  const t = byId('toast');
  t.textContent = msg;
  t.classList.toggle('act', !!action);
  if (action) {
    const b = createEl('button', action.label);
    b.type = 'button';
    b.onclick = () => {
      action.onClick();
      t.hidden = true;
    };
    t.appendChild(b);
  }
  t.hidden = false;
  t.style.opacity = 1;
  clearTimeout(interaction.toastTimer);
  interaction.toastTimer = setTimeout(
    () => {
      t.style.opacity = 0;
      setTimeout(() => (t.hidden = true), 450);
    },
    action ? 6500 : 3800,
  );
}
