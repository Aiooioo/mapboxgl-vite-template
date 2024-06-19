import MapboxDraw from "@mapbox/mapbox-gl-draw";

const DrawText = {
  onSetup: function (opts) {
    const state = {};

    return state;
  },

  onClick: function (state, e) {
    const coordinates = [e.lngLat.lng, e.lngLat.lat];
    const point = this.newFeature({
      type: "Feature",
      properties: {
        text: "123",
      },
      geometry: {
        type: "Point",
        coordinates,
      },
    });
    this.addFeature(point);
    this.changeMode("simple_select");
  },
  toDisplayFeatures: function (state, geojson, display) {
    display(geojson);
  },
};

class DrawTextPlugin {
  constructor() {
    this.modes = MapboxDraw.modes;
  }

  attach() {
    const modes = MapboxDraw.modes;
    modes.draw_text = DrawText;
  }
}

export default DrawTextPlugin;
