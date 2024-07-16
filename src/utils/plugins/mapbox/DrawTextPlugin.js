import MapboxDraw from "@mapbox/mapbox-gl-draw";

export const DrawText = {
  onSetup: function (opts) {
    const state = {};
    const { onDraw, onCancel } = opts;

    state.onDraw = onDraw;
    state.onCancel = onCancel;

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

    state.point = point;
    this.changeMode("simple_select");
  },
  toDisplayFeatures: function (state, geojson, display) {
    display(geojson);
  },
  onStop: function (state) {
    const f = state.point;

    this.updateUIClasses({ mouse: MapboxDraw.constants.cursors.NONE });
    MapboxDraw.lib.doubleClickZoom.enable(this);
    this.activateUIButton();

    const drawnFeature = this.getFeature(f.id);
    if (drawnFeature === undefined) {
      if (typeof state.onCancel === "function") state.onCancel();
      return;
    } else {
    }

    if (f.isValid()) {
      if (typeof state.onDraw === "function") state.onDraw(f.toGeoJSON());
      else {
        this.map.fire("draw.text", {
          features: [f.toGeoJSON()],
          mode: "draw_text",
        });
      }
    }

    this.deleteFeature([f.id], { silent: true });
    this.changeMode("simple_select", {}, { silent: true });
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
