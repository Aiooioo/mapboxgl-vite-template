import * as defaults from "@/components/overlay/SymbolStyler/support/defaults.js";
import { generateLayerStyle } from "./index.js";

export function generatePointSymbolLayers(layer, feature) {
  const layerGroup = [];

  const strokeLayer = JSON.parse(JSON.stringify(layer));
  const strokeId = `draw-render-${feature.properties.sketch}-outer-${feature.id}`;
  strokeLayer.id = strokeId;
  strokeLayer.type = "circle";

  strokeLayer.paint = {
    "circle-radius":
      defaults.DefaultPointSize + defaults.DefaultPointStrokeWidth,
    "circle-color": defaults.DefaultPointStroke,
  };

  layerGroup.push({
    id: strokeId,
    layer: strokeLayer,
  });

  const pointLayer = JSON.parse(JSON.stringify(layer));
  const id = `draw-render-${feature.properties.sketch}-inner-${feature.id}`;
  pointLayer.id = id;
  pointLayer.type = "circle";

  pointLayer.paint = {
    "circle-radius": defaults.DefaultPointSize,
    "circle-color": defaults.DefaultPointColor,
  };

  layerGroup.push({
    id,
    layer: pointLayer,
  });

  return layerGroup;
}

export function updatePointSymbolPaint(map, feature, symbolSettings) {
  const symbolLayers = generateLayerStyle(feature);

  const fillLayer = symbolLayers.find((symbol) =>
    symbol.layer.id.startsWith("draw-render-point-inner-"),
  );
  const strokeLayer = symbolLayers.find((symbol) =>
    symbol.layer.id.startsWith("draw-render-point-outer-"),
  );

  const fillLayerOnMap = map.getLayer(fillLayer.id);
  if (fillLayerOnMap) {
    map.setPaintProperty(fillLayer.id, "circle-color", symbolSettings.color);
    map.setPaintProperty(fillLayer.id, "circle-radius", symbolSettings.size);
  }

  const strokeLayerOnMap = map.getLayer(strokeLayer.id);
  if (strokeLayerOnMap) {
    map.setPaintProperty(
      strokeLayer.id,
      "circle-color",
      symbolSettings.strokeColor,
    );
    map.setPaintProperty(
      strokeLayer.id,
      "circle-radius",
      symbolSettings.strokeWidth + symbolSettings.size,
    );
  }
}
