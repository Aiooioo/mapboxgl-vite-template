import { nanoid } from "nanoid";
import { defineStore } from "pinia";
import mapboxgl from "mapbox-gl";
import * as turf from "@turf/turf";
import WKT from "terraformer-wkt-parser";
import { useMap } from "@/models/map.js";

export const useImageryStore = defineStore("imagery", {
  state: () => ({
    enableDraw: false,
    curEditMarker: null,
    loMarkers: [],
    imagerGeojson: {
      type: "FeatureCollection",
      features: [],
    },
    loMap: null,
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

      this.loMap = map;

      createLoLayer(map);
    },

    initLoMarkers(list) {
      this.imagerGeojson.features = [];

      list.forEach((item) => {
        const id = item.id;
        const wGeometry = WKT.parse(item.geometry);
        const loGeometry = turf.toWgs84(wGeometry);
        const centerGeometry = turf.center(loGeometry).geometry;

        const feature = {
          id,
          geometry: loGeometry,
          type: "Feature",
        };
        this.imagerGeojson.features.push(feature);

        this.addMarker({ id, centerGeometry, loGeometry, ...item });
      });

      this.loMap.getSource("lo-source").setData(this.imagerGeojson);
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

    flyToMarker(id) {
      const marker = this.loMarkers.find((item) => item.id === id);

      if (!marker) return;
      this.loMap.flyTo({ center: marker.centerGeometry.coordinates, zoom: 16 });
    },

    addMarker({ id, centerGeometry, loGeometry, ...args }) {
      const map = this.loMap;

      const { marker, el } = createMarker({ geometry: centerGeometry, map });

      const loMarker = {
        id,
        cid: id,
        marker,
        el,
        listener: null,
        loGeometry,
        centerGeometry,
        type: args.type || null,
        code: args.code || null,
        style: args.style || "hugeicons--car-04", // "carbon--tank",
        remark: args.remark || null,
        result: args.result,
      };

      // console.log(loMarker);

      const listener = this.setCurEditMarker.bind(this, loMarker);
      el.addEventListener("click", listener);

      this.setCurEditMarker(loMarker);

      loMarker.listener = listener;
      this.loMarkers.push(loMarker);
    },

    updateCurMarkerId(id) {
      if (this.curEditMarker) {
        this.curEditMarker.id = id;
      }
    },

    removeMarker() {
      const cid = this.curEditMarker.cid;
      const index = this.loMarkers.findIndex((item) => item.cid === cid);

      if (index > -1) {
        const { marker, el, listener } = this.loMarkers.splice(index, 1)[0];
        marker.remove();

        el.removeEventListener("click", listener);

        this.curEditMarker = null;

        this.deleteFeature(cid);
      }
    },

    changeMarkerType(val) {
      // console.log("changeMarkerType", val);
      this.curEditMarker.type = val;
    },

    changeMarkerStyle(val) {
      const { marker, style } = this.curEditMarker;

      marker.removeClassName(style);
      marker.addClassName(val);

      this.curEditMarker.style = val;
    },

    plotGeometry({ geometry, plotType }) {
      if (plotType === "point") {
        this.addPoint(geometry);
      } else {
        this.addPolygon(geometry);
      }
    },

    addPoint(geometry) {
      const id = nanoid();
      const point = turf.point(geometry.coordinates);
      const feature = turf.buffer(point, 0.01, { units: "miles" });
      feature.id = id;

      this.imagerGeojson.features.push(feature);
      this.loMap.getSource("lo-source").setData(this.imagerGeojson);

      const params = {
        id: id,
        centerGeometry: geometry,
        loGeometry: feature.geometry,
      };

      this.addMarker(params);
    },

    addPolygon(geometry) {
      const id = nanoid();
      const feature = {
        id,
        geometry,
        type: "Feature",
      };

      this.imagerGeojson.features.push(feature);
      this.loMap.getSource("lo-source").setData(this.imagerGeojson);

      const polygon = turf.polygon(geometry.coordinates);
      const center = turf.centroid(polygon);

      const params = {
        id,
        centerGeometry: center.geometry,
        loGeometry: geometry,
      };

      this.addMarker(params);
    },

    deleteFeature(cid) {
      const { features } = this.imagerGeojson;
      const index = features.findIndex((item) => item.id === cid);

      if (index > -1) {
        features.splice(index, 1);
        this.loMap.getSource("lo-source").setData(this.imagerGeojson);
      }
    },
  },
});

function createMarker({ geometry, map }) {
  const el = document.createElement("div");
  el.className = "marker-base hugeicons--car-04 "; // carbon--tank
  el.style.transform = `scale(${map.getZoom() / 30})`;

  const marker = new mapboxgl.Marker({
    element: el,
    // draggable: true, clickTolerance: 10,
    // scale: 0.1,
  });
  marker.setLngLat(geometry.coordinates);
  marker.addTo(map);

  map.on("zoom", () => {
    const zoom = map.getZoom();

    // el.style.transform = ` scale(${zoom / 100})`;
    el.style.width = `${(25 * zoom) / 18}px`;
    el.style.height = `${(25 * zoom) / 18}px`;
    // console.log("el", el);
    // console.log("zoom", zoom);
  });

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
