import { defineStore } from "pinia";
import * as turf from "@turf/turf";

export const usePlotMapStore = defineStore("plotMap", {
  state: () => ({
    plotMap: null,
    plotTool: null,
    selectedIds: [],
    curProject: null,
  }),
  actions: {
    setPlotMap(plotMap) {
      this.plotMap = plotMap;
    },

    setPlotTool(plotTool) {
      this.plotTool = plotTool;
    },

    setSelectedIds(selectedIds) {
      this.selectedIds = selectedIds;
    },

    changePlotMode(mode) {
      // console.log(this.plotTool);

      // mode
      // draw_text draw_icon draw_circle draw_ellipse
      // draw_rectangle draw_polygon draw_line_string
      // draw_attack_arrow draw_double_arrow draw_three_arrow
      this.plotTool.changeMode(mode);
    },

    setCurProject(project) {
      this.curProject = project;
    },

    mapZoomToExtend() {
      // console.log(this.curProject);
      const { east, south, west, north } = this.curProject;
      const p0 = turf.toWgs84(turf.point([west, south])).geometry.coordinates;
      const p1 = turf.toWgs84(turf.point([east, north])).geometry.coordinates;

      const bbox = [p0, p1];
      this.plotMap.fitBounds(bbox, {
        padding: { top: 10, bottom: 25, left: 15, right: 5 },
      });
    },
  },
});
