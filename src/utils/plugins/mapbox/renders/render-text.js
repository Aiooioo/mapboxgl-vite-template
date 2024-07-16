import * as defaults from "@/components/overlay/SymbolStyler/support/defaults.js";
import { generateLayerStyle } from "./index.js";

export function generateTextSymbolLayers(layer, feature) {
  const layerGroup = [];
  const id = `draw-render-${feature.properties.sketch}-text-${feature.id}`;
  layer.id = id;
  layer.type = "symbol";
  layer.layout = {
    "text-field": ["get", "text"],
    "text-size": defaults.DefaultTextFontSize,
    "text-rotate": defaults.DefaultTextRotateDegree,
  };
  layer.paint = {
    "text-color": defaults.DefaultTextFillColor,
    "text-halo-color": defaults.DefaultTextHaloColor,
    "text-halo-width": defaults.DefaultTextHaloSize,
  };

  layerGroup.push({
    id,
    layer,
  });

  const invalidId = `draw-render-${feature.properties.sketch}-invalid-${feature.id}`;
  const invalidLayer = JSON.parse(JSON.stringify(layer));
  invalidLayer.id = invalidId;
  invalidLayer.type = "circle";
  invalidLayer.filter = ["all", ["==", "invalid", "true"]];
  invalidLayer.paint = {
    "circle-radius": 5,
    "circle-color": "#fbb03b",
  };
  layerGroup.push({
    id: invalidId,
    layer: invalidLayer,
  });

  return layerGroup;
}

export function updateTextSymbolPaint(map, feature, symbolSettings) {
  if (!symbolSettings) return;

  const symbolLayers = generateLayerStyle(feature);

  const textLayer = symbolLayers.find(
    (symbol) => symbol.layer.type === "symbol",
  );
  const textLayerOnMap = map.getLayer(textLayer.id);
  if (textLayerOnMap) {
    map.setPaintProperty(textLayer.id, "text-color", symbolSettings.color);
    map.setPaintProperty(
      textLayer.id,
      "text-halo-color",
      symbolSettings.haloColor,
    );
    map.setPaintProperty(
      textLayer.id,
      "text-halo-width",
      symbolSettings.haloSize,
    );

    map.setLayoutProperty(textLayer.id, "text-rotate", symbolSettings.rotate);
    map.setLayoutProperty(textLayer.id, "text-size", symbolSettings.fontSize);
  }
}
