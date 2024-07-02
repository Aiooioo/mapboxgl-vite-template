import { of, merge, combineLatestWith } from "rxjs";
import { tap, switchMap, filter } from "rxjs/operators";
import {
  ensureSketchFeatureSourceData,
  ensureDrawingFeatureLayerData,
  render2Map,
  ensureDrawingStylerLayerData,
} from "./renders";

export function hasNextStep(ctx) {
  return true;
}

export default function ($sketch, $feature, $symbol) {
  $sketch
    .pipe(
      filter((x) => x != null),
      tap((sketch) => {
        const map = sketch.map;
        const feature = sketch.feature;
        ensureSketchFeatureSourceData(map, feature);
      }),
      combineLatestWith($feature),
      tap(([{ map, feature }, featureProps]) => {
        if (featureProps && !featureProps.noop) {
          ensureDrawingFeatureLayerData(map, feature, featureProps);
        }
      }),
      combineLatestWith($symbol),
      tap(([[{ map, feature }, _], symbol]) => {
        ensureDrawingStylerLayerData(map, feature, symbol);
      }),
    )
    .subscribe(([[{ map, feature }, _], symbol]) => {
      render2Map(map, feature, symbol);
    });
}
