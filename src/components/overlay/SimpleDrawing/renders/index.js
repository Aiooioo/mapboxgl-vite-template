import _ from "lodash";
import Draw from "@mapbox/mapbox-gl-draw";
import {
  generateFillSymbolLayers,
  updateFillSymbolPaint,
} from "./render-rect.js";
import {
  generateTextSymbolLayers,
  updateTextSymbolPaint,
} from "./render-text.js";
import {
  generateLineSymbolLayers,
  updateLineSymbolPaint,
} from "./render-line.js";

function generateLayerSource(feature) {
  return {
    id: `draw-${feature.properties.sketch}-${feature.id}`,
    source: {
      type: "geojson",
      data: {
        type: Draw.constants.geojsonTypes.FEATURE_COLLECTION,
        features: [],
      },
    },
  };
}

export function generateLayerStyle(feature) {
  const sourceCfg = generateLayerSource(feature);

  const layer = {
    id: "",
    source: sourceCfg.id,
    type: "",
    layout: {},
    paint: {},
  };

  switch (feature.properties.sketch) {
    case "rect":
    case "polygon":
    case "circle":
    case "ellipse": {
      return generateFillSymbolLayers(layer, feature);
    }
    case "polyline": {
      return generateLineSymbolLayers(layer, feature);
    }
    case "text": {
      return generateTextSymbolLayers(layer, feature);
    }
  }

  return [];
}

export function ensureSketchFeatureSourceData(map, feature) {
  const { id, source } = generateLayerSource(feature);

  if (!map.getSource(id)) {
    map.addSource(id, source);
  }

  map.getSource(id).setData({
    type: Draw.constants.geojsonTypes.FEATURE_COLLECTION,
    features: [feature],
  });
}

export function ensureDrawingStylerLayerData(map, feature, symbol) {
  const layerGroup = generateLayerStyle(feature);

  _.each(layerGroup, (lyr) => {
    if (!map.getLayer(lyr.id)) {
      map.addLayer(lyr.layer);
    }
  });
}

export function ensureDrawingFeatureLayerData(map, feature, featureProps) {
  if (!featureProps) return;

  const { id } = generateLayerSource(feature);

  const existSource = map.getSource(id);

  feature.properties.remark = featureProps.remark;

  if (feature.properties.sketch === "text") {
    feature.properties.text = featureProps.text;

    if (!feature.properties.text) {
      feature.properties.invalid = true;
    } else {
      delete feature.properties.invalid;
    }
  }

  existSource.setData({
    type: Draw.constants.geojsonTypes.FEATURE_COLLECTION,
    features: [feature],
  });
}

export function render2Map(map, feature, symbol) {
  switch (feature.properties.sketch) {
    case "rect":
    case "polygon":
    case "circle":
    case "ellipse": {
      updateFillSymbolPaint(map, feature, symbol);
      break;
    }
    case "polyline": {
      updateLineSymbolPaint(map, feature, symbol);
      break;
    }
    case "text": {
      updateTextSymbolPaint(map, feature, symbol);
      break;
    }
  }
}
