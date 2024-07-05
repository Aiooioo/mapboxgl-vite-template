import { ref, toValue, onMounted, onUnmounted } from "vue";
import { LAYER_CHECK_POINT } from "../CheckPoints/useCheckPointService.js";
import { useMap } from "@/models/map.js";

const useRouteCheckPoints = () => {
  const checkPoints = ref([]);

  const mapStore = useMap();

  function removeCheckPointAt(index) {}

  function onCheckPointClick(e) {
    const feature = e.features && e.features.length > 0 && e.features[0];
    if (feature) {
      checkPoints.value.push(feature);
    }
  }

  onMounted(() => {
    const map = toValue(mapStore.map);

    map.on("click", LAYER_CHECK_POINT, onCheckPointClick);
  });

  onUnmounted(() => {
    const map = toValue(mapStore.map);

    map.off("click", LAYER_CHECK_POINT, onCheckPointClick);
  });

  return {
    checkPoints,
    removeCheckPointAt,
  };
};

export { useRouteCheckPoints };
