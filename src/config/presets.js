// src/config/presets.js

/** Niveles de calidad (alta, media, baja) con sus parámetros y descripción. */
export const PRESETS = {
  alta: {
    res: 2,
    tile: 512,
    mb: 160,
    geo: 2,
    lod: 3,
    dens: 1,
    maxZ: 8,
    details: true,
    labels: true,
    paper: true,
    fx: true,
    smooth: true,
    preload: true,
    premax: false,
    desc: 'Máxima nitidez. Para pantallas retina y equipos potentes.',
  },
  media: {
    res: 1.5,
    tile: 512,
    mb: 96,
    geo: 2,
    lod: 3,
    dens: 0.6,
    maxZ: 8,
    details: true,
    labels: true,
    paper: true,
    fx: true,
    smooth: true,
    preload: true,
    premax: false,
    desc: 'Equilibrio entre nitidez y fluidez. Recomendada en móviles y portátiles.',
  },
  baja: {
    res: 1,
    tile: 256,
    mb: 40,
    geo: 1,
    lod: 2,
    dens: 0.4,
    maxZ: 6,
    details: true,
    labels: true,
    paper: false,
    fx: false,
    smooth: true,
    preload: true,
    premax: false,
    desc: 'Máxima fluidez para móviles y equipos modestos. Menos detalle y zoom máx. reducido.',
  },
};

/** Niveles de calidad ordenados de mayor a menor. */
export const TIERS = ['alta', 'media', 'baja'];

/** Opciones booleanas que dependen del nivel de calidad. */
export const OPTION_KEYS = ['details', 'labels', 'paper', 'fx', 'smooth', 'preload', 'premax'];

/** Descripción del modo Auto. */
export const AUTO_DESC = 'Elige según tu dispositivo y baja la calidad sola si nota tirones.';
