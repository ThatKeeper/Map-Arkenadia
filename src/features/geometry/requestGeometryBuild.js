// src/features/geometry/requestGeometryBuild.js
import { needsGeometry } from './needsGeometry';
import { onBuildReady } from './onBuildReady';
import { reportBuildError } from './reportBuildError';
import { storeGeometryResult } from './storeGeometryResult';
import { runCoreTask } from '@/services/worker';
import { build, session, workerState } from '@/state';
import { requestRedraw } from '@/ui/loop';

/** Pide (en cola) la geometría o los detalles que falten para la calidad actual. */
export function requestGeometryBuild() {
  const tok = ++build.buildToken,
    needGeo = needsGeometry(),
    key = session.quality.lod + '|' + session.quality.dens;
  if (!needGeo && key === build.itemsKey) return;
  const wantGeo = session.quality.geo;
  workerState.queue = workerState.queue
    .then(async () => {
      if (tok !== build.buildToken) return;
      const r = await runCoreTask({
        cmd: needGeo ? 'geo' : 'items',
        geoQ: wantGeo,
        lod: session.quality.lod,
        dens: session.quality.dens,
      });
      if (tok !== build.buildToken) return;
      if (r.geo) storeGeometryResult(r, wantGeo);
      build.items = r.items;
      build.itemsKey = key;
      await onBuildReady();
      requestRedraw();
    })
    .catch(reportBuildError);
}
