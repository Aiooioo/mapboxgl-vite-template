import {
  LAYER_CHECK_POINT,
  LAYER_CHECK_POINT_SELECTION_HIGHLIGHT,
} from "../../CheckPoints/useCheckPointService.js";

export function clearSelectionHighlights(map) {
  const layer = map.getLayer(LAYER_CHECK_POINT);
  const selectionLayer = map.getLayer(LAYER_CHECK_POINT_SELECTION_HIGHLIGHT);

  if (layer) {
    map.setFilter(LAYER_CHECK_POINT, null);
  }

  if (selectionLayer) {
    map.setFilter(LAYER_CHECK_POINT_SELECTION_HIGHLIGHT, [
      "==",
      ["id"],
      "xxxx",
    ]);
  }
}

export function updateHighlightPoints(map, highlightIds) {
  const layer = map.getLayer(LAYER_CHECK_POINT);
  const selectionLayer = map.getLayer(LAYER_CHECK_POINT_SELECTION_HIGHLIGHT);
  if (selectionLayer) {
    map.setFilter(LAYER_CHECK_POINT_SELECTION_HIGHLIGHT, [
      "in",
      ["id"],
      ["literal", highlightIds],
    ]);
  }
  if (layer) {
    map.setFilter(LAYER_CHECK_POINT, [
      "!",
      ["in", ["id"], ["literal", highlightIds]],
    ]);
  }
}
