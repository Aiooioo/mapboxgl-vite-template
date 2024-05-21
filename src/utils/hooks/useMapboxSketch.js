import {} from "@vueuse/core";
import { ref, watch, onMounted, toValue, onUnmounted, shallowRef } from "vue";
import * as turf from "@turf/turf";
import Draw from "@mapbox/mapbox-gl-draw";

const useMapboxSketch = (mapboxMap) => {
  const sketchRef = shallowRef(null);
  const activeTool = ref("");

  function onCreateComplete() {}

  function onUpdateComplete() {}

  function onDeleteComplete() {}

  function initSketchTool(mapboxMapInst) {
    sketchRef.value = new Draw({
      displayControlsDefault: false,
    });

    mapboxMapInst.addControl(sketchRef.value);
    mapboxMapInst.on("draw.create", onCreateComplete);
    mapboxMapInst.on("draw.update", onUpdateComplete);
    mapboxMapInst.on("draw.delete", onDeleteComplete);
  }

  function createRect() {
    if (!sketchRef.value) return;

    activeTool.value = "rect";

    sketchRef.value.changeMode("draw_polygon");
  }

  function createDrawToolAfterLoad() {
    const map = toValue(mapboxMap);

    if (map) {
      if (map.loaded()) {
        initSketchTool(map);
      } else {
        map.on("load", () => {
          initSketchTool(map);
        });
      }
    }
  }

  onMounted(() => {
    if (mapboxMap.value) {
      createDrawToolAfterLoad();
    } else {
      watch(() => !!mapboxMap.value, createDrawToolAfterLoad, {
        once: true,
      });
    }
  });
  onUnmounted(() => {
    if (sketchRef.value) {
      map.off("draw.create", onCreateComplete);
      map.off("draw.update", onUpdateComplete);
      map.off("draw.delete", onDeleteComplete);
    }
  });

  return {
    activeTool,
    draw: sketchRef,
    createRect,
  };
};

export default useMapboxSketch;
