import {} from "@vueuse/core";
import { watch, onUnmounted, shallowRef } from "vue";
import * as turf from "@turf/turf";
import Draw from "@mapbox/mapbox-gl-draw";

const useMapboxSketch = (mapboxMap) => {
  const sketchRef = shallowRef(null);

  watch(
    () => !!mapboxMap,
    () => {
      sketchRef.value = new Draw();
    },
    {
      once: true,
    },
  );

  onUnmounted(() => {});

  return {
    draw: sketchRef,
  };
};

export default useMapboxSketch;
