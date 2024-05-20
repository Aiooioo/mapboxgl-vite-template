import { ref, onMounted, onUnmounted } from "vue";
import { useMap } from "../../models/map.js";
import { configMapboxGL } from "../map-init.js";
import mapCreator from "../map-creator.js";
import debugSupport from "../debug-support.js";

const useMapboxView = (container) => {
  const mapRef = ref();

  const mapStore = useMap();

  onMounted(() => {
    if (!container.value) return;

    configMapboxGL();

    mapRef.value = mapCreator.createMap(container.value);

    debugSupport.set("map", mapRef.value);

    // customize map options
    mapRef.value.dragRotate.disable();
    mapRef.value.touchZoomRotate.disableRotation();

    mapRef.value.on("load", () => {
      mapStore.onViewReady();
    });
  });

  onUnmounted(() => {});

  return {
    map: mapRef,
  };
};

export default useMapboxView;
