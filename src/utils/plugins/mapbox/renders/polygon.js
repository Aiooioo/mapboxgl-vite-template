import * as DrawUtits from "./conf";

export const PLG_MODES = [
  "draw_attack_arrow",
  "draw_double_arrow",
  "draw_three_arrow",
  "draw_circle",
  "draw_ellipse",
  "draw_rectangle",
  "draw_polygon",
];

export function generatePolygonLayer({ map, mode, features }) {
  const fillLayer = {
    id: `${mode}-${features[0].id}-fill`,
    type: "fill",
    source: {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features,
      },
    },
    paint: {
      "fill-color": DrawUtits.DefaultPolygonFill,
      "fill-opacity": DrawUtits.DefaultPolygonFillOpacity,
      "fill-outline-color": DrawUtits.DefaultPolygonOutline,
    },
  };

  const strokeLayer = {
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

  map.addLayer(fillLayer);
  map.addLayer(strokeLayer);
}

export function updatePolygonLayer({ map, mode, features }) {
  // const fillLayer = symbolLayers.find((symbol) => symbol.layer.type === "fill");
  // const fillLayerOnMap = map.getLayer(fillLayer.id);
  // if (fillLayerOnMap) {
  //   map.setPaintProperty(fillLayer.id, "fill-color", symbolSettings.fillColor);
  //   map.setPaintProperty(
  //     fillLayer.id,
  //     "fill-opacity",
  //     symbolSettings.fillOpacity
  //   );
  // }
  // const strokeLayer = symbolLayers.find(
  //   (symbol) => symbol.layer.type === "line"
  // );
  // const strokeLayerOnMap = map.getLayer(strokeLayer.id);
  // if (strokeLayerOnMap) {
  //   map.setPaintProperty(
  //     strokeLayer.id,
  //     "line-color",
  //     symbolSettings.strokeColor
  //   );
  //   map.setPaintProperty(
  //     strokeLayer.id,
  //     "line-width",
  //     symbolSettings.strokeWidth
  //   );
  // }
}
