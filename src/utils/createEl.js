// src/utils/createEl.js

/** Crea un elemento DOM con texto y clase opcionales. */
export const createEl = (tag, txt, cls2) => {
  const e = document.createElement(tag);
  if (txt != null) e.textContent = txt;
  if (cls2) e.className = cls2;
  return e;
};
