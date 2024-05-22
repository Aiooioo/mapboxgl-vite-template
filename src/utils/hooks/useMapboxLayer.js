import { ref, watch } from "vue";
import { useMap } from "@/models/map.js";

const useMapboxLayer = (item) => {
  const status = ref("loading");
  const layerRef = ref(null);
  const mapStore = useMap();

  function addToMap() {}

  function removeFromMap() {}

  function onMapReady() {
      //
  }

  watch(() => !!mapStore.ready, onMapReady, {
    once: true,
  });

  return {
    status,
    layer: layerRef,
    addToMap,
    removeFromMap,
  };
};

export { useMapboxLayer };
