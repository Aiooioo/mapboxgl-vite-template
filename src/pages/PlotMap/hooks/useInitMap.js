import { onMounted, onUnmounted } from "vue";
import { configMapboxGL } from "@/utils/map-init.js";
import mapCreator from "@/utils/map-creator.js";
import debugSupport from "@/utils/debug-support.js";
import { usePlotMapStore } from "@/models/plotMap";

export const useInitMap = (container) => {
  const plotMapStore = usePlotMapStore();
  const { setPlotMap } = plotMapStore;

  let plotMap = null;

  onMounted(() => {
    if (!container.value) return;

    configMapboxGL();

    plotMap = mapCreator.createMap(container.value);

    debugSupport.set("map", plotMap);

    // customize map options
    plotMap.dragRotate.disable();
    plotMap.touchZoomRotate.disableRotation();

    setPlotMap(plotMap);
  });

  onUnmounted(() => {});

  const getMapInfo = () => {
    const map = plotMap;
    const bounds = map.getBounds();

    console.log("bounds", bounds);

    let maxWidth = 100; // mapbox源码中默认值为100
    let y = map._containerHeight / 2;
    let x = map._containerWidth / 2 - maxWidth / 2;
    let left = map.unproject([x, y]);
    let right = map.unproject([x + maxWidth, y]);
    let scale = Math.floor(left.distanceTo(right));

    console.log("scale", scale);
  };

  return {
    getMapInfo,
  };
};
