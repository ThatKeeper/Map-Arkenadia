// src/ui/panels/setTab.js

/** Activa una pestaña del panel de herramientas. */
export function setTab(t) {
  for (const b of document.querySelectorAll('#tabs button'))
    b.setAttribute('aria-selected', String(b.dataset.t === t));
  for (const p of document.querySelectorAll('#dock section')) p.hidden = p.dataset.p !== t;
  try {
    sessionStorage.setItem('mapaTab', t);
  } catch (e) {}
}
