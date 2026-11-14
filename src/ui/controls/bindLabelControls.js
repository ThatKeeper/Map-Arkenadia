// src/ui/controls/bindLabelControls.js
import { getLabelById, removeLabel, restoreLabel, restoreOriginalLabels, updateLabel } from '@/features/labels';
import { session } from '@/state';
import { closeLabelPopup } from '@/ui/lists';
import { setTool, showToast, toastWithUndo } from '@/ui/panels';
import { byId } from '@/utils';

/** Conecta la pestaña de etiquetas y el editor de etiqueta. */
export function bindLabelControls() {
  const current = () => getLabelById(session.selectedLabelId);
  byId('tLabels').onclick = () => setTool('labels');
  byId('lRestore').onclick = () => {
    if (restoreOriginalLabels()) toastWithUndo('Etiquetas originales restauradas');
    else showToast('Las etiquetas originales no tienen cambios');
  };
  byId('lText').oninput = (e) => {
    const l = current();
    if (l) updateLabel(l.id, { texto: e.target.value });
  };
  byId('lStyle').onchange = (e) => {
    const l = current();
    if (l) updateLabel(l.id, { estilo: e.target.value });
  };
  byId('lSize').oninput = (e) => {
    const l = current();
    if (l) updateLabel(l.id, { tam: parseFloat(e.target.value) });
  };
  byId('lRot').oninput = (e) => {
    const l = current();
    if (l) updateLabel(l.id, { rot: (parseFloat(e.target.value) * Math.PI) / 180 });
  };
  byId('lReset').onclick = () => {
    const l = current();
    if (l && l.original) restoreLabel(l.id);
  };
  byId('lDel').onclick = () => {
    const l = current();
    if (!l) return;
    removeLabel(l.id);
    closeLabelPopup();
    toastWithUndo('Etiqueta borrada');
  };
  byId('lOk').onclick = closeLabelPopup;
}
