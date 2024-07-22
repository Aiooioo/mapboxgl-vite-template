import { minToMs, secToMs } from "@/utils/time-utils.js";

export const systemConst = {
  sessionTimeoutHours: 48,
};

export const appTimingConst = {
  sessionAuthPollMs: minToMs(30),
  sessionRestorePollMs: secToMs(5),
};

export const DefaultLayerTypeGeoJSON = 'layers/v1/geojson';
export const EmptyGeoJSONFeature = {
  type: 'Feature',
  properties: {},
  geometry: {}
}

export const DefaultStyleVariables = {
  circleFillColor: 'rgba(41,128,185,1)',
  circleStrokeColor: 'rgba(255,255,255,1)',
  circleStrokeWidth: 1,
  circleRadius: 6.5,
  markerFillColor: 'rgba(231,76,60,1)',
  markerWidth: 10,
  fillColor: 'rgba(85,85,85,0.25)',
  strokeColor: 'rgba(0,0,0,1)',
  strokeDasharray: [],
  strokeWidth: 3,
  textAlignment: 'auto',
  textColor: 'rgba(34,34,34,1)',
  textFont: 'Open Sans Semibold',
  textSize: 14,
}
