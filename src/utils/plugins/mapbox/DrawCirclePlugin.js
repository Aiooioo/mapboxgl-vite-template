import MapboxDraw from "@mapbox/mapbox-gl-draw";
import * as turf from "@turf/turf";

function calculateDistance(start, end) {
  const p1 = turf.point(start);
  const p2 = turf.point(end);
  const options = { units: "kilometers" };

  return turf.distance(p1, p2, options);
}

function createCircleFeature(startPos, endPos) {
  const radius = calculateDistance(startPos, endPos);
  let options = {
    properties: {
      isCircle: true,
      center: startPos,
      radiusInKm: radius,
    },
  };

  return turf.circle(startPos, radius, options);
}

export const DrawCircle = {
  onSetup: function (opts) {
    const state = { clickState: false };
    return state;
  },
  onClick: function (state, e) {
    state.clickState = !state.clickState;

    if (state.clickState) {
      state.coordinates = [e.lngLat.lng, e.lngLat.lat];
    } else {
      this.deleteFeature("draw_circle_temp");
      let circle = this.newFeature(
        createCircleFeature(state.coordinates, [e.lngLat.lng, e.lngLat.lat])
      );
      this.addFeature(circle);

      let coordinates = JSON.parse(JSON.stringify(circle.coordinates));

      const feature = JSON.parse(
        JSON.stringify({
          id: circle.id,
          type: "Feature",
          geometry: {
            type: "Polygon",
            properties: {},
            coordinates,
          },
        })
      );

      this.map.fire("draw.create", {
        features: [feature],
        mode: "draw_circle",
      });
      return this.changeMode("simple_select");
    }
  },
  onMouseMove: function (state, e) {
    if (state.clickState) {
      let temp = this.getFeature("draw_circle_temp");
      if (!temp) {
        this.addFeature(
          this.newFeature(
            Object.assign(
              createCircleFeature(state.coordinates, [
                e.lngLat.lng,
                e.lngLat.lat,
              ]),
              {
                id: "draw_circle_temp",
              }
            )
          )
        );
      } else {
        const newFeat = createCircleFeature(state.coordinates, [
          e.lngLat.lng,
          e.lngLat.lat,
        ]);
        temp.setProperty("radiusInKm", newFeat.properties.radiusInKm);
        temp.setCoordinates(newFeat.geometry.coordinates);
      }
    }
  },

  toDisplayFeatures: function (state, geojson, display) {
    display(geojson);
  },
};

class DrawCirclePlugin {
  constructor() {
    this.modes = MapboxDraw.modes;
  }

  attach() {
    const modes = MapboxDraw.modes;
    modes.draw_circle = DrawCircle;
  }
}

export default DrawCirclePlugin;
