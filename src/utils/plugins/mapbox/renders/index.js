import { PLG_MODES, generatePolygonLayer } from "./polygon";
import { PT_MODES, generatePointLayer } from "./point";
import { LINE_MODES, generateLineLayer } from "./line";
import { TEXT_MODES, generateTextLayer } from "./text";

export function renderFeatureLayer(params) {
  const { mode } = params;

  if (PT_MODES.includes(mode)) {
    generatePointLayer(params);
  }

  if (LINE_MODES.includes(mode)) {
    generateLineLayer(params);
  }

  if (PLG_MODES.includes(mode)) {
    generatePolygonLayer(params);
  }

  if (TEXT_MODES.includes(mode)) {
    generateTextLayer(params);
  }
}
