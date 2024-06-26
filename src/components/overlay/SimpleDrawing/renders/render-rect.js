import { generateLayerStyle } from './index.js'
import * as defaults from "@/components/overlay/SymbolStyler/support/defaults.js";

export function generateFillSymbolLayers(layer, feature) {
  const layerGroup = [];
  const fillLayer = JSON.parse(JSON.stringify(layer));
  const fillId = `draw-render-${feature.properties.sketch}-fill-${feature.id}`;
  fillLayer.id = fillId;
  fillLayer.type = "fill";
  fillLayer.paint = {
    "fill-color": defaults.DefaultPolygonFill,
    "fill-opacity": defaults.DefaultPolygonFillOpacity,
    "fill-outline-color": defaults.DefaultPolygonOutline,
  };

  layerGroup.push({
    id: fillId,
    layer: fillLayer,
  });

  const strokeLayer = JSON.parse(JSON.stringify(layer));
  const strokeId = `draw-render-${feature.properties.sketch}-stroke-${feature.id}`;
  strokeLayer.id = strokeId;
  strokeLayer.type = "line";
  strokeLayer.layout = {
    "line-cap": "round",
    "line-join": "round",
  };
  strokeLayer.paint = {
    "line-color": defaults.DefaultPolygonOutline,
    "line-width": defaults.DefaultPolygonOutlineWidth,
  };

  layerGroup.push({
    id: strokeId,
    layer: strokeLayer,
  });

  return layerGroup;
}

export function updateFillSymbolPaint(map, feature, symbolSettings) {
  const symbolLayers = generateLayerStyle(feature);

  const fillLayer = symbolLayers.find((symbol) => symbol.layer.type === "fill");
  const fillLayerOnMap = map.getLayer(fillLayer.id);
  if (fillLayerOnMap) {
    map.setPaintProperty(fillLayer.id, "fill-color", symbolSettings.fillColor);
    map.setPaintProperty(
      fillLayer.id,
      "fill-opacity",
      symbolSettings.fillOpacity,
    );
  }

  const strokeLayer = symbolLayers.find(
    (symbol) => symbol.layer.type === "line",
  );
  const strokeLayerOnMap = map.getLayer(strokeLayer.id);
  if (strokeLayerOnMap) {
    map.setPaintProperty(
      strokeLayer.id,
      "line-color",
      symbolSettings.strokeColor,
    );
    map.setPaintProperty(
      strokeLayer.id,
      "line-width",
      symbolSettings.strokeWidth,
    );
  }
}
