import Draw from "@mapbox/mapbox-gl-draw";

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

function generateLayerStyle(feature) {}

export function ensureSketchFeatureSourceData(map, feature) {
  const { id, source } = generateLayerSource(feature);

  if (!map.getSource(id)) {
    map.addSource(source);
  }

  map.getSource(id).setData({
    type: Draw.constants.geojsonTypes.FEATURE_COLLECTION,
    features: [feature],
  });
}

export function ensureDrawingFeatureLayerData(map, feature) {
  const { id, } = generateLayerStyle(feature)


}

export function render2Map() {}
