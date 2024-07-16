import { onUnmounted, watch } from "vue";
import { usePlotMapStore } from "@/models/plotMap";
import MapboxDraw2 from "@/utils/plugins/mapbox/MapboxDraw2";

export const usePlotMap = () => {
  let plotMap = null;
  let plotTool = null;

  const plotMapStore = usePlotMapStore();
  const { setPlotTool } = plotMapStore;

  watch(
    () => plotMapStore.plotMap,
    (val) => {
      if (val) {
        plotMap = val;

        plotMap.on("load", () => {
          initPlotTool();
        });
      }
    }
  );

  onUnmounted(() => {
    destroyPlotTool();
  });

  const initPlotTool = () => {
    plotTool = new MapboxDraw2({ map: plotMap });

    setPlotTool(plotTool);
  };

  function cancelDraw() {
    if (!plotTool) return;
    plotTool.changeMode("simple_select");
  }

  function destroyPlotTool() {
    if (plotTool && plotMap) {
      plotTool = null;
    }
  }

  return {};
};
