import { onUnmounted, watch } from "vue";
import { usePlotMapStore } from "@/models/plotMap";
import MapboxDraw2 from "@/utils/plugins/mapbox/MapboxDraw2";

export const usePlotMap = () => {
  let plotMap = null;
  let plotTool = null;

  const plotMapStore = usePlotMapStore();
  const { setPlotTool, setSelectedIds } = plotMapStore;

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
    plotTool.bindEvents("draw.create", onDrawComplete);
    plotTool.bindEvents("draw.select", onDrawSelect);

    setPlotTool(plotTool);
  };

  function onDrawComplete(evt) {
    // console.log("onDrawComplete--evt", evt);
    setSelectedIds([evt.features[0].id]);
  }

  function onDrawSelect(val) {
    console.log("draw.select--val", val);
    setSelectedIds(val.selectedIds);
  }

  function cancelDraw() {
    if (!plotTool) return;
    plotTool.changeMode("simple_select");
  }

  function destroyPlotTool() {
    if (plotTool && plotMap) {
      plotTool.destroy();
      plotTool = null;
    }
  }

  return {};
};
