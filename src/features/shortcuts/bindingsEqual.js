// @ts-check
// src/features/shortcuts/bindingsEqual.js

/**
 * Compara dos combinaciones. En teclas que no son letra ni cifra (+ - / ?) se ignora Mayús,
 * porque en muchos teclados esas teclas ya la requieren.
 * @param {{ key: string, ctrl?: boolean, shift?: boolean }} a
 * @param {{ key: string, ctrl?: boolean, shift?: boolean }} b
 */
export function bindingsEqual(a, b) {
  if (a.key !== b.key || !!a.ctrl !== !!b.ctrl) return false;
  return /^[a-z0-9]$/.test(a.key) ? !!a.shift === !!b.shift : true;
}
