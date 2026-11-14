// tests/smoke/app.test.js
// Arnés de humo: arranca la app completa con un canvas "grabador" y un reloj determinista, y ejercita
// arranque, zoom, arrastre, marcadores, ruta y cambio de calidad. De cada escenario guarda una huella
// (nº de llamadas 2D + hash). Si un refactor cambia lo que se dibuja, la huella cambia y la prueba falla.
// Primera vez (o tras un cambio intencionado): `npm run test:update`.
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { drag, tap, wheel } from '../helpers/events.js';
import { getClassMap } from '../helpers/getClassMap.js';
import { installBrowserStubs } from '../helpers/installBrowserStubs.js';
import { installFakeClock } from '../helpers/installFakeClock.js';
import { loadAppDom } from '../helpers/loadAppDom.js';
import { waitFor } from '../helpers/waitFor.js';
import { GRID_HEIGHT, GRID_WIDTH } from '@/config';

let clock, stubs, app;

/** Huella del escenario actual: canvas principal y todas las llamadas 2D de todos los canvas. */
function fingerprint() {
  const main = stubs.digests.get(document.getElementById('cv'));
  return { main: main.toJSON(), todas: stubs.all.toJSON() };
}

/** Deja que la app termine lo pendiente (fotogramas y tareas asíncronas cortas). */
async function settle() {
  clock.flushFrames(600);
  await new Promise((r) => setTimeout(r, 30));
  clock.flushFrames(600);
}

beforeAll(async () => {
  localStorage.clear();
  localStorage.setItem('mapaCfg', JSON.stringify({ q: 'baja' }));
  const { rgba } = getClassMap();
  clock = installFakeClock();
  stubs = installBrowserStubs({ classMap: rgba, gridWidth: GRID_WIDTH, gridHeight: GRID_HEIGHT });
  loadAppDom();
  // Importación diferida: la app debe cargarse con el reloj y los sustitutos ya instalados.
  const [{ startApp }, state] = await Promise.all([import('@/bootstrap'), import('@/state')]);
  app = state;
  startApp();
  await waitFor(() => !document.getElementById('load'), { onTick: () => clock.flushFrames(50) });
  await settle();
});

afterAll(() => clock && clock.restore());

describe('arnés de humo de la app', () => {
  it('arranca y pinta el mapa', () => {
    expect(app.loop.ready).toBe(true);
    expect(app.build.geometry).toBeTruthy();
    expect(app.build.workerOk).toBe(false); // en pruebas se usa el respaldo en el hilo principal
    expect(fingerprint()).toMatchSnapshot();
  });

  it('hace zoom con la rueda', async () => {
    const view = document.getElementById('view');
    const antes = app.viewport.targetScale;
    for (let i = 0; i < 4; i++) {
      wheel(view, -240, 512, 384);
      clock.flushFrames(3);
    }
    await settle();
    expect(app.viewport.targetScale).toBeGreaterThan(antes);
    expect(fingerprint()).toMatchSnapshot();
  });

  it('arrastra el mapa', async () => {
    const view = document.getElementById('view');
    const panX = app.viewport.panX;
    drag(view, [[500, 400], [540, 410], [580, 420], [620, 430]]);
    await settle();
    expect(app.viewport.panX).toBeGreaterThan(panX);
    expect(fingerprint()).toMatchSnapshot();
  });

  it('coloca un marcador y lo guarda en userData', async () => {
    const view = document.getElementById('view');
    document.getElementById('tMark').click();
    expect(app.session.activeTool).toBe('marker');
    tap(view, 600, 380);
    await settle();
    expect(app.session.userData.markers).toHaveLength(1);
    expect(app.session.userData.schemaVersion).toBe(1);
    expect(fingerprint()).toMatchSnapshot();
  });

  it('traza una ruta de tres puntos', async () => {
    const view = document.getElementById('view');
    document.getElementById('tRoute').click();
    expect(app.session.activeTool).toBe('route');
    for (const [x, y] of [[300, 300], [500, 340], [700, 500]]) tap(view, x, y);
    await settle();
    expect(app.session.userData.route).toHaveLength(3);
    expect(fingerprint()).toMatchSnapshot();
  });

  it('cambia de calidad y vuelve a pintar', async () => {
    for (const q of ['media', 'baja']) {
      document.querySelector(`#qSeg button[data-q="${q}"]`).click();
      await waitFor(() => app.session.tier === q && app.build.geometryQuality === app.session.quality.geo, {
        onTick: () => clock.flushFrames(50),
      });
      await settle();
      expect(app.session.tier).toBe(q);
      expect(fingerprint()).toMatchSnapshot();
    }
  });
});
