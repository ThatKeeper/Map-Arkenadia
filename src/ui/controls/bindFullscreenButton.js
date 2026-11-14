// src/ui/controls/bindFullscreenButton.js
import { byId } from '@/utils';

/** Conecta el botón de pantalla completa. */
export function bindFullscreenButton() {
  const fs = byId('fs');
  if (!document.documentElement.requestFullscreen) fs.hidden = true;
  fs.onclick = () => {
    document.fullscreenElement
      ? document.exitFullscreen()
      : document.documentElement.requestFullscreen().catch(() => {});
  };
}
