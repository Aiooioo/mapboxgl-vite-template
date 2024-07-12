import MapboxDraw from "@mapbox/mapbox-gl-draw";
import * as turf from "@turf/turf";
import ThreeArrow from "./ArrowPlot/ThreeArrow";

const createThreeArrowFeature = function (coords) {
  const feature = turf.lineString(coords, {
    name: "three_arrow",
    sketch: "arrow",
  });

  return feature;
};

const DrawThreeArrow = {
  onSetup: function () {
    const clickCount = 0;

    return {
      coordinates: [],
      clickCount,
    };
  },
  onClick: function (state, e) {
    const { coordinates } = state;

    coordinates[state.clickCount] = [e.lngLat.lng, e.lngLat.lat];
    state.clickCount += 1;

    if (state.clickCount === 5) {
      this.map.fire("draw.create", {
        features: [state.feature.toGeoJSON()],
        type: "three_arrow",
        control: state.coordinates,
      });
      this.changeMode("simple_select", {}, { silent: true });
    }
  },
  onMouseMove: function (state, e) {
    // console.log("onmousemove--state", state);
    const { clickCount, coordinates } = state;

    if (clickCount > 1) {
      coordinates[clickCount] = [e.lngLat.lng, e.lngLat.lat];
    }

    this.updateFeature(state);
  },

  toDisplayFeatures: function (state, geojson, display) {
    display(geojson);
  },

  updateFeature: function (state) {
    const { coordinates, feature } = state;
    if (coordinates.length < 3) return;

    const coords = ThreeArrow.generate(coordinates);
    const arrowFeat = createThreeArrowFeature(coords);

    if (feature) {
      feature.setCoordinates(arrowFeat.geometry.coordinates);
    } else {
      const feat = this.newFeature(arrowFeat);
      this.addFeature(feat);

      state.feature = feat;
    }
  },
};

class DrawThreeArrowPlugin {
  constructor() {
    this.modes = MapboxDraw.modes;
  }

  attach() {
    const modes = MapboxDraw.modes;
    modes.draw_three_arrow = DrawThreeArrow;
  }
}

export default DrawThreeArrowPlugin;
