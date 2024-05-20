import {} from "@vueuse/core";
import { reactive, onMounted, onUnmounted, ref, shallowRef } from "vue";
import * as turf from "@turf/turf";
import Draw from "@mapbox/mapbox-gl-draw";

const useMapboxSketch = (mapboxMap) => {
  const sketchRef = shallowRef(null);

  onMounted(() => {
    if (mapboxMap) {
      sketchRef.value = new Draw();


    }
  });
  onUnmounted(() => {});

  return {
    draw: sketchRef,
  };
};

export default useMapboxSketch;
