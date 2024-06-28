import { toValue, onMounted, onUnmounted } from "vue";
import { useMap } from "@/models/map.js";
import { request } from '@/utils/api/request.ts';

const useCheckPointService = () => {
  const mapStore = useMap();


  function initCheckPointSourceAndLayer() {
    const loadCheckPoints = async () => {
      request('')
    };

    loadCheckPoints()
  }

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

  })
};

export { useCheckPointService };
