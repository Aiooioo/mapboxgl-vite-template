import * as DrawUtits from "./conf";

export const PT_MODES = ["draw_point"];

export function generatePointLayer({ map, mode, features }) {
  const circleLayer = {
    id: `${mode}-${features[0].id}-circle`,
    type: "circle",
    source: {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features,
      },
    },
    paint: {
      "circle-radius": DrawUtits.DefaultPointSize,
      "circle-color": DrawUtits.DefaultPointColor,
    },
  };

  map.addLayer(circleLayer);

  return [circleLayer.id];
}

export function updatePointLayer({ map, layerIds, settings }) {
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
