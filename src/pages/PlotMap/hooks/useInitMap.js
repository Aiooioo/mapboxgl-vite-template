import { ref, onMounted, onUnmounted } from "vue";
import { configMapboxGL } from "@/utils/map-init.js";
import mapCreator from "@/utils/map-creator.js";
import debugSupport from "@/utils/debug-support.js";

export const useInitMap = (container) => {
  const mapRef = ref();

  onMounted(() => {
    if (!container.value) return;

    configMapboxGL();

    mapRef.value = mapCreator.createMap(container.value);

    debugSupport.set("map", mapRef.value);

    // customize map options
    mapRef.value.dragRotate.disable();
    mapRef.value.touchZoomRotate.disableRotation();
  });

  onUnmounted(() => {});

  return {
    map: mapRef,
  };
};
