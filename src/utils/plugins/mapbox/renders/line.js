import * as DrawUtits from "./conf";

export const LINE_MODES = ["draw_line_string"];

export function generateLineLayer({ map, mode, features }) {
  const lineLayer = {
    id: `${mode}-${features[0].id}-line`,
    type: "line",
    source: {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features,
      },
    },
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": DrawUtits.DefaultPolygonOutline,
      "line-width": DrawUtits.DefaultPolygonOutlineWidth,
    },
  };

  map.addLayer(lineLayer);
}

export function updateLineLayer({ map, mode, features }) {
  // const symbolLayers = generateLayerStyle(feature);
  // const lineLayer = symbolLayers.find((symbol) => symbol.layer.type === "line");
  // const lineLayerOnMap = map.getLayer(lineLayer.id);
  // if (lineLayerOnMap) {
  //   map.setPaintProperty(
  //     lineLayer.id,
  //     "line-color",
  //     symbolSettings.strokeColor,
  //   );
  //   map.setPaintProperty(
  //     lineLayer.id,
  //     "line-width",
  //     symbolSettings.strokeWidth,
  //   );
  // }
}
