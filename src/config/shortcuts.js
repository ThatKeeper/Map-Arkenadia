// src/config/shortcuts.js

/**
 * Atajos por defecto. `key` es `KeyboardEvent.key` en minúsculas; `ctrl` vale para Ctrl o Cmd.
 * `disponible: false` marca funciones de fases futuras (hoy solo emiten el evento `shortcut:<id>`).
 */
export const DEFAULT_SHORTCUTS = [
  { id: 'toolMarker', key: 'm', nombre: 'Colocar marcador', grupo: 'Herramientas' },
  { id: 'toolRoute', key: 'r', nombre: 'Trazar ruta', grupo: 'Herramientas' },
  { id: 'toolLabels', key: 'e', nombre: 'Editar etiquetas', grupo: 'Herramientas' },
  { id: 'toolDraw', key: 'd', nombre: 'Dibujar a mano', grupo: 'Herramientas', disponible: false },
  { id: 'toolTerritory', key: 't', nombre: 'Territorios', grupo: 'Herramientas', disponible: false },
  { id: 'zoomIn', key: '+', nombre: 'Acercar', grupo: 'Vista' },
  { id: 'zoomOut', key: '-', nombre: 'Alejar', grupo: 'Vista' },
  { id: 'fitAll', key: '0', nombre: 'Ver todo el mapa', grupo: 'Vista' },
  { id: 'search', key: '/', nombre: 'Buscar', grupo: 'Vista' },
  { id: 'searchCtrl', key: 'k', ctrl: true, nombre: 'Buscar (alternativo)', grupo: 'Vista' },
  { id: 'togglePanel', key: 'p', nombre: 'Mostrar u ocultar paneles', grupo: 'Vista' },
  { id: 'toggleDm', key: 'd', shift: true, nombre: 'Modo DM / jugador', grupo: 'Vista', disponible: false },
  { id: 'toggleFog', key: 'f', nombre: 'Niebla de guerra', grupo: 'Vista', disponible: false },
  { id: 'undo', key: 'z', ctrl: true, nombre: 'Deshacer', grupo: 'Edición' },
  { id: 'redo', key: 'z', ctrl: true, shift: true, nombre: 'Rehacer', grupo: 'Edición' },
  { id: 'redoAlt', key: 'y', ctrl: true, nombre: 'Rehacer (alternativo)', grupo: 'Edición' },
  { id: 'save', key: 's', ctrl: true, nombre: 'Guardar / exportar datos', grupo: 'Edición' },
  { id: 'help', key: '?', nombre: 'Ayuda de atajos', grupo: 'Ayuda' },
];
