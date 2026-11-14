// src/features/quality/detectTier.js

/** Elige un nivel de calidad según memoria, núcleos y tipo de puntero. */
export function detectTier() {
  const mem = navigator.deviceMemory || 4,
    cores = navigator.hardwareConcurrency || 4,
    coarse = matchMedia('(pointer:coarse)').matches;
  if (mem <= 2 || cores <= 2) return 'baja';
  if (coarse || mem <= 4 || cores <= 4) return 'media';
  return 'alta';
}
