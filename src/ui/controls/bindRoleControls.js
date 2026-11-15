// src/ui/controls/bindRoleControls.js
import { hasPin } from '@/features/roles';
import { closePinDialog, openPinDialog, submitPinDialog } from '@/ui/lists';
import { refreshAfterRoleChange, requestRoleSwitch, syncRoleUi } from '@/ui/panels';
import { byId, on } from '@/utils';

/** Conecta el selector de modo DM/jugador, el PIN y la reacción a `role:changed`. */
export function bindRoleControls() {
  byId('roleBtn').onclick = requestRoleSwitch;
  byId('roleToggle').onclick = requestRoleSwitch;
  byId('pinSet').onclick = () => openPinDialog(hasPin() ? 'change' : 'set');
  byId('pinRemove').onclick = () => openPinDialog('remove');
  byId('pinOk').onclick = submitPinDialog;
  byId('pinCancel').onclick = closePinDialog;
  for (const id of ['pinCur', 'pinNew', 'pinRep'])
    byId(id).onkeydown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        submitPinDialog();
      }
    };
  on('role:changed', refreshAfterRoleChange);
  syncRoleUi();
}
