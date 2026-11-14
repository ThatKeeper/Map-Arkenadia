// src/ui/panels/sizeMinimap.js
import { MINI_HEIGHT, MINI_WIDTH } from '@/config';
import { dom, session } from '@/state';

/** Ajusta el tamaño del canvas del minimapa. */
export function sizeMinimap() {
  const dp = session.quality.dpr;
  dom.mini.width = Math.round(MINI_WIDTH * dp);
  dom.mini.height = Math.round(MINI_HEIGHT * dp);
  dom.mini.style.width = MINI_WIDTH + 'px';
  dom.mini.style.height = MINI_HEIGHT + 'px';
}
