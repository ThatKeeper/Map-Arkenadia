// src/config/index.js
export { BIOME_NAMES, BIOME_LIST_ORDER } from './biomes';
export {
  WORLD_WIDTH,
  WORLD_HEIGHT,
  GRID_WIDTH,
  GRID_HEIGHT,
  TAU,
  BIOME_PAINT_ORDER,
  LOD_SCALE_THRESHOLDS,
  LOD_SPACING,
  LOD_STROKE_SCALE,
  TILE_FADE_MS,
  OVERVIEW_RESOLUTION,
  OVERVIEW_MARGIN,
  MINI_WIDTH,
  MINI_HEIGHT,
} from './constants';
export { INK_ICONS, DEFAULT_ICON_ID } from './inkIcons';
export {
  DEFAULT_CATEGORIES,
  FALLBACK_CATEGORY_ID,
  LABEL_STYLES,
  LEGACY_ICON_MAP,
  VISIBILITIES,
} from './markerCategories';
export { RAW_LABELS, LABELS, LABEL_FONT_SIZES } from './labels';
export { CLASS_MAP_IMAGE } from './mapImage';
export { PALETTES } from './palettes';
export { PRESETS, TIERS, OPTION_KEYS, AUTO_DESC } from './presets';
export {
  DEFAULT_EXPORT_OPTIONS,
  EXPORT_FACTORS,
  EXPORT_FULL_BASE_ZOOM,
  EXPORT_GRID_STEP,
  EXPORT_MAX_PIXELS_DESKTOP,
  EXPORT_MAX_PIXELS_MOBILE,
  EXPORT_STRIP_PIXELS,
} from './exportOptions';
export {
  DEFAULT_ROLE,
  PIN_MAX_LENGTH,
  PIN_MIN_LENGTH,
  PIN_WARNING,
  PLAYER_FILE_FORMAT,
  PLAYER_FILE_VERSION,
  ROLES,
} from './roles';
export { SCHEMA_VERSION } from './schema';
export { DEFAULT_SHORTCUTS } from './shortcuts';
export { STAINS } from './stains';
export { DISTANCE_UNITS } from './units';
