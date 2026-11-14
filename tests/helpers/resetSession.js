// tests/helpers/resetSession.js
import { sanitizeUserData } from '@/services/storage';
import { history, session } from '@/state';

/**
 * Deja la sesión en un estado limpio y conocido (datos, filtros, búsquedas, atajos e historial).
 * @param {any} [userData] datos de partida (se depuran como al cargar)
 */
export function resetSession(userData = null) {
  session.userData = sanitizeUserData(userData);
  session.viewOptions = { mini: false, scalebar: true, markers: true, hover: true, hiddenCategories: [] };
  session.searchPrefs = { recientes: [], favoritos: [] };
  session.shortcuts = {};
  session.selectedMarkerId = null;
  session.selectedLabelId = null;
  history.undo.length = 0;
  history.redo.length = 0;
}
