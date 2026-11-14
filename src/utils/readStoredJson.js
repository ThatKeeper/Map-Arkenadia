// src/utils/readStoredJson.js

/** Lee y parsea un JSON de localStorage; devuelve null si falla. */
export const readStoredJson = (k) => {
  try {
    return JSON.parse(localStorage.getItem(k) || 'null');
  } catch (e) {
    return null;
  }
};
