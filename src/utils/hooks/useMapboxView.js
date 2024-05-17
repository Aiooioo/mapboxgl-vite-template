import { ref, onMounted, onUnmounted } from "vue";
import { configMapboxGL } from "../map-init.js";
import mapCreator from "../map-creator.js";

const useMapboxView = (container) => {
  const mapRef = ref();

  onMounted(() => {
    if (!container.value) return;

    configMapboxGL();

    mapRef.value = mapCreator.createMap(container.value);

    // customize map options
    mapRef.value.dragRotate.disable();
    mapRef.value.touchZoomRotate.disableRotation();
  });

  onUnmounted(() => {});

  return {
    map: mapRef,
  };
};

export default useMapboxView;
