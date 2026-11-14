// @ts-check
// src/features/shortcuts/normalizeKey.js

/**
 * Tecla normalizada (minúsculas; "=" cuenta como "+" y "_" como "-").
 * @param {string} key valor de `KeyboardEvent.key`
 */
export function normalizeKey(key) {
  const k = key.length === 1 ? key.toLowerCase() : key;
  return k === '=' ? '+' : k === '_' ? '-' : k;
}
