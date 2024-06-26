import { merge, combineLatest } from "rxjs";
import { tap, combineLatestWith } from "rxjs/operators";
import {
  ensureSketchFeatureSourceData,
  ensureDrawingFeatureLayerData,
  render2Map,
} from "./renders";

export function hasNextStep(ctx) {
  return true;
}

export default function ($sketch, $feature, $symbol) {
  combineLatest($sketch, $feature, $symbol)
    .pipe(
      tap(([{ map, feature }]) => {
        ensureSketchFeatureSourceData(map, feature);

        ensureDrawingFeatureLayerData(map, feature);
      }),
    )
    .subscribe(([sketch, feature, symbol]) => {
      render2Map(sketch, feature, symbol);
    });
}
