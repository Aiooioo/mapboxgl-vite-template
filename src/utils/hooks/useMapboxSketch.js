import { from, useObservable, useSubject } from "@vueuse/rxjs";
import { mergeAll, mergeMap, switchAll, BehaviorSubject } from "rxjs";
import { ref, watch, onMounted, toValue, onUnmounted, shallowRef } from "vue";
import { useMap } from "@/models/map.js";
import Draw from "@mapbox/mapbox-gl-draw";
import {
  unpackMapboxDraw,
  patchMapboxDraw,
  DrawPatchTextSource,
} from "@/utils/plugins/mapbox/draw-style-hotfix.js";
import debugSupport from "@/utils/debug-support.js";

const useMapboxSketch = () => {
  const $channel = new BehaviorSubject(null);

  const sketchRef = shallowRef(null);
  const completeFeature = shallowRef(null);
  const editedFeature = shallowRef(null);
  const deletedFeature = shallowRef(null);

  const activeTool = ref("");
  const mapStore = useMap();

  function onCreateComplete(evt) {
    if (evt.features && evt.features.length > 0) {
      const clone = JSON.parse(JSON.stringify(evt.features[0]));
      const drawId = evt.features[0].id;

      if (sketchRef.value.get(drawId)) {
        sketchRef.value.delete(drawId);
      }

      clone.properties = {
        sketch: activeTool.value,
      };

      completeFeature.value = clone;

      $channel.next({
        map: toValue(mapStore.map),
        feature: clone,
      });
    }

    activeTool.value = "";
  }

  function onDrawTextComplete({ features }) {
    mapStore.map.getSource(DrawPatchTextSource).setData({
      type: Draw.constants.geojsonTypes.FEATURE_COLLECTION,
      features,
    });
  }

  function onUpdateComplete() {}

  function onDeleteComplete() {}

  function initSketchTool(mapboxMapInst) {
    sketchRef.value = new Draw({
      displayControlsDefault: false,
    });

    debugSupport.set("mapbox-draw", sketchRef.value);

    mapboxMapInst.addControl(sketchRef.value);
    patchMapboxDraw(mapboxMapInst);

    mapboxMapInst.on("draw.create", onCreateComplete);
    mapboxMapInst.on("draw.update", onUpdateComplete);
    mapboxMapInst.on("draw.delete", onDeleteComplete);
    mapboxMapInst.on("draw.text", onDrawTextComplete);
  }

  function checkAndPrepare() {
    if (!sketchRef.value) return false;

    completeFeature.value = null;

    return true;
  }

  function createText() {
    if (!checkAndPrepare()) return;

    activeTool.value = "text";

    sketchRef.value.changeMode("draw_text");
  }

  function createPoint() {
    if (!checkAndPrepare()) return;

    activeTool.value = "point";

    sketchRef.value.changeMode("draw_point");
  }

  function createPolyline() {
    if (!checkAndPrepare()) return;

    activeTool.value = "polyline";

    sketchRef.value.changeMode("draw_line_string");
  }

  function createCircle() {
    if (!checkAndPrepare()) return;

    activeTool.value = "circle";

    sketchRef.value.changeMode("draw_circle");
  }

  function createEllipse() {
    if (!checkAndPrepare()) return;

    activeTool.value = "ellipse";

    sketchRef.value.changeMode("draw_ellipse");
  }

  function createRect() {
    if (!checkAndPrepare()) return;

    activeTool.value = "rect";

    sketchRef.value.changeMode("draw_rectangle");
  }

  function createPolygon() {
    if (!checkAndPrepare()) return;

    activeTool.value = "polygon";

    sketchRef.value.changeMode("draw_polygon");
  }

  function cancelDraw() {
    if (!sketchRef.value || activeTool.value === "") return;

    activeTool.value = "";

    sketchRef.value.changeMode("simple_select");
  }

  function clear() {}

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
      unpackMapboxDraw(map);

      map.removeControl(sketchRef.value);
      map.off("draw.create", onCreateComplete);
      map.off("draw.update", onUpdateComplete);
      map.off("draw.delete", onDeleteComplete);
    }
  });

  return {
    activeTool,
    $channel,
    draw: sketchRef,
    completeFeature,
    deletedFeature,
    createText,
    createPoint,
    createPolyline,
    createCircle,
    createEllipse,
    createRect,
    createPolygon,
    cancelDraw,
    clear,
  };
};

export default useMapboxSketch;
