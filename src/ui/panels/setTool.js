// src/ui/panels/setTool.js
import { closeDock } from './closeDock';
import { dom, session } from '@/state';
import { requestRedraw } from '@/ui/loop';
import { byId } from '@/utils';

/** Activa o desactiva la herramienta de marcador o ruta. */
export function setTool(t) {
  session.activeTool = t === session.activeTool ? null : t;
  dom.view.style.cursor = session.activeTool ? 'crosshair' : '';
  byId('tMark').setAttribute('aria-pressed', String(session.activeTool === 'marker'));
  byId('tRoute').setAttribute('aria-pressed', String(session.activeTool === 'route'));
  const c = byId('chip');
  c.hidden = !session.activeTool;
  byId('chipTxt').textContent =
    session.activeTool === 'marker'
      ? 'Toca el mapa para colocar un marcador'
      : session.activeTool === 'route'
        ? 'Toca el mapa para añadir puntos a la ruta (también sobre un marcador)'
        : '';
  if (session.activeTool && innerWidth < 700) closeDock();
  requestRedraw();
}
