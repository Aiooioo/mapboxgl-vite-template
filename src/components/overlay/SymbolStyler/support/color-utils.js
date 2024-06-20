import * as defaults from "./defaults.js";
import { DefaultPolygonOutline } from "./defaults.js";

function getFeatureLayerOnMap(map, feature) {
  const noteType = feature.properties.sketch;

  if (noteType === "rect") {
    return map.getLayer("gl-draw-polygon-fill-inactive.cold");
  }
}

export function parseFeatureFillColor(ctx) {
  const feature = ctx.feature;

  if (feature && feature.properties) {
    switch (feature.geometry.type) {
      case "Polygon": {
        if (feature.properties.fill) {
          return feature.properties.fill;
        }
      }
    }
  }

  return defaults.DefaultPolygonFill;
}

export function parseFeatureFillOpacity(ctx) {
  const feature = ctx.feature;

  if (feature && feature.properties) {
    switch (feature.geometry.type) {
      case "Polygon": {
        if (feature.properties.opacity) {
          return feature.properties.opacity;
        }
      }
    }
  }

  return defaults.DefaultPolygonFillOpacity;
}

export function parseFeatureStrokeColor(ctx) {
  const feature = ctx.feature;

  if (feature && feature.properties) {
    switch (feature.geometry.type) {
      case "Polygon": {
        if (feature.properties.stroke) {
          return feature.properties.stroke;
        }
      }
    }
  }

  return defaults.DefaultPolygonOutline;
}

export function updateFeatureFillColorNotSave(ctx, color) {
  const feature = ctx.feature;

  if (!feature.properties.authoringInfo) {
    feature.properties.authoringInfo = {};
  }

  feature.properties.authoringInfo.fill =
    feature.properties.fill || defaults.DefaultPolygonFill;

  feature.properties.fill = color;
}

export function updateFeatureStrokeColorNotSave(ctx, color) {
  const feature = ctx.feature;

  if (!feature.properties.authoringInfo) {
    feature.properties.authoringInfo = {};
  }

  feature.properties.authoringInfo.stroke =
    feature.properties.stroke || defaults.DefaultPolygonOutline;

  feature.properties.stroke = color;
}

export function updateFeatureOpacityNotSave(ctx, opacity) {
  const feature = ctx.feature;

  if (!feature.properties.authoringInfo) {
    feature.properties.authoringInfo = {};
  }

  feature.properties.authoringInfo.opacity =
    feature.properties.opacity || defaults.DefaultPolygonFillOpacity;

  feature.properties.opacity = opacity;
}

export function tempUpdateLayerPaint4Preview(ctx, painter, value) {
  const lyr = getFeatureLayerOnMap(ctx.map, ctx.feature);

  if (lyr) {
    // lyr.originalFillColorPainter = map.getPaintProperty(lyr.id, "fill-color");

    ctx.map.setPaintProperty(lyr.id, painter, value);
  }
}
