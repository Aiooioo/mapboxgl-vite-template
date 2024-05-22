import { ref, toValue, watch, onMounted } from "vue";
import { useMap } from "../../../models/map.js";

const useViewPort = () => {
  const zoom = ref(0);
  const center = ref([]);
  const mapStore = useMap();

  function updateValues(map) {
    center.value = map.getCenter();
    zoom.value = map.getZoom();
  }

  watch(
    () => mapStore.ready,
    () => {
      const map = toValue(mapStore.map);

      map.on("load", () => {
        updateValues(map);
      });

      map.on("moveend", () => {
        updateValues(map);
      });

      if (map.loaded()) {
        updateValues(map);
      }
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
