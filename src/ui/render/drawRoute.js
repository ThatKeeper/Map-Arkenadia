// src/ui/render/drawRoute.js
import { drawRouteOn } from './drawRouteOn';
import { worldToScreen } from '@/features/navigation';
import { dom, session } from '@/state';

/** Dibuja la ruta del usuario. */
export function drawRoute() {
  drawRouteOn({ ctx: dom.ctx, toScreen: worldToScreen }, session.userData.route);
}
