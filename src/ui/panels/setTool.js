// src/ui/panels/setTool.js
import { closeDock } from './closeDock';
import { dom, session } from '@/state';
import { closeLabelPopup } from '@/ui/lists';
import { requestRedraw } from '@/ui/loop';
import { byId } from '@/utils';

const CHIP_TEXT = {
  marker: 'Toca el mapa para colocar un marcador',
  route: 'Toca el mapa para añadir puntos a la ruta (también sobre un marcador)',
  labels: 'Toca una etiqueta para editarla, arrástrala para moverla o toca un hueco para crear otra',
};

/** Activa o desactiva la herramienta de marcador, ruta o etiquetas. */
export function setTool(t) {
  session.activeTool = t === session.activeTool ? null : t;
  dom.view.style.cursor = session.activeTool ? 'crosshair' : '';
  byId('tMark').setAttribute('aria-pressed', String(session.activeTool === 'marker'));
  byId('tRoute').setAttribute('aria-pressed', String(session.activeTool === 'route'));
  byId('tLabels').setAttribute('aria-pressed', String(session.activeTool === 'labels'));
  if (session.activeTool !== 'labels') closeLabelPopup();
  const c = byId('chip');
  c.hidden = !session.activeTool;
  byId('chipTxt').textContent = CHIP_TEXT[session.activeTool] || '';
  if (session.activeTool && innerWidth < 700) closeDock();
  requestRedraw();
}
