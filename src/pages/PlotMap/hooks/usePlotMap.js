import { onUnmounted, watch } from "vue";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import {
  unpackMapboxDraw,
  patchMapboxDraw,
} from "@/utils/plugins/mapbox/draw-style-hotfix.js";
import debugSupport from "@/utils/debug-support.js";
import PlotEdit from "@/utils/plugins/mapbox/ArrowPlot/PlotEdit";
import { usePlotMapStore } from "@/models/plotMap";

export const usePlotMap = () => {
  let plotMap = null;
  let plotTool = null;

  const plotMapStore = usePlotMapStore();
  const { setPlotTool, setPlotEdit } = plotMapStore;

  watch(
    () => plotMapStore.plotMap,
    (val) => {
      if (val) {
        plotMap = val;

        plotMap.on("load", () => {
          initPlotTool();

          initPlotEdit();
        });
      }
    }
  );

  onUnmounted(() => {
    destroyPlotTool();
  });

  const initPlotTool = () => {
    plotTool = new MapboxDraw({
      displayControlsDefault: true,
      userProperties: true,
      modes: {
        ...MapboxDraw.modes,
      },
    });

    setPlotTool(plotTool);

    plotMap.addControl(plotTool);

    debugSupport.set("mapbox-draw", plotTool);

    patchMapboxDraw(plotMap);

    plotMap.on("draw.create", onCreateComplete);
    plotMap.on("draw.text", onDrawTextComplete);

    // plotMap.on("click", (e) => {
    //   console.log("click", e);
    //   const features = plotMap.queryRenderedFeatures(e.point);
    //   console.log(features);

    //   // plotEdit
    // });
  };

  const initPlotEdit = () => {
    const plotEdit = new PlotEdit(plotMap);
    setPlotEdit(plotEdit);
  };

  function onCreateComplete(evt) {
    if (evt.features && evt.features.length > 0) {
      const drawId = evt.features[0].id;

      if (plotTool.get(drawId)) {
        plotTool.delete(drawId);
      }
    }
  }

  function onDrawTextComplete() {}

  function cancelDraw() {
    if (!plotTool) return;
    plotTool.changeMode("simple_select");
  }

  function destroyPlotTool() {
    if (plotTool && plotMap) {
      unpackMapboxDraw(plotMap);

      plotMap.removeControl(plotTool);

      plotMap.off("draw.create", onCreateComplete);
      plotMap.off("draw.text", onDrawTextComplete);
    }
  }

  return {};
};
