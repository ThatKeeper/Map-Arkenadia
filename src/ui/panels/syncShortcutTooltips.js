// src/ui/panels/syncShortcutTooltips.js
import { formatBinding, getShortcutBinding } from '@/features/shortcuts';

/** Añade la combinación de teclas al tooltip de cada botón con `data-shortcut`. */
export function syncShortcutTooltips() {
  for (const el of document.querySelectorAll('[data-shortcut]')) {
    if (!el.dataset.baseTitle)
      el.dataset.baseTitle =
        el.getAttribute('aria-label') || el.getAttribute('title') || (el.textContent || '').trim();
    const keys = formatBinding(getShortcutBinding(el.dataset.shortcut));
    el.title = keys ? `${el.dataset.baseTitle} (${keys})` : el.dataset.baseTitle;
  }
}
