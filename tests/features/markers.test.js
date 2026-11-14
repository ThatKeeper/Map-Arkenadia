// tests/features/markers.test.js
import { beforeEach, describe, expect, it } from 'vitest';
import { resetSession } from '../helpers/resetSession.js';
import {
  addCategory, countMarkersByCategory, getCategoryById, removeCategory, setCategoryHidden,
  setHiddenCategories, showAllCategories, showOnlyCategory, updateCategory,
} from '@/features/categories';
import { redo, undo } from '@/features/history';
import {
  addMarker, changeMarkerCategory, clearMarkers, getKnownMarkerNames, getMarkerById,
  getVisibleMarkers, removeMarker, updateMarker,
} from '@/features/markers';
import { addRoutePoint, clearRoute, removeLastRoutePoint, removeRoutePoint, reverseRoute } from '@/features/route';
import { session } from '@/state';

beforeEach(() => resetSession());

describe('marcadores', () => {
  it('addMarker crea un marcador v2 con la categoría Nota por defecto', () => {
    const m = addMarker(100.4, 200.6);
    expect(m).toMatchObject({ id: 1, x: 100, y: 201, categoria: 'nota', icono: 'pin', visibilidad: 'todos', nota: '' });
    expect(m.nombre).toBe('Marcador 1');
    expect(m.creado).toBeGreaterThan(0);
    expect(m.actualizado).toBe(m.creado);
    expect(session.userData.nid).toBe(2);
  });

  it('usa el icono de la categoría elegida', () => {
    expect(addMarker(1, 1, 'mazmorra').icono).toBe('mazmorra');
  });

  it('crear, editar y borrar se deshacen y se rehacen', () => {
    const m = addMarker(10, 10);
    updateMarker(m.id, { nombre: 'Torre' });
    expect(getMarkerById(m.id).nombre).toBe('Torre');
    removeMarker(m.id);
    expect(session.userData.markers).toHaveLength(0);
    undo();
    expect(getMarkerById(m.id).nombre).toBe('Torre');
    undo();
    expect(getMarkerById(m.id).nombre).toBe('Marcador 1');
    undo();
    expect(session.userData.markers).toHaveLength(0);
    expect(session.userData.nid).toBe(1);
    redo();
    expect(session.userData.markers).toHaveLength(1);
  });

  it('updateMarker actualiza la marca de edición', () => {
    const m = addMarker(1, 1);
    const antes = m.actualizado;
    updateMarker(m.id, { nota: 'hola' });
    expect(getMarkerById(m.id).nota).toBe('hola');
    expect(getMarkerById(m.id).actualizado).toBeGreaterThanOrEqual(antes);
  });

  it('clearMarkers borra todos y se deshace', () => {
    addMarker(1, 1);
    addMarker(2, 2);
    expect(clearMarkers()).toBe(2);
    expect(session.userData.markers).toHaveLength(0);
    undo();
    expect(session.userData.markers).toHaveLength(2);
    expect(clearMarkers()).toBe(2);
    undo();
    expect(clearMarkers.length).toBe(0);
  });

  it('cambiar de categoría cambia el icono solo si tenía el de la categoría anterior', () => {
    const a = addMarker(1, 1, 'ciudad');
    changeMarkerCategory(a.id, 'peligro');
    expect(getMarkerById(a.id)).toMatchObject({ categoria: 'peligro', icono: 'peligro' });
    const b = addMarker(2, 2, 'ciudad');
    updateMarker(b.id, { icono: 'faro' });
    changeMarkerCategory(b.id, 'peligro');
    expect(getMarkerById(b.id)).toMatchObject({ categoria: 'peligro', icono: 'faro' });
  });

  it('getKnownMarkerNames omite los nombres genéricos y ordena', () => {
    updateMarker(addMarker(1, 1).id, { nombre: 'Zarza' });
    updateMarker(addMarker(2, 2).id, { nombre: 'Álamo' });
    addMarker(3, 3);
    expect(getKnownMarkerNames()).toEqual(['Álamo', 'Zarza']);
  });
});

describe('categorías y filtro', () => {
  it('cuenta marcadores por categoría', () => {
    addMarker(1, 1, 'ciudad');
    addMarker(2, 2, 'ciudad');
    addMarker(3, 3, 'peligro');
    expect(countMarkersByCategory()).toEqual({ ciudad: 2, peligro: 1 });
  });

  it('ocultar una categoría la quita de los marcadores visibles (y de la cuenta no)', () => {
    addMarker(1, 1, 'ciudad');
    addMarker(2, 2, 'peligro');
    setCategoryHidden('ciudad', true);
    expect(getVisibleMarkers().map((m) => m.categoria)).toEqual(['peligro']);
    expect(countMarkersByCategory().ciudad).toBe(1);
    setCategoryHidden('ciudad', false);
    expect(getVisibleMarkers()).toHaveLength(2);
  });

  it('«solo esta» oculta las demás y «mostrar todas» las recupera', () => {
    addMarker(1, 1, 'ciudad');
    addMarker(2, 2, 'peligro');
    showOnlyCategory('peligro');
    expect(session.viewOptions.hiddenCategories).toHaveLength(session.userData.categories.length - 1);
    expect(getVisibleMarkers()).toHaveLength(1);
    showAllCategories();
    expect(session.viewOptions.hiddenCategories).toEqual([]);
  });

  it('crear un marcador en una categoría oculta la vuelve a mostrar', () => {
    setHiddenCategories(['bestia']);
    addMarker(1, 1, 'bestia');
    expect(session.viewOptions.hiddenCategories).toEqual([]);
  });

  it('addCategory genera ids únicos y se deshace', () => {
    const a = addCategory('Taberna', '#112233', 'posada');
    const b = addCategory('Taberna', '#112233', 'posada');
    expect(a).toBe('taberna');
    expect(b).toBe('taberna-2');
    undo();
    expect(getCategoryById('taberna-2')).toBe(undefined);
  });

  it('updateCategory cambia nombre, color e icono', () => {
    updateCategory('ciudad', { nombre: 'Villa', color: '#123456', icono: 'aldea' });
    expect(getCategoryById('ciudad')).toMatchObject({ nombre: 'Villa', color: '#123456', icono: 'aldea' });
  });

  it('removeCategory reasigna sus marcadores a Nota y se deshace', () => {
    const m = addMarker(1, 1, 'ciudad');
    expect(removeCategory('ciudad')).toBe(true);
    expect(getCategoryById('ciudad')).toBe(undefined);
    expect(getMarkerById(m.id).categoria).toBe('nota');
    undo();
    expect(getMarkerById(m.id).categoria).toBe('ciudad');
    expect(getCategoryById('ciudad')).toBeTruthy();
  });

  it('no deja borrar la última categoría ni una que no existe', () => {
    expect(removeCategory('no-existe')).toBe(false);
    for (const c of [...session.userData.categories].slice(1)) removeCategory(c.id);
    expect(session.userData.categories).toHaveLength(1);
    expect(removeCategory(session.userData.categories[0].id)).toBe(false);
  });
});

describe('ruta con deshacer', () => {
  it('añadir, quitar, invertir y borrar se pueden deshacer', () => {
    addRoutePoint({ x: 1, y: 1 });
    addRoutePoint({ x: 2, y: 2, n: 'B' });
    addRoutePoint({ x: 3, y: 3 });
    expect(session.userData.route.map((p) => p.x)).toEqual([1, 2, 3]);
    reverseRoute();
    expect(session.userData.route.map((p) => p.x)).toEqual([3, 2, 1]);
    removeRoutePoint(0);
    expect(session.userData.route.map((p) => p.x)).toEqual([2, 1]);
    removeLastRoutePoint();
    expect(session.userData.route.map((p) => p.x)).toEqual([2]);
    clearRoute();
    expect(session.userData.route).toEqual([]);
    undo();
    expect(session.userData.route.map((p) => p.x)).toEqual([2]);
    undo();
    undo();
    undo();
    expect(session.userData.route.map((p) => p.x)).toEqual([1, 2, 3]);
  });

  it('removeLastRoutePoint no hace nada con la ruta vacía', () => {
    removeLastRoutePoint();
    expect(undo()).toBe(null);
  });
});
