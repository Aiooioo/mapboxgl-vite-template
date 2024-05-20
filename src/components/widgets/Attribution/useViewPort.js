import { ref, toValue, watch, onMounted } from "vue";
import { useMap } from "../../../models/map.js";

const useViewPort = (mapboxMap) => {
  const zoom = ref(0);
  const center = ref([]);
  const mapStore = useMap();

  watch(
    () => mapStore.ready,
    () => {
      const map = toValue(mapboxMap);

      map.on("load", () => {
        center.value = map.getCenter();
        zoom.value = map.getZoom();
      });

      map.on("moveend", () => {
        center.value = map.getCenter();
        zoom.value = map.getZoom();
      });
    },
    {
      once: true,
    },
  );

  return {
    center,
    zoom,
  };
};

export default useViewPort;
