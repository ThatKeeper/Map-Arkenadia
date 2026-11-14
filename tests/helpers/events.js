// tests/helpers/events.js
// Eventos de puntero, rueda y teclado sintéticos (jsdom no implementa PointerEvent de forma fiable).

/** Dispara un evento de puntero (pointerdown/move/up) con `pointerId`. */
export function firePointer(el, type, x, y, pointerId = 1) {
  const e = new MouseEvent(type, { bubbles: true, cancelable: true, clientX: x, clientY: y });
  Object.defineProperty(e, 'pointerId', { value: pointerId });
  el.dispatchEvent(e);
}

/** Toque corto: pointerdown + pointerup en el mismo punto. */
export function tap(el, x, y) {
  firePointer(el, 'pointerdown', x, y);
  firePointer(el, 'pointerup', x, y);
}

/** Arrastre con un puntero por una lista de puntos [x, y]. */
export function drag(el, points) {
  const [[x0, y0], ...rest] = points;
  firePointer(el, 'pointerdown', x0, y0);
  for (const [x, y] of rest) firePointer(el, 'pointermove', x, y);
  const [lx, ly] = points[points.length - 1];
  firePointer(el, 'pointerup', lx, ly);
}

/** Rueda del ratón en un punto. */
export function wheel(el, deltaY, x, y) {
  el.dispatchEvent(
    new WheelEvent('wheel', { bubbles: true, cancelable: true, deltaY, clientX: x, clientY: y }),
  );
}
