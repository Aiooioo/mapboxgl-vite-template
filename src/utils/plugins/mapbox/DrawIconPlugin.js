import MapboxDraw from "@mapbox/mapbox-gl-draw";

const DrawIcon = {
  onSetup: function (opts) {
    const state = {};

    state.icon = opts.icon;
    state.iconSize = opts.iconSize;

    return state;
  },

  onClick: function (state, e) {
    const point = this.newFeature({
      type: "Feature",
      properties: {
        icon: state.icon,
        iconSize: state.iconSize,
      },
      geometry: {
        type: "Point",
        coordinates: [e.lngLat.lng, e.lnglat.lat],
      },
    });

    this.addFeature(point);
    return this.changeMode("simple_select");
  },

  toDisplayFeatures: function (state, geojson, display) {
    display(geojson);
  },
};

class DrawIconPlugin {
  constructor() {
    this.modes = MapboxDraw.modes;
  }

  attach() {
    const modes = MapboxDraw.modes;
    modes.draw_icon = DrawIcon;
  }
}

export default DrawIconPlugin;
