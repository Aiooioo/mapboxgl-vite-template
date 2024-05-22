import MapboxDraw from "@mapbox/mapbox-gl-draw";
import DrawRectangle from "mapbox-gl-draw-rectangle-mode";

class DrawRectanglePlugin {
  constructor() {
    this.modes = MapboxDraw.modes;
  }

  attach() {
    const modes = MapboxDraw.modes;
    modes.draw_rectangle = DrawRectangle;
  }
}

export default DrawRectanglePlugin;
