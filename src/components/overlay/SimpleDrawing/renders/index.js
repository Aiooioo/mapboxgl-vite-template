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
    map.addSource(id, source);
  }

  map.getSource(id).setData({
    type: Draw.constants.geojsonTypes.FEATURE_COLLECTION,
    features: [feature],
  });
}

export function ensureDrawingFeatureLayerData(map, feature, featureProps) {
  if (!featureProps) return;

  const { id } = generateLayerSource(feature);

  const existSource = map.getSource(id);

  feature.properties.remark = featureProps.remark;

  if (feature.properties.sketch === "text") {
    feature.properties.text = featureProps.text;
  }

  existSource.setData({
    type: Draw.constants.geojsonTypes.FEATURE_COLLECTION,
    features: [feature],
  });
}

export function render2Map() {}
