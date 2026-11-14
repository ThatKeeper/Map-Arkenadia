// tests/helpers/waitFor.js

/**
 * Espera (con temporizadores reales) a que se cumpla una condición.
 * Cuenta intentos en vez de leer el reloj, porque en las pruebas `Date.now` está congelado.
 * @param {() => boolean} cond
 * @param {{ timeout?: number, interval?: number, onTick?: () => void }} [opts]
 */
export async function waitFor(cond, { timeout = 90000, interval = 20, onTick } = {}) {
  const maxTries = Math.ceil(timeout / interval);
  for (let i = 0; i < maxTries; i++) {
    if (onTick) onTick();
    if (cond()) return;
    await new Promise((r) => setTimeout(r, interval));
  }
  throw new Error('waitFor: tiempo agotado');
}
