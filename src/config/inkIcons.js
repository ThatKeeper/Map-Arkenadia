// src/config/inkIcons.js
// Biblioteca de iconos de trazo de tinta. Cada icono se dibuja en una cuadrícula de 24×24 con
// trazos redondeados (sin relleno ni emojis ni fuentes externas), así que se ve nítido a cualquier zoom.

/** Trazo de una circunferencia como ruta SVG. */
const circle = (cx, cy, r) =>
  `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;

/**
 * Iconos disponibles: { id, nombre, tags (para buscar), d (rutas SVG 24×24) }.
 * @type {ReadonlyArray<{ id: string, nombre: string, tags: string[], d: string[] }>}
 */
export const INK_ICONS = [
  { id: 'pin', nombre: 'Chincheta', tags: ['lugar', 'punto', 'marca'], d: [
    'M12 21C12 21 5 14.5 5 9.5a7 7 0 0 1 14 0C19 14.5 12 21 12 21Z', circle(12, 9.5, 2.3)] },
  { id: 'castillo', nombre: 'Castillo', tags: ['fortaleza', 'ciudad', 'reino'], d: [
    'M4 20V9h3v2h2V9h2v2h2V9h2v2h2V9h3v11Z', 'M10 20v-4a2 2 0 0 1 4 0v4'] },
  { id: 'aldea', nombre: 'Aldea', tags: ['pueblo', 'casas', 'ciudad'], d: [
    'M3 20v-8l5-4 5 4v8Z', 'M13 20v-6l4-3 4 3v6', 'M6.5 20v-5h3v5'] },
  { id: 'tienda', nombre: 'Campamento', tags: ['base', 'tienda', 'acampada'], d: [
    'M3 20 12 5l9 15Z', 'M9.5 20 12 14l2.5 6'] },
  { id: 'mazmorra', nombre: 'Mazmorra', tags: ['cueva', 'puerta', 'subterraneo'], d: [
    'M5 21V10a7 7 0 0 1 14 0v11Z', 'M9 21v-8M12 21V10M15 21v-8'] },
  { id: 'bestia', nombre: 'Bestia', tags: ['criatura', 'monstruo', 'garra', 'animal'], d: [
    circle(6.5, 11, 1.8), circle(10.5, 7, 1.8), circle(15.5, 7, 1.8), circle(19.5, 11, 1.8),
    'M13 12c-4 0-6 4.5-4.5 7 1.2 1.8 3 .7 4.5.7s3.3 1.1 4.5-.7C19 16.5 17 12 13 12Z'] },
  { id: 'mision', nombre: 'Misión', tags: ['encargo', 'objetivo', 'escudo'], d: [
    'M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6Z', 'M12 8v5', circle(12, 16.2, 0.6)] },
  { id: 'peligro', nombre: 'Peligro', tags: ['aviso', 'trampa', 'alerta'], d: [
    'M12 3 22 20H2Z', 'M12 9v5', circle(12, 17, 0.6)] },
  { id: 'cofre', nombre: 'Tesoro', tags: ['cofre', 'botin', 'riqueza'], d: [
    'M3 20V10c0-4 4-6 9-6s9 2 9 6v10Z', 'M3 11h18', 'M10.5 11v4h3v-4'] },
  { id: 'nota', nombre: 'Nota', tags: ['papel', 'apunte', 'texto'], d: [
    'M6 3h9l4 4v14H6Z', 'M15 3v4h4', 'M9 11h7M9 14h7M9 17h4'] },
  { id: 'portal', nombre: 'Portal', tags: ['puerta', 'magia', 'teletransporte'], d: [
    'M12 2.5c5 0 8 4.5 8 9.5s-3 9.5-8 9.5S4 17 4 12s3-9.5 8-9.5Z',
    'M12 7c3 0 4.5 2.5 4.5 5 0 2.5-2 4.5-4.5 4.5-2 0-3.5-1.5-3.5-3.5 0-1.5 1-2.5 2.5-2.5'] },
  { id: 'barco', nombre: 'Barco', tags: ['nave', 'puerto', 'navegar'], d: [
    'M3 15h18l-3 5H6Z', 'M12 15V4', 'M12 5l6 8h-6', 'M12 7l-5 6h5'] },
  { id: 'ancla', nombre: 'Ancla', tags: ['puerto', 'mar', 'barco'], d: [
    circle(12, 5, 2), 'M12 7v13', 'M7 11h10', 'M4 14c0 4 4 6 8 6s8-2 8-6', 'M4 14l-1.5 2M20 14l1.5 2'] },
  { id: 'templo', nombre: 'Templo', tags: ['iglesia', 'santuario', 'dios'], d: [
    'M3 9l9-6 9 6Z', 'M5 9v10M9.5 9v10M14.5 9v10M19 9v10', 'M3 21h18M4 19h16'] },
  { id: 'posada', nombre: 'Posada', tags: ['taberna', 'jarra', 'descanso'], d: [
    'M5 6h10v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2Z', 'M15 9h2.5a2.5 2.5 0 0 1 0 6H15', 'M8 3c0 1 1 1 1 2M11.5 3c0 1 1 1 1 2'] },
  { id: 'torre', nombre: 'Torre', tags: ['atalaya', 'vigia', 'mago'], d: [
    'M8 21V8H6V4h2.5v2h2V4h3v2h2V4H18v4h-2v13Z', 'M11 21v-5a1 1 0 0 1 2 0v5', 'M11 11h2'] },
  { id: 'faro', nombre: 'Faro', tags: ['costa', 'luz', 'mar'], d: [
    'M9 21 10.5 8h3L15 21Z', 'M10 8l2-4 2 4', 'M7 21h10', 'M10.2 12h3.6M9.8 16h4.4', 'M5 5l3 1M19 5l-3 1'] },
  { id: 'ruinas', nombre: 'Ruinas', tags: ['columnas', 'antiguo', 'derruido'], d: [
    'M4 21v-9l2-2V8h3v13', 'M13 21V9h3v12', 'M16 21v-7l3-2v9', 'M3 21h18'] },
  { id: 'mina', nombre: 'Mina', tags: ['pico', 'minerales', 'excavar'], d: [
    'M12 6v15', 'M3 10c3-6 15-6 18 0', 'M3 10l2.5 1.5M21 10l-2.5 1.5'] },
  { id: 'bosque', nombre: 'Bosque', tags: ['arbol', 'selva', 'naturaleza'], d: [
    'M12 3 6 12h3l-4 6h14l-4-6h3Z', 'M12 18v3'] },
  { id: 'montana', nombre: 'Montaña', tags: ['monte', 'pico', 'sierra'], d: [
    'M2 20 9 7l4 7 3-4 6 10Z', 'M9 7 7.5 10l1.5-.5 1.5 1.5'] },
  { id: 'gema', nombre: 'Gema', tags: ['joya', 'cristal', 'tesoro', 'diamante'], d: [
    'M12 21 3 9l4-5h10l4 5Z', 'M3 9h18', 'M9 4l3 5 3-5', 'M12 9v12'] },
  { id: 'calavera', nombre: 'Calavera', tags: ['muerte', 'peligro', 'tumba'], d: [
    'M12 3C7 3 4.5 6.5 4.5 10c0 3 1.5 4.5 3 5.5V19h9v-3.5c1.5-1 3-2.5 3-5.5 0-3.5-2.5-7-7.5-7Z',
    'M9.5 19v-3M12 19v-3M14.5 19v-3', circle(9, 10, 1.5), circle(15, 10, 1.5)] },
  { id: 'espadas', nombre: 'Espadas', tags: ['batalla', 'guerra', 'combate'], d: [
    'M5 5l12 12M15 19l4-4M3 21l3-3', 'M19 5 7 17M5 19l4-4M21 21l-3-3'] },
  { id: 'estrella', nombre: 'Estrella', tags: ['favorito', 'importante', 'destacado'], d: [
    'M12 3l2.6 6 6.4.6-4.8 4.3 1.5 6.3L12 16.9l-5.7 3.3 1.5-6.3L3 9.6 9.4 9Z'] },
  { id: 'fuego', nombre: 'Hoguera', tags: ['llama', 'fuego', 'campamento', 'brasas'], d: [
    'M12 3c1 4 6 6 6 11.5a6 6 0 0 1-12 0C6 11.5 8 10 9 8c.5 2 1.5 2.5 2 2.5.5-2.5 0-5 1-7.5Z',
    'M12 20c-2 0-3-1.5-3-3 0-1.5 1.5-2.5 3-4 1.5 1.5 3 2.5 3 4 0 1.5-1 3-3 3Z'] },
  { id: 'pregunta', nombre: 'Misterio', tags: ['duda', 'incognita', 'desconocido'], d: [
    'M8.5 8.5a3.5 3.5 0 1 1 4.5 3.5c-1 .5-1 1.5-1 3', circle(12, 19, 0.6)] },
];

/** Identificador del icono por defecto. */
export const DEFAULT_ICON_ID = 'pin';
