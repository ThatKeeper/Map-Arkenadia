// @ts-check
// src/features/labels/addLabel.js
import { updateUserData } from '@/features/history';
import { session } from '@/state';

/**
 * Crea una etiqueta propia (se puede deshacer).
 * @param {number} x
 * @param {number} y
 * @param {string} [texto]
 * @param {string} [estilo]
 * @returns {string} id de la etiqueta creada
 */
export function addLabel(x, y, texto = 'Nueva etiqueta', estilo = 'x') {
  const id = 'c' + session.userData.labels.nid;
  updateUserData('Etiqueta creada', ['labels'], (d) => {
    d.labels.custom.push({ id, texto, x: Math.round(x), y: Math.round(y), tam: 1, rot: 0, estilo });
    d.labels.nid += 1;
  });
  return id;
}
