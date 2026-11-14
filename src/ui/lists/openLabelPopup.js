// src/ui/lists/openLabelPopup.js
import { LABEL_STYLES } from '@/config';
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
  const style = byId('lStyle');
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
  byId('lReset').hidden = !l.original || !l.editada;
  byId('lpop').hidden = false;
  requestRedraw();
}
