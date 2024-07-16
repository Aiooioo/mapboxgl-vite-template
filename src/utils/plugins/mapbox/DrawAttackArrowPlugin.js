import MapboxDraw from "@mapbox/mapbox-gl-draw";
import * as turf from "@turf/turf";
import AttackArrow from "./ArrowPlot/AttackArrow";

const createAttackArrowFeature = function (coords) {
  // const lineCoords = coords;
  // lineCoords.push(lineCoords[0]);
  // const feature = turf.polygon([lineCoords], {
  //   name: "attack_arrow",
  //   sketch: "arrow",
  // });

  const feature = turf.lineString(coords, {
    name: "attack_arrow",
    sketch: "arrow",
  });

  return feature;
};

export const DrawAttackArrow = {
  onSetup: function (opts) {
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

    if (state.clickCount === 3) {
      this.map.fire("draw.create", {
        plotType: "attack_arrow",
        id: state.feature.id,
        features: [state.feature.toGeoJSON()],
        controlPnts: state.coordinates,
      });
      this.changeMode("simple_select", {}, { silent: true });
    }
  },
  onMouseMove: function (state, e) {
    // console.log("onmousemove--state", state);
    const { clickCount, coordinates } = state;

    if (clickCount == 2) {
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

    const coords = AttackArrow.generate(coordinates);
    const arrowFeat = createAttackArrowFeature(coords);

    if (feature) {
      feature.setCoordinates(arrowFeat.geometry.coordinates);
    } else {
      const feat = this.newFeature(arrowFeat);
      this.addFeature(feat);

      state.feature = feat;
    }
  },
};

class DrawAttackArrowPlugin {
  constructor() {
    this.modes = MapboxDraw.modes;
  }

  attach() {
    const modes = MapboxDraw.modes;
    modes.draw_attack_arrow = DrawAttackArrow;
  }
}

export default DrawAttackArrowPlugin;
