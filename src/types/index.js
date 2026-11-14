// @ts-check
// src/types/index.js
// Solo definiciones de tipos (JSDoc @typedef). No contiene código en ejecución.
// Uso en otros archivos: /** @type {import('@/types').Marker} */  (o ruta relativa)

/**
 * Marcador del mapa (esquema v1; la Fase 1 lo ampliará a v2).
 * @typedef {Object} Marker
 * @property {number} id Identificador único dentro de `userData`
 * @property {number} x Posición X en el mundo (0..WORLD_WIDTH)
 * @property {number} y Posición Y en el mundo (0..WORLD_HEIGHT)
 * @property {string} n Nombre (máx. 40 caracteres)
 * @property {number} i Índice del icono en `MARKER_ICONS`
 * @property {string} t Nota (máx. 200 caracteres)
 */

/**
 * Punto de la ruta; `n` es el nombre opcional de la parada.
 * @typedef {Object} RoutePoint
 * @property {number} x
 * @property {number} y
 * @property {string} n
 */

/**
 * Ruta con nombre (Fase 3: rutas múltiples calculadas sobre el terreno).
 * @typedef {Object} Route
 * @property {number} id
 * @property {string} nombre
 * @property {string} color
 * @property {'pie'|'caballo'|'barco'|'vuelo'} transporte
 * @property {boolean} visible
 * @property {RoutePoint[]} paradas
 */

/**
 * Territorio poligonal (Fase 3).
 * @typedef {Object} Territory
 * @property {number} id
 * @property {string} nombre
 * @property {string} color
 * @property {number} opacidad 0..1
 * @property {Array<[number, number]>} vertices Puntos del polígono en coordenadas del mundo
 * @property {'todos'|'dm'|'mio'} visibilidad
 */

/**
 * Trazo de dibujo a mano (Fase 3), guardado como vectores en coordenadas del mundo.
 * @typedef {Object} Stroke
 * @property {number} id
 * @property {string} color
 * @property {number} grosor
 * @property {number} opacidad 0..1
 * @property {number[]} puntos Lista plana [x, y, x, y…] (opcionalmente con presión)
 * @property {string} capa Nombre de la capa a la que pertenece
 * @property {'todos'|'dm'|'mio'} visibilidad
 */

/**
 * Estado de la niebla de guerra (Fase 3): se guarda en IndexedDB, no en localStorage.
 * @typedef {Object} FogState
 * @property {boolean} activa
 * @property {number} ancho Ancho de la cuadrícula de niebla
 * @property {number} alto Alto de la cuadrícula de niebla
 * @property {Uint8Array} celdas 0 = oculto, 255 = revelado
 */

/**
 * Datos del usuario guardados en `localStorage` (`mapaDatos`) y exportables a JSON.
 * @typedef {Object} UserData
 * @property {number} schemaVersion Versión del esquema (ver `SCHEMA_VERSION`)
 * @property {Marker[]} markers
 * @property {RoutePoint[]} route
 * @property {number} scale Unidades de distancia por unidad de mapa
 * @property {string} unit Unidad de distancia (ver `DISTANCE_UNITS`)
 * @property {number} nid Siguiente id libre para marcadores
 */

/**
 * Opciones de vista (`mapaVista`).
 * @typedef {Object} ViewOptions
 * @property {boolean} mini
 * @property {boolean} scalebar
 * @property {boolean} markers
 * @property {boolean} hover
 */

/**
 * Configuración de calidad guardada (`mapaCfg`).
 * @typedef {Object} Settings
 * @property {'alta'|'media'|'baja'|'auto'} q
 * @property {boolean} stats
 * @property {boolean} [details]
 * @property {boolean} [labels]
 * @property {boolean} [paper]
 * @property {boolean} [fx]
 * @property {boolean} [smooth]
 * @property {boolean} [preload]
 * @property {boolean} [premax]
 */

/**
 * Parámetros de calidad efectivos (preset + opciones del usuario + cálculo de memoria).
 * @typedef {Object} Quality
 * @property {number} res Resolución máxima respecto a los píxeles CSS
 * @property {number} dpr Densidad de píxeles efectiva
 * @property {number} tile Lado de una tesela (px)
 * @property {number} maxTiles Máximo de teselas en caché
 * @property {number} geo Calidad de geometría
 * @property {number} lod Nivel de detalle máximo
 * @property {number} dens Densidad de detalles
 * @property {number} maxZ Zoom máximo
 * @property {boolean} details
 * @property {boolean} labels
 * @property {boolean} paper
 * @property {boolean} fx
 * @property {boolean} smooth
 * @property {boolean} preload
 * @property {boolean} premax
 */

/**
 * Estado de la sesión actual.
 * @typedef {Object} Session
 * @property {Settings} settings
 * @property {'alta'|'media'|'baja'} tier Nivel de calidad en uso (null hasta `loadSettings`)
 * @property {Quality} quality Calidad efectiva (null hasta `computeQuality`)
 * @property {number|null} highlightedBiome
 * @property {0|1} paletteMode 0 = pergamino, 1 = color
 * @property {UserData} userData Datos del usuario (null hasta `loadUserData`)
 * @property {ViewOptions} viewOptions (null hasta `loadUserData`)
 * @property {'marker'|'route'|null} activeTool
 * @property {number|null} selectedMarkerId
 */

export {};
