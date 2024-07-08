import { toRaw } from "vue";
import * as turf from "@turf/turf";
import { LAYER_CHECK_POINT } from "../../CheckPoints/useCheckPointService.js";

export const DATA_SOURCE_ROUTE_LINE = "data-source-route-line";
export const LAYER_ROUTE_LINE = "layer-route-line";

let speedFactor = 30;
let animation;
let startTime = 0;
let progress = 0;
let resetTime = false;

export function clearAndStopAnimation() {}

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
    progress = timestamp - startTime;
  }

  animation = requestAnimationFrame(doAnimate);
}

export function animateLineSymbol(map, startPoint, endPoint, checkPoints) {
  clearAndStopAnimation();

  const line = turf.lineString([
    startPoint.geometry.coordinates,
    ...checkPoints.map((cp) => toRaw(cp.geometry.coordinates)),
    endPoint.geometry.coordinates,
  ]);

  startTime = performance.now();

  doAnimate();

  const layerSrc = map.getSource(DATA_SOURCE_ROUTE_LINE);
  if (layerSrc) {
    layerSrc.setData({
      type: "FeatureCollection",
      features: [line],
    });
  }
}
