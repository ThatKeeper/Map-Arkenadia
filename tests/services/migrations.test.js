// tests/services/migrations.test.js
import { describe, expect, it } from 'vitest';
import { LEGACY_ICON_MAP, SCHEMA_VERSION } from '@/config';
import { MIGRATION_STEPS, migrateUserData } from '@/services/migrations';

const v1 = () => ({
  schemaVersion: 1,
  markers: [
    { id: 4, x: 10, y: 20, n: 'Castillo', i: 1, t: 'una nota' },
    { id: 5, x: 30, y: 40, n: 'Barco', i: 2, t: '' },
  ],
  route: [{ x: 1, y: 2, n: 'A' }],
  scale: 3,
  unit: 'km',
  nid: 6,
});

describe('migraciones de userData', () => {
  it('la versión actual del esquema es la 2', () => {
    expect(SCHEMA_VERSION).toBe(2);
    expect(MIGRATION_STEPS).toHaveLength(2);
  });

  it('v0 → v1 añade schemaVersion sin tocar el resto', () => {
    const out = migrateUserData({ markers: [], scale: 3 }, 1);
    expect(out.schemaVersion).toBe(1);
    expect(out.scale).toBe(3);
  });

  it('v1 → v2 convierte los marcadores al formato nuevo', () => {
    const out = migrateUserData(v1());
    expect(out.schemaVersion).toBe(2);
    const m = out.markers[0];
    expect(m.nombre).toBe('Castillo');
    expect(m.nota).toBe('una nota');
    expect(m.id).toBe(4);
    expect(m.x).toBe(10);
    expect(m.visibilidad).toBe('todos');
    expect(m.creado).toBe(0);
    expect(m.actualizado).toBe(0);
    expect(m.n).toBe(undefined);
    expect(m.i).toBe(undefined);
  });

  it('v1 → v2 traduce el icono antiguo a icono y categoría nuevos', () => {
    const out = migrateUserData(v1());
    expect([out.markers[0].icono, out.markers[0].categoria]).toEqual(LEGACY_ICON_MAP[1]);
    expect([out.markers[1].icono, out.markers[1].categoria]).toEqual(LEGACY_ICON_MAP[2]);
  });

  it('v1 → v2 añade categorías por defecto y etiquetas vacías, y conserva ruta, escala y unidad', () => {
    const out = migrateUserData(v1());
    expect(out.categories.length).toBeGreaterThanOrEqual(8);
    expect(out.labels).toEqual({ edits: {}, custom: [], nid: 1 });
    expect(out.route).toEqual([{ x: 1, y: 2, n: 'A' }]);
    expect(out.scale).toBe(3);
    expect(out.unit).toBe('km');
    expect(out.nid).toBe(6);
  });

  it('una migración no modifica el objeto original', () => {
    const data = v1();
    migrateUserData(data);
    expect(data).toEqual(v1());
  });

  it('encadena v0 → v1 → v2 (datos sin versión)', () => {
    const { schemaVersion, ...v0 } = v1();
    expect(schemaVersion).toBe(1);
    const out = migrateUserData(v0);
    expect(out.schemaVersion).toBe(2);
    expect(out.markers[0].nombre).toBe('Castillo');
  });

  it('trata schemaVersion inválida como v0', () => {
    for (const bad of ['1', 0, -2, 1.5, null, NaN])
      expect(migrateUserData({ schemaVersion: bad, markers: [] }).schemaVersion).toBe(2);
  });

  it('no migra datos que ya están en la versión de destino', () => {
    const data = { schemaVersion: 2, markers: [] };
    expect(migrateUserData(data)).toBe(data);
  });

  it('no "baja" de versión datos de una versión futura', () => {
    const futuro = { schemaVersion: 9, markers: [] };
    expect(migrateUserData(futuro)).toBe(futuro);
  });

  it('tolera marcadores antiguos con basura', () => {
    const out = migrateUserData({ schemaVersion: 1, markers: [null, 5, { x: 1, y: 2, i: 99 }] });
    expect(out.markers).toHaveLength(3);
    expect(out.markers[2].icono).toBe(LEGACY_ICON_MAP[0][0]);
  });

  it('devuelve sin cambios lo que no es un objeto', () => {
    expect(migrateUserData(null)).toBe(null);
    expect(migrateUserData(undefined)).toBe(undefined);
    expect(migrateUserData(5)).toBe(5);
    const lista = [1, 2];
    expect(migrateUserData(lista)).toBe(lista);
  });
});
