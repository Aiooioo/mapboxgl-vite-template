import { toRaw } from "vue";
import * as turf from "@turf/turf";
import { LAYER_CHECK_POINT } from "../../CheckPoints/useCheckPointService.js";

export const DATA_SOURCE_ROUTE_LINE = "data-source-route-line";
export const LAYER_ROUTE_LINE = "layer-route-line";

let speedFactor = 1500;
let animation;
let totalDistance;
let totalLine;
let startTime = 0;
let progress = 0;
let resetTime = false;
let globalMap;

export function clearAndStopAnimation() {
  if (animation) {
    cancelAnimationFrame(animation);
  }

  animation = null;
  totalLine = null;
  totalDistance = null;
  startTime = 0;
  progress = 0;
  resetTime = false;

  globalMap = null;
}

export function prepareAnimationLineSource(map) {
  map.addSource(DATA_SOURCE_ROUTE_LINE, {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [],
    },
  });

  map.addLayer(
    {
      id: LAYER_ROUTE_LINE,
      source: DATA_SOURCE_ROUTE_LINE,
      type: "line",
      layout: {
        "line-cap": "round",
        "line-join": "round",
      },
      paint: {
        "line-color": "#ed6498",
        "line-width": 5,
        "line-opacity": 0.8,
      },
    },
    LAYER_CHECK_POINT,
  );
}

export function clearAnimationLineSource(map) {
  if (map.getLayer(LAYER_ROUTE_LINE)) {
    map.removeLayer(LAYER_ROUTE_LINE);
  }

  if (map.getSource(DATA_SOURCE_ROUTE_LINE)) {
    map.removeSource(DATA_SOURCE_ROUTE_LINE);
  }
}

function doAnimate(timestamp) {
  if (resetTime) {
    startTime = performance.now() - progress;
    resetTime = false;
  } else {
    progress = timestamp ? timestamp - startTime : 0;
  }

  const x = progress / speedFactor;
  if (x <= 1) {
    const len = x * totalDistance;

    if (len > 0) {
      const curr = turf.lineSliceAlong(totalLine, 0, len, {
        units: "kilometers",
      });

      const layerSrc = globalMap.getSource(DATA_SOURCE_ROUTE_LINE);
      if (layerSrc) {
        layerSrc.setData({
          type: "FeatureCollection",
          features: [curr],
        });
      }
    }

    animation = requestAnimationFrame(doAnimate);
  }
}

export function animateLineSymbol(map, startPoint, endPoint, checkPoints) {
  clearAndStopAnimation();

  const line = turf.lineString([
    startPoint.geometry.coordinates,
    ...checkPoints.map((cp) => toRaw(cp.geometry.coordinates)),
    endPoint.geometry.coordinates,
  ]);

  totalLine = line;
  totalDistance = turf.length(line);

  startTime = performance.now();

  globalMap = map;

  doAnimate();
}
