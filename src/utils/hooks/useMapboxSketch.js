import { from, useObservable, useSubject } from "@vueuse/rxjs";
import { mergeAll, mergeMap, switchAll, BehaviorSubject } from "rxjs";
import { ref, watch, onMounted, toValue, onUnmounted, shallowRef } from "vue";
import { useMap } from "@/models/map.js";
import * as turf from "@turf/turf";
import Draw from "@mapbox/mapbox-gl-draw";
import {
  unpackMapboxDraw,
  patchMapboxDraw,
  DrawPatchTextSource,
} from "@/utils/plugins/mapbox/draw-style-hotfix.js";
import debugSupport from "@/utils/debug-support.js";
import { useImageryStore } from "@/models/imagery";
import PlotEdit from "../plugins/mapbox/PlotEdit";
import { MapboxDrawExtends } from "../plugins/mapbox/MapboxDrawExtends";

const useMapboxSketch = () => {
  const $channel = new BehaviorSubject(null);

  let plotEdit = null;

  const sketchRef = shallowRef(null);
  const completeFeature = shallowRef(null);
  const editedFeature = shallowRef(null);
  const deletedFeature = shallowRef(null);

  const activeTool = ref("");
  const mapStore = useMap();

  const imageryStore = useImageryStore();

  function onCreateComplete(evt) {
    console.log("onCreateComplete", evt);
    if (evt.features && evt.features.length > 0) {
      const clone = JSON.parse(JSON.stringify(evt.features[0]));
      const drawId = evt.features[0].id;

      if (sketchRef.value.get(drawId)) {
        sketchRef.value.delete(drawId);
      }

      clone.properties = {
        sketch: activeTool.value,
      };

      if (mapStore.activeBar === "location") {
        // drawLocationMarker(evt);
        drawLocationGeometry(evt.features[0].geometry);
      }

      completeFeature.value = clone;

      $channel.next({
        map: toValue(mapStore.map),
        feature: clone,
      });
    }

    activeTool.value = "";
  }

  function onDrawTextComplete({ features }) {
    // mapStore.map.getSource(DrawPatchTextSource).setData({
    //   type: Draw.constants.geojsonTypes.FEATURE_COLLECTION,
    //   features,
    // });

    if (features && features.length > 0) {
      const clone = JSON.parse(JSON.stringify(features[0]));
      const drawId = features[0].id;

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

  function drawLocationGeometry(geometry) {
    const params = {
      geometry,
      plotType: activeTool.value,
    };

    imageryStore.plotGeometry(params);
  }

  function onUpdateComplete(evt) {
    console.log("onUpdateComplete", evt);
  }

  function onDeleteComplete() {}

  function onSelectionChange({ features }) {
    console.log("onSelectionChange", features);

    // setTimeout(() => {
    //   const ids = features.map((f) => f.id);

    //   sketchRef.value.delete(ids);
    // }, 3 * 1000);
  }

  function initSketchTool(mapboxMapInst) {
    if (sketchRef.value) return;

    sketchRef.value = new Draw({
      displayControlsDefault: false,
      userProperties: true,
      modes: {
        ...Draw.modes,
        ...MapboxDrawExtends,
      },
    });

    plotEdit = new PlotEdit(mapboxMapInst);

    debugSupport.set("mapbox-draw", sketchRef.value);

    mapboxMapInst.addControl(sketchRef.value);
    patchMapboxDraw(mapboxMapInst);

    mapboxMapInst.on("draw.create", onCreateComplete);
    mapboxMapInst.on("draw.update", onUpdateComplete);
    mapboxMapInst.on("draw.delete", onDeleteComplete);
    mapboxMapInst.on("draw.text", onDrawTextComplete);

    mapboxMapInst.on("draw.selectionchange", onSelectionChange);

    // mapboxMapInst.on("click", (e) => {
    //   console.log("click", e);
    //   const features = mapboxMapInst.queryRenderedFeatures(e.point);
    //   console.log(features);

    //   // plotEdit
    // });
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

  function createIcon() {
    if (!checkAndPrepare()) return;

    activeTool.value = "icon";

    sketchRef.value.changeMode("draw_icon");
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

  function createAttackArrow() {
    if (!checkAndPrepare()) return;

    activeTool.value = "arrow";

    sketchRef.value.changeMode("draw_attack_arrow");
  }

  function createDoubleArrow() {
    if (!checkAndPrepare()) return;

    activeTool.value = "arrow";

    sketchRef.value.changeMode("draw_double_arrow");
  }

  function createThreeArrow() {
    if (!checkAndPrepare()) return;

    activeTool.value = "arrow";

    // sketchRef.value.changeMode("draw_attack_arrow");
    // sketchRef.value.changeMode("draw_double_arrow");
    sketchRef.value.changeMode("draw_three_arrow");

    // const map = mapStore.map;
    // const bounds = map.getBounds();

    // console.log("bounds", bounds);

    // let maxWidth = 100; // mapbox源码中默认值为100
    // let y = map._containerHeight / 2;
    // let x = map._containerWidth / 2 - maxWidth / 2;
    // let left = map.unproject([x, y]);
    // let right = map.unproject([x + maxWidth, y]);
    // let scale = Math.floor(left.distanceTo(right));

    // console.log("scale", scale);
  }

  function cancelDraw() {
    if (!sketchRef.value || activeTool.value === "") return;

    activeTool.value = "";

    sketchRef.value.changeMode("simple_select");
  }

  function clear() {
    if (!sketchRef.value) return;

    // sketchRef.value.delete([feature.id])
    sketchRef.value.deleteAll();
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
    // once: true, // imagery 标绘无法触发
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
    createIcon,
    createPoint,
    createPolyline,
    createCircle,
    createEllipse,
    createRect,
    createPolygon,
    createAttackArrow,
    createDoubleArrow,
    createThreeArrow,
    cancelDraw,
    clear,
  };
};

export default useMapboxSketch;
