import { ref, watch, toValue, onMounted, onUnmounted } from "vue";
import _ from "lodash";
import proj4 from "proj4";
import { useMap } from "@/models/map.js";
import { request } from "@/utils/api/request.ts";
import { toAbsoluteUrl } from "@/utils/url-utils.js";

const useCheckPointService = () => {
  const checkPoints = ref(null);
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

  function addCheckPointsDataAndSymbol() {
    const map = toValue(mapStore.map);
    map.addSource("check-points", {
      type: "geojson",
      data: checkPoints.value,
    });

    map.addLayer({
      id: "check-point-layer",
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
  }

  function removeCheckPointsDataAndSymbol() {
    const map = toValue(mapStore.map);
    if (map.getLayer("check-point-layer")) {
      map.removeLayer("check-point-layer");
    }

    if (map.getSource("check-points")) {
      map.removeSource("check-points");
    }
  }

  watch(
    checkPoints,
    (value) => {
      if (value) {
        if (!mapStore.checkPointIconLoaded) {
          mapStore.map.loadImage(
            toAbsoluteUrl("./imgs/icons/check-point.png"),
            function (error, image) {
              if (error) {
                throw error;
              }

              mapStore.map.addImage("check-point", image);
              mapStore.checkPointIconLoaded = true;

              addCheckPointsDataAndSymbol();
            }.bind(mapStore.map),
          );
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
    checkPoints,
  };
};

export { useCheckPointService };
