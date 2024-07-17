import * as DrawUtits from "./conf";

export const TEXT_MODES = ["draw_text"];

export function generateTextLayer({ map, mode, features }) {
  const textLayer = {
    id: `${mode}-${features[0].id}-symbol`,
    type: "symbol",
    source: {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features,
      },
    },
    layout: {
      // "text-field": ["get", "text"],
      "text-size": DrawUtits.DefaultTextFontSize,
      "text-rotate": DrawUtits.DefaultTextRotateDegree,
      "text-field": "{text}",
      // "text-font": ["Noto Sans Regular"],
    },
    paint: {
      "text-color": DrawUtits.DefaultTextFillColor,
      "text-halo-color": DrawUtits.DefaultTextHaloColor,
      "text-halo-width": DrawUtits.DefaultTextHaloSize,
    },
  };

  // const circleLayer = {
  //   id: `${mode}-${features[0].id}-circle`,
  //   type: "circle",
  //   source: {
  //     type: "geojson",
  //     data: {
  //       type: "FeatureCollection",
  //       features,
  //     },
  //   },
  //   filter: ["all", ["==", "invalid", "true"]],
  //   paint: {
  //     "circle-radius": 5, // DrawUtits.DefaultPointSize,
  //     "circle-color": "#fbb03b", // DrawUtits.DefaultPointColor,
  //   },
  // };

  map.addLayer(textLayer);
  // map.addLayer(circleLayer);

  return [textLayer.id];
}

export function updateTextLayer({ map, mode, features }) {
  // if (!symbolSettings) return;
  // const symbolLayers = generateLayerStyle(feature);
  // const textLayer = symbolLayers.find(
  //   (symbol) => symbol.layer.type === "symbol",
  // );
  // const textLayerOnMap = map.getLayer(textLayer.id);
  // if (textLayerOnMap) {
  //   map.setPaintProperty(textLayer.id, "text-color", symbolSettings.color);
  //   map.setPaintProperty(
  //     textLayer.id,
  //     "text-halo-color",
  //     symbolSettings.haloColor,
  //   );
  //   map.setPaintProperty(
  //     textLayer.id,
  //     "text-halo-width",
  //     symbolSettings.haloSize,
  //   );
  //   map.setLayoutProperty(textLayer.id, "text-rotate", symbolSettings.rotate);
  //   map.setLayoutProperty(textLayer.id, "text-size", symbolSettings.fontSize);
  // }
}
