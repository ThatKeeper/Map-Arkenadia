// src/ui/loop/onAnimationFrame.js
import { getFrameDelta } from './getFrameDelta';
import { measureFrameRate } from './measureFrameRate';
import { refreshStats } from './refreshStats';
import { requestFrame } from './requestFrame';
import { stepViewAnimation } from './stepViewAnimation';
import { pickZoomLevel, renderPendingTiles } from '@/features/tiles';
import { activePointers, loop } from '@/state';
import { drawFrame } from '@/ui/render';

/** Bucle principal: anima, renderiza teselas, dibuja y mide rendimiento. */
export function onAnimationFrame(now) {
  loop.rafId = 0;
  const animating = stepViewAnimation(getFrameDelta(now));
  pickZoomLevel();
  const interacting = activePointers.size > 0 || now - loop.lastWheel < 220 || animating;
  const pending = renderPendingTiles(interacting);
  drawFrame(now);
  loop.dirty = false;
  measureFrameRate(now, interacting);
  refreshStats(now);
  if (animating || pending > 0 || loop.fading || loop.dirty) requestFrame();
}
