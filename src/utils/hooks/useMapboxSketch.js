import {} from "@vueuse/core";
import { ref, watch, onMounted, toValue, onUnmounted, shallowRef } from "vue";
import { useMap } from "@/models/map.js";
import * as turf from "@turf/turf";
import Draw from "@mapbox/mapbox-gl-draw";
import debugSupport from "@/utils/debug-support.js";

const useMapboxSketch = () => {
  const sketchRef = shallowRef(null);
  const activeTool = ref("");
  const mapStore = useMap();

  function onCreateComplete() {
    activeTool.value = "";
  }

  function onUpdateComplete() {}

  function onDeleteComplete() {}

  function initSketchTool(mapboxMapInst) {
    sketchRef.value = new Draw({
      displayControlsDefault: false,
    });

    debugSupport.set("mapbox-draw", sketchRef.value);

    mapboxMapInst.addControl(sketchRef.value);
    mapboxMapInst.on("draw.create", onCreateComplete);
    mapboxMapInst.on("draw.update", onUpdateComplete);
    mapboxMapInst.on("draw.delete", onDeleteComplete);
  }

  function createText() {
    if (!sketchRef.value) return;

    activeTool.value = "text";

    sketchRef.value.changeMode("draw_text");
  }

  function createPoint() {
    if (!sketchRef.value) return;

    activeTool.value = "point";

    sketchRef.value.changeMode("draw_point");
  }

  function createPolyline() {
    if (!sketchRef.value) return;

    activeTool.value = "polyline";

    sketchRef.value.changeMode("draw_line_string");
  }

  function createCircle() {
    if (!sketchRef.value) return;

    activeTool.value = "circle";

    sketchRef.value.changeMode("draw_circle");
  }

  function createEllipse() {
    if (!sketchRef.value) return;

    activeTool.value = "ellipse";

    sketchRef.value.changeMode("draw_ellipse");
  }

  function createRect() {
    if (!sketchRef.value) return;

    activeTool.value = "rect";

    sketchRef.value.changeMode("draw_rectangle");
  }

  function createPolygon() {
    if (!sketchRef.value) return;

    activeTool.value = "polygon";

    sketchRef.value.changeMode("draw_polygon");
  }

  function cancelDraw() {
    if (!sketchRef.value || activeTool.value === "") return;

    activeTool.value = "";

    sketchRef.value.changeMode("simple_select");
  }

  function createDrawToolAfterLoad() {
    const map = toValue(mapStore.map);

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

  watch(() => !!mapStore.ready, createDrawToolAfterLoad, {
    once: true,
    immediate: true,
  });

  onUnmounted(() => {
    const map = toValue(mapStore.map);

    if (sketchRef.value) {
      map.off("draw.create", onCreateComplete);
      map.off("draw.update", onUpdateComplete);
      map.off("draw.delete", onDeleteComplete);
    }
  });

  return {
    activeTool,
    draw: sketchRef,
    createText,
    createPoint,
    createPolyline,
    createCircle,
    createEllipse,
    createRect,
    createPolygon,
    cancelDraw,
  };
};

export default useMapboxSketch;
