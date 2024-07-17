import { PLG_MODES, generatePolygonLayer } from "./polygon";
import { PT_MODES, generatePointLayer } from "./point";
import { LINE_MODES, generateLineLayer } from "./line";
import { TEXT_MODES, generateTextLayer } from "./text";

export function renderFeatureLayer(params) {
  const { mode } = params;

  let layerIds = [];

  if (PT_MODES.includes(mode)) {
    layerIds = generatePointLayer(params);
  }

  if (LINE_MODES.includes(mode)) {
    layerIds = generateLineLayer(params);
  }

  if (PLG_MODES.includes(mode)) {
    layerIds = generatePolygonLayer(params);
  }

  if (TEXT_MODES.includes(mode)) {
    layerIds = generateTextLayer(params);
  }

  return layerIds;
}

export function updateFeatureLayer({ map, layerIds, settings }) {
  layerIds.forEach((layerId) => {
    Object.entries(settings).forEach(([key, value]) => {
      map.setPaintProperty(layerId, key, value);
    });

    // map.setPaintProperty(layerId, "circle-color", symbolSettings.color);
    // map.setPaintProperty(fillLayer.id, "circle-color", symbolSettings.color);
    // map.setPaintProperty(fillLayer.id, "circle-radius", symbolSettings.size);
    // map.setPaintProperty(id, "circle-color", strokeColor);
    // map.setPaintProperty(id, "circle-radius", strokeWidth + size);
  });
}

// export function updateFeatureLayer(params) {
//   const { mode, layerId, data } = params;

//   if (PT_MODES.includes(mode)) {
//     updatePointLayer(params);
//   }

//   if (LINE_MODES.includes(mode)) {
//     updateLineLayer(params);
//   }

//   if (PLG_MODES.includes(mode)) {
//     updatePolygonLayer(params);
//   }

//   if (TEXT_MODES.includes(mode)) {
//     updateTextLayer(params);
//   }
// }
