// @ts-check
// src/features/sharing/summarizePlayerExport.js

/**
 * Resumen de qué se compartirá y qué se queda fuera, para confirmarlo antes de exportar.
 * @param {import('../../types').UserData} userData
 */
export function summarizePlayerExport(userData) {
  const shared = userData.markers.filter((m) => m.visibilidad === 'todos');
  const sharedLabels = userData.labels.custom.filter((c) => !c.visibilidad || c.visibilidad === 'todos');
  return {
    markerNames: shared.map((m) => m.nombre),
    markersShared: shared.length,
    markersExcluded: userData.markers.length - shared.length,
    labelsShared: sharedLabels.length,
    labelsExcluded: userData.labels.custom.length - sharedLabels.length,
    privateNotes: userData.markers.filter((m) => m.notaDm.trim()).length,
    routeExcluded: userData.route.length > 0,
  };
}
