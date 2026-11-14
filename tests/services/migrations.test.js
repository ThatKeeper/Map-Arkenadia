// tests/services/migrations.test.js
import { describe, expect, it } from 'vitest';
import { SCHEMA_VERSION } from '@/config';
import { MIGRATION_STEPS, migrateUserData } from '@/services/migrations';

describe('migraciones de userData', () => {
  it('la versión actual del esquema es la 1 (la v2 está preparada para la Fase 1)', () => {
    expect(SCHEMA_VERSION).toBe(1);
    expect(MIGRATION_STEPS).toHaveLength(2);
  });

  it('v0 → v1 añade schemaVersion sin tocar el resto', () => {
    const v0 = { markers: [{ x: 1, y: 2 }], route: [], scale: 3 };
    const out = migrateUserData(v0);
    expect(out.schemaVersion).toBe(1);
    expect(out.markers).toEqual(v0.markers);
    expect(out.scale).toBe(3);
  });

  it('no modifica el objeto original', () => {
    const v0 = { markers: [] };
    migrateUserData(v0);
    expect(v0).toEqual({ markers: [] });
  });

  it('trata schemaVersion inválida como v0', () => {
    for (const bad of ['1', 0, -2, 1.5, null, NaN])
      expect(migrateUserData({ schemaVersion: bad }).schemaVersion).toBe(1);
  });

  it('no migra datos que ya están en la versión de destino', () => {
    const data = { schemaVersion: 1, markers: [] };
    expect(migrateUserData(data)).toBe(data);
  });

  it('no "baja" de versión datos de una versión futura', () => {
    const futuro = { schemaVersion: 7, markers: [] };
    expect(migrateUserData(futuro)).toBe(futuro);
  });

  it('encadena v0 → v1 → v2 cuando se pide la versión 2', () => {
    const out = migrateUserData({ markers: [] }, 2);
    expect(out.schemaVersion).toBe(2);
  });

  it('devuelve sin cambios lo que no es un objeto', () => {
    expect(migrateUserData(null)).toBe(null);
    expect(migrateUserData(undefined)).toBe(undefined);
    expect(migrateUserData(5)).toBe(5);
    const lista = [1, 2];
    expect(migrateUserData(lista)).toBe(lista);
  });
});
