import Draw from "@mapbox/mapbox-gl-draw";

const COLD = Draw.constants.sources.COLD;
const HOT = Draw.constants.sources.HOT;

export const DrawPatchTextSource = "mapbox-gl-draw-text";

export function unpackMapboxDraw(map) {
  map.removeLayer(`gl-draw-text-active.${COLD}`);
  map.removeSource(DrawPatchTextSource);
}

export function patchMapboxDraw(map) {
  map.addSource(DrawPatchTextSource, {
    type: "geojson",
    data: {
      type: Draw.constants.geojsonTypes.FEATURE_COLLECTION,
      features: [],
    },
  });

  map.addLayer({
    id: `gl-draw-text-active.${COLD}`,
    source: DrawPatchTextSource,
    type: "symbol",
    layout: {
      "text-field": ["get", "text"],
      "text-size": 16,
    },
    paint: {
      "text-color": "#D20C0C",
      "text-halo-color": "#fff",
      "text-halo-width": 2,
    },
  });
}
