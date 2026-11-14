// tests/core/computeGeometry.test.js
// Ejecuta el núcleo completo sobre la cuadrícula real del mapa (calidad baja, para que sea rápido).
import { beforeAll, describe, expect, it } from 'vitest';
import { getClassMap } from '../helpers/getClassMap.js';
import { BIOME_PAINT_ORDER, GRID_HEIGHT, GRID_WIDTH } from '@/config';
import { computeGeometry, computeItems, initCore } from '@/core';

let classes, geo;

beforeAll(async () => {
  classes = getClassMap().classes;
  initCore(classes);
  geo = await computeGeometry(1);
});

describe('mapa de clases', () => {
  it('la imagen real se decodifica a clases de terreno 0..15', () => {
    expect(classes).toHaveLength(GRID_WIDTH * GRID_HEIGHT);
    expect(classes.reduce((m, c) => Math.max(m, c), 0)).toBeLessThanOrEqual(15);
    expect(classes.some((c) => c === 0)).toBe(true); // hay mar
    expect(classes.some((c) => c >= 4)).toBe(true); // hay tierra
  });
});

describe('computeGeometry', () => {
  it('devuelve los contornos de mar, costas, ríos y todos los biomas', () => {
    for (const k of ['m', 'sh', 'lt', 'land', 'r1', 'r2']) {
      expect(geo[k].pts).toBeInstanceOf(Float32Array);
      expect(geo[k].lens).toBeInstanceOf(Int32Array);
    }
    for (const b of BIOME_PAINT_ORDER) expect(geo.b[b].lens).toBeInstanceOf(Int32Array);
  });

  it('el contorno de tierra tiene lazos y sus puntos caen dentro del mundo', () => {
    expect(geo.land.lens.length).toBeGreaterThan(0);
    const total = Array.from(geo.land.lens).reduce((a, b) => a + b, 0);
    expect(geo.land.pts.length).toBe(total * 2);
    for (let i = 0; i < geo.land.pts.length; i += 2) {
      expect(geo.land.pts[i]).toBeGreaterThan(-10);
      expect(geo.land.pts[i]).toBeLessThan(2410);
      expect(geo.land.pts[i + 1]).toBeGreaterThan(-10);
      expect(geo.land.pts[i + 1]).toBeLessThan(1858);
    }
  });

  it('es determinista: dos ejecuciones dan los mismos contornos', async () => {
    initCore(classes);
    const again = await computeGeometry(1);
    expect(Array.from(again.land.lens)).toEqual(Array.from(geo.land.lens));
    expect(Array.from(again.land.pts.slice(0, 200))).toEqual(Array.from(geo.land.pts.slice(0, 200)));
  });

  it('acepta una función de cesión del hilo y la llama varias veces', async () => {
    let ticks = 0;
    initCore(classes);
    await computeGeometry(1, async () => {
      ticks++;
    });
    expect(ticks).toBeGreaterThan(5);
  });
});

describe('computeItems', () => {
  it('genera 4 niveles; los superiores al pedido quedan vacíos', () => {
    const items = computeItems(1, 0.4);
    expect(items).toHaveLength(4);
    expect(items[0].length).toBeGreaterThan(0);
    expect(items[2]).toHaveLength(0);
    expect(items[3]).toHaveLength(0);
  });

  it('cada elemento ocupa 4 valores [tipo, x, y, tamaño] y van por filas (Y casi ordenada)', () => {
    const [l0] = computeItems(0, 0.4);
    expect(l0.length % 4).toBe(0);
    // Se reparten por filas de 16 unidades con variación aleatoria: nunca retroceden más de una fila.
    // (El dibujo lo compensa con el margen LOD_SPACING + 30 al buscar el primer elemento visible.)
    for (let i = 1; i < l0.length / 4; i++)
      expect(l0[i * 4 + 2]).toBeGreaterThanOrEqual(l0[(i - 1) * 4 + 2] - 16);
  });

  it('más densidad genera más elementos', () => {
    const poca = computeItems(0, 0.2)[0].length;
    const mucha = computeItems(0, 1)[0].length;
    expect(mucha).toBeGreaterThan(poca);
  });

  it('es determinista', () => {
    const a = computeItems(1, 0.6),
      b = computeItems(1, 0.6);
    for (let l = 0; l < 4; l++) expect(Array.from(a[l])).toEqual(Array.from(b[l]));
  });
});
