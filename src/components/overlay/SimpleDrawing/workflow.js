import { of, merge, combineLatestWith } from "rxjs";
import { tap, switchMap, filter } from "rxjs/operators";
import {
  ensureSketchFeatureSourceData,
  ensureDrawingFeatureLayerData,
  render2Map,
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
        ensureDrawingFeatureLayerData(map, feature, featureProps);
      }),
      combineLatestWith($symbol),
    )
    .subscribe(([sketch, feature, symbol]) => {
      render2Map(sketch, feature, symbol);
    });
}
