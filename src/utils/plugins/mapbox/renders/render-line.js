import * as defaults from "@/components/overlay/SymbolStyler/support/defaults.js";
import { generateLayerStyle } from "./index.js";

export function generateLineSymbolLayers(layer, feature) {
  const layerGroup = [];
  const lineLayer = JSON.parse(JSON.stringify(layer));
  const id = `draw-render-${feature.properties.sketch}-${feature.id}`;
  lineLayer.id = id;
  lineLayer.type = "line";
  lineLayer.layout = {
    "line-cap": "round",
    "line-join": "round",
  };
  lineLayer.paint = {
    "line-color": defaults.DefaultPolygonOutline,
    "line-width": defaults.DefaultPolygonOutlineWidth,
  };
  layerGroup.push({
    id,
    layer: lineLayer,
  });

  return layerGroup;
}

export function updateLineSymbolPaint(map, feature, symbolSettings) {
  const symbolLayers = generateLayerStyle(feature);

  const lineLayer = symbolLayers.find((symbol) => symbol.layer.type === "line");
  const lineLayerOnMap = map.getLayer(lineLayer.id);
  if (lineLayerOnMap) {
    map.setPaintProperty(
      lineLayer.id,
      "line-color",
      symbolSettings.strokeColor,
    );
    map.setPaintProperty(
      lineLayer.id,
      "line-width",
      symbolSettings.strokeWidth,
    );
  }
}
