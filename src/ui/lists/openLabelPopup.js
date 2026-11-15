// src/ui/lists/openLabelPopup.js
import { LABEL_STYLES, VISIBILITIES } from '@/config';
import { canEditVisibility } from '@/features/roles';
import { getLabelById } from '@/features/labels';
import { session } from '@/state';
import { requestRedraw } from '@/ui/loop';
import { byId, createEl } from '@/utils';

/**
 * Abre (o refresca) el editor de una etiqueta. Los campos con el foco no se tocan.
 * @param {string} id
 */
export function openLabelPopup(id) {
  const l = getLabelById(id);
  if (!l) return;
  session.selectedLabelId = id;
  const focused = document.activeElement;
  const style = byId('lStyle'),
    vis = byId('lVis'),
    editable = canEditVisibility(l.visibilidad),
    dm = session.role === 'dm';
  if (!vis.options.length)
    for (const [v, n] of VISIBILITIES) {
      const o = createEl('option', 'Visible para: ' + n);
      o.value = v;
      vis.appendChild(o);
    }
  if (!style.options.length)
    for (const [v, n] of LABEL_STYLES) {
      const o = createEl('option', n);
      o.value = v;
      style.appendChild(o);
    }
  if (focused !== byId('lText')) byId('lText').value = l.texto;
  style.value = l.tipo;
  if (focused !== byId('lSize')) byId('lSize').value = String(l.tam);
  if (focused !== byId('lRot')) byId('lRot').value = String(Math.round((l.rot * 180) / Math.PI));
  vis.hidden = !dm;
  vis.value = l.visibilidad;
  for (const f of ['lText', 'lStyle', 'lSize', 'lRot']) byId(f).disabled = !editable;
  byId('lDel').hidden = !editable;
  byId('lLock').hidden = editable;
  byId('lReset').hidden = !dm || !l.original || !l.editada;
  byId('lpop').hidden = false;
  requestRedraw();
}
