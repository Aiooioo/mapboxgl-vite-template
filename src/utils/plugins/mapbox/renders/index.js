import { PLG_MODES, generatePolygonLayer } from "./polygon";

export function renderFeatureLayer({ mode, map, features }) {
  const pointsMode = ["draw_point"];
  const linesMode = ["draw_line_string"];
  const textsMode = ["draw_text"];

  if (pointsMode.includes(mode)) {
  }

  if (linesMode.includes(mode)) {
  }

  if (PLG_MODES.includes(mode)) {
    generatePolygonLayer({ map, mode, features });
  }

  if (textsMode.includes(mode)) {
  }
}

function generatePointLayer() {}

function generateLineLayer() {}

function generateTextLayer() {}
