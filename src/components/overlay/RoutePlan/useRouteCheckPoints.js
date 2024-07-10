import { ref, toValue, onMounted, onUnmounted } from "vue";
import { LAYER_CHECK_POINT } from "../CheckPoints/useCheckPointService.js";
import {
  clearSelectionHighlights,
  updateHighlightPoints,
} from "./utils/render-highlight-points.js";
import { useMap } from "@/models/map.js";

const useRouteCheckPoints = () => {
  const checkPoints = ref([]);

  const mapStore = useMap();

  function removeCheckPointAt(index) {
    checkPoints.value.splice(index, 1);

    updateHighlightPoints(
      toValue(mapStore.map),
      checkPoints.value.map((p) => p.id),
    );
  }

  function onCheckPointClick(e) {
    if (checkPoints.value.length === 5) return;

    const feature = e.features && e.features.length > 0 && e.features[0];
    if (feature) {
      checkPoints.value.push(feature);
    }

    updateHighlightPoints(
      toValue(mapStore.map),
      checkPoints.value.map((p) => p.id),
    );
  }

  onMounted(() => {
    const map = toValue(mapStore.map);

    map.on("click", LAYER_CHECK_POINT, onCheckPointClick);
  });

  onUnmounted(() => {
    const map = toValue(mapStore.map);

    clearSelectionHighlights(map);

    map.off("click", LAYER_CHECK_POINT, onCheckPointClick);
  });

  return {
    checkPoints,
    removeCheckPointAt,
  };
};

export { useRouteCheckPoints };
