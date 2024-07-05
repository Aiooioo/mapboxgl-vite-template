import { ref, watch, toValue, onMounted, onUnmounted } from "vue";
import _ from "lodash";
import proj4 from "proj4";
import * as mapboxgl from "mapbox-gl";
import { useMap } from "@/models/map.js";
import { request } from "@/utils/api/request.ts";
import { toAbsoluteUrl } from "@/utils/url-utils.js";

export const LAYER_CHECK_POINT = "check-point-layer";
export const LAYER_CHECK_POINT_HIGHLIGHT = "check-point-layer-highlight";

const useCheckPointService = () => {
  const checkPoints = ref(null);
  const selectedId = ref(null);
  const mapStore = useMap();

  function initCheckPointSourceAndLayer() {
    const loadCheckPoints = async () => {
      try {
        const res = await request({
          method: "POST",
          url: "/map/data/getGeojson",
          params: {
            tableName: "point",
          },
        });

        if (res.code === 200) {
          const epsg3857Data = JSON.parse(res.data);
          _.each(epsg3857Data.features, (feature) => {
            feature.geometry.coordinates = proj4(
              "EPSG:3857",
              "EPSG:4326",
              feature.geometry.coordinates,
            );

            // FIX: 后端返回的ID是表名加ID，不是number类型，mapbox无法识别
            const idArr = feature.id.split(".");
            feature.id = parseInt(idArr[1]);
          });

          delete epsg3857Data.crs;
          checkPoints.value = epsg3857Data;
        }
      } catch (e) {
        console.log(e);
      }
    };

    loadCheckPoints();
  }

  function fitBoundsToCheckPoints() {
    const map = toValue(mapStore.map);

    if (checkPoints.value) {
      const features = checkPoints.value.features;
      if (features && features.length > 0) {
        const first = features[0];
        const bounds = new mapboxgl.LngLatBounds(
          first.geometry.coordinates,
          first.geometry.coordinates,
        );

        _.each(features, (ft) => {
          bounds.extend(ft.geometry.coordinates);
        });

        map.fitBounds(bounds, {
          padding: 80,
        });
      }
    }
  }

  function addCheckPointsDataAndSymbol() {
    const map = toValue(mapStore.map);
    map.addSource("check-points", {
      type: "geojson",
      data: checkPoints.value,
    });

    map.addLayer({
      id: LAYER_CHECK_POINT,
      source: "check-points",
      // type: "circle",
      // paint: {
      //   "circle-color": "#1296ff",
      //   "circle-radius": 5,
      // },
      type: "symbol",
      layout: {
        "icon-image": "check-point",
        "icon-size": 0.5,
      },
    });

    map.addLayer({
      id: LAYER_CHECK_POINT_HIGHLIGHT,
      source: "check-points",
      filter: ["==", ["id"], "point.5"],
      type: "symbol",
      layout: {
        "icon-image": "check-point-highlight",
        "icon-size": 0.5,
      },
    });

    fitBoundsToCheckPoints();
  }

  function removeCheckPointsDataAndSymbol() {
    const map = toValue(mapStore.map);
    if (map.getLayer("check-point-layer")) {
      map.removeLayer("check-point-layer");
    }

    if (map.getLayer("check-point-layer-highlight")) {
      map.removeLayer("check-point-layer-highlight");
    }

    if (map.getSource("check-points")) {
      map.removeSource("check-points");
    }
  }

  function highlightCheckPointById(id) {
    const map = toValue(mapStore.map);
    const layer = map.getLayer("check-point-layer");
    const highlightLayer = map.getLayer("check-point-layer-highlight");
    if (highlightLayer) {
      map.setFilter("check-point-layer-highlight", ["==", ["id"], id]);
    }
    if (layer) {
      map.setFilter("check-point-layer", ["!=", ["id"], id]);
    }
  }

  watch(
    checkPoints,
    (value) => {
      if (value) {
        if (!mapStore.checkPointIconLoaded) {
          const images2Load = [
            { key: "check-point", url: "./imgs/icons/check-point.png" },
            {
              key: "check-point-highlight",
              url: "./imgs/icons/check-point-highlight.png",
            },
            {
              key: "check-point-selected",
              url: "./imgs/icons/check-point-online.png",
            },
          ];

          Promise.all(
            images2Load.map((img) => {
              return new Promise((res) => {
                mapStore.map.loadImage(
                  toAbsoluteUrl(img.url),
                  (error, image) => {
                    mapStore.map.addImage(img.key, image);
                    res();
                  },
                );
              });
            }),
          ).then(() => {
            mapStore.checkPointIconLoaded = true;

            addCheckPointsDataAndSymbol();
          });
        } else {
          addCheckPointsDataAndSymbol();
        }
      }
    },
    {
      immediate: true,
    },
  );

  onMounted(() => {
    initCheckPointSourceAndLayer();

    // const map = toValue(mapStore.map);
    //
    // map.addSource("check-point", {
    //   type: "raster",
    //   tiles: [
    //     "http://192.168.0.239:8080/geoserver/whgis/wms?service=WMS&version=1.1.0&request=GetMap&layers=whgis%3Apoint&bbox={bbox-epsg-3857}&TRANSPARENT=true&width=530&height=768&srs=EPSG%3A3857&styles=&format=image%2Fpng",
    //   ],
    //   tileSize: 256,
    // });
    //
    // map.addLayer({
    //   id: "check-point-layer",
    //   source: "check-point",
    //   type: "raster",
    //   paint: {
    //     "raster-opacity": 1,
    //   },
    // });
  });

  onUnmounted(() => {
    removeCheckPointsDataAndSymbol();
  });

  return {
    selectedId,
    checkPoints,
    highlightCheckPointById,
  };
};

export { useCheckPointService };
