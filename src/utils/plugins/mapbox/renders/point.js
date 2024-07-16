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
}

export function updatePointLayer({ map, mode, features }) {
  // const symbolLayers = generateLayerStyle(feature);
  // console.log(symbolLayers, "--symbolLayers");
  // const fillLayer = symbolLayers.find((symbol) =>
  //   symbol.layer.id.startsWith("draw-render-point-inner-"),
  // );
  // const strokeLayer = symbolLayers.find((symbol) =>
  //   symbol.layer.id.startsWith("draw-render-point-outer-"),
  // );
  // const fillLayerOnMap = map.getLayer(fillLayer.id);
  // if (fillLayerOnMap) {
  //   map.setPaintProperty(fillLayer.id, "circle-color", symbolSettings.color);
  //   map.setPaintProperty(fillLayer.id, "circle-radius", symbolSettings.size);
  // }
  // const strokeLayerOnMap = map.getLayer(strokeLayer.id);
  // if (strokeLayerOnMap) {
  //   map.setPaintProperty(
  //     strokeLayer.id,
  //     "circle-color",
  //     symbolSettings.strokeColor,
  //   );
  //   map.setPaintProperty(
  //     strokeLayer.id,
  //     "circle-radius",
  //     symbolSettings.strokeWidth + symbolSettings.size,
  //   );
  // }
}
