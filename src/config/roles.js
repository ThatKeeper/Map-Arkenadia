// src/config/roles.js

/** Roles de la aplicación. El DM ve todo; el jugador solo lo permitido. */
export const ROLES = ['dm', 'jugador'];

/** Rol por defecto la primera vez. */
export const DEFAULT_ROLE = 'dm';

/** Identificador y versión del formato del archivo para jugadores. */
export const PLAYER_FILE_FORMAT = 'mapa-jugadores';
export const PLAYER_FILE_VERSION = 1;

/** Longitud permitida del PIN (solo cifras). */
export const PIN_MIN_LENGTH = 4;
export const PIN_MAX_LENGTH = 8;

/** Aviso que debe acompañar siempre a las opciones de PIN. */
export const PIN_WARNING =
  'Protección ligera en el navegador, no seguridad real: quien tenga el archivo de datos o abra las herramientas de desarrollo puede leerlo todo.';
