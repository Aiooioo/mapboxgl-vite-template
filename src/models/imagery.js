import { nanoid } from "nanoid";
import { defineStore } from "pinia";
import mapboxgl from "mapbox-gl";
import * as turf from "@turf/turf";
import { useMap } from "@/models/map.js";

export const useImageryStore = defineStore("imagery", {
  state: () => ({
    enableDraw: false,
    curEditMarker: null,
    markers: [],
    geojson: {
      type: "FeatureCollection",
      features: [],
    },
  }),
  actions: {
    toggelEnableDraw() {
      this.enableDraw = !this.enableDraw;

      if (this.enableDraw) {
        this.initLoLayer();
      }
    },

    initLoLayer() {
      const { map } = useMap();

      if (!map) return;

      createLoLayer(map);

      // map.on("click", (e) => {
      //   // console.log("click", e);
      //   const bbox = [
      //     [e.point.x - 5, e.point.y - 5],
      //     [e.point.x + 5, e.point.y + 5],
      //   ];
      //   // Find features intersecting the bounding box.
      //   const selectedFeatures = map.queryRenderedFeatures(bbox, {
      //     layers: ["lo-layer"],
      //   });

      //   console.log("selectedFeatures", selectedFeatures);

      //   // if (selectedFeatures.length > 0) {
      //   //   const feature = selectedFeatures[0];
      //   //   this.setCurEditMarker(feature);
      //   // }
      // });
    },

    setCurEditMarker(marker) {
      // console.log("marker clicked--setCurEditMarker", marker);

      const mapStore = useMap();
      if (mapStore.activeBar !== "location") return;

      if (this.curEditMarker) {
        this.curEditMarker.marker.removeClassName("marker-selected");
      }

      this.curEditMarker = marker;

      if (this.curEditMarker) {
        this.curEditMarker.marker.addClassName("marker-selected");
      }
    },

    addMarker({ id, geometry, map }) {
      // console.log("addMarker", marker, el);
      const { marker, el } = createMarker({ geometry, map });
      const newMarker = { marker, el, id, type: "tank", style: "carbon--tank" };

      const listener = this.setCurEditMarker.bind(this, newMarker);
      el.addEventListener("click", listener);

      this.setCurEditMarker(newMarker);

      newMarker.listener = listener;
      this.markers.push(newMarker);
    },

    removeMarker() {
      const index = this.markers.findIndex(
        (item) => item.id === this.curEditMarker.id
      );

      if (index > -1) {
        const { marker, el, listener } = this.markers.splice(index, 1)[0];
        marker.remove();

        el.removeEventListener("click", listener);

        this.curEditMarker = null;
      }
    },

    changeMarkerType(val) {
      // console.log("changeMarkerType", val);
      this.curEditMarker.type = val;
    },

    changeMarkerStyle(val) {
      const { marker, style } = this.curEditMarker;

      // console.log("changeMarkerStyle", val);

      marker.removeClassName(style);
      marker.addClassName(val);

      this.curEditMarker.style = val;
    },

    addPoint({ geometry, map }) {
      const id = nanoid();
      const point = turf.point(geometry.coordinates);
      const feature = turf.buffer(point, 5, {
        units: "miles",
      });

      feature.id = id;
      feature.properties = {
        loInfo: "location-point", // 标注信息
        loStyle: "carbon--location-polygon", // 标注样式
        loType: "tank", // 标注类型
      };

      // console.log("geometry", geometry);

      this.geojson.features.push(feature);
      map.getSource("lo-source").setData(this.geojson);

      this.addMarker({ id, geometry, map });
    },

    addRect({ geometry, map }) {
      const id = nanoid();
      const feature = {
        id,
        geometry,
        type: "Feature",
        properties: {
          loInfo: "location-rect", // 标注信息
          loStyle: "carbon--location-polygon", // 标注样式
          loType: "tank", // 标注类型
        },
      };

      this.geojson.features.push(feature);
      map.getSource("lo-source").setData(this.geojson);

      const polygon = turf.polygon(geometry.coordinates);
      const center = turf.centroid(polygon);
      this.addMarker({ id, geometry: center.geometry, map });
    },

    addPolygon({ geometry, map }) {
      const id = nanoid();
      const feature = {
        id,
        geometry,
        type: "Feature",
        properties: {
          loInfo: "location-polygon", // 标注信息
          loStyle: "carbon--location-polygon", // 标注样式
          loType: "tank", // 标注类型
        },
      };

      this.geojson.features.push(feature);
      map.getSource("lo-source").setData(this.geojson);

      const polygon = turf.polygon(geometry.coordinates);
      const center = turf.centroid(polygon);
      this.addMarker({ id, geometry: center.geometry, map });
    },
  },
});

function createMarker({ geometry, map }) {
  const el = document.createElement("div");
  el.className = "marker-base carbon--tank";

  const marker = new mapboxgl.Marker({
    element: el,
    // draggable: true,
    // clickTolerance: 10,
    scale: 0.5,
  })
    .setLngLat(geometry.coordinates)
    .addTo(map);

  return { marker, el };
}

function createLoLayer(map) {
  const source = map.getSource("lo-source");
  if (!source) {
    map.addSource("lo-source", {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [],
      },
    });
  }

  const layer = map.getLayer("lo-layer");
  if (!layer) {
    map.addLayer({
      id: "lo-layer",
      type: "fill",
      source: "lo-source",
      paint: {
        "fill-color": "#888888",
        "fill-opacity": 0.4,
      },
      filter: ["==", "$type", "Polygon"],
    });
  }
}
