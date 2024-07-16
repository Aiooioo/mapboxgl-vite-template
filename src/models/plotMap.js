import { defineStore } from "pinia";

export const usePlotMapStore = defineStore("plotMap", {
  state: () => ({
    plotMap: null,
    plotTool: null,
    plotEdit: null,
    plots: [],
  }),
  actions: {
    setPlotMap(plotMap) {
      this.plotMap = plotMap;
    },

    setPlotTool(plotTool) {
      this.plotTool = plotTool;
    },

    changePlotMode(mode) {
      // console.log(this.plotTool);

      // mode
      // draw_text draw_icon draw_circle draw_ellipse
      // draw_rectangle draw_polygon draw_line_string
      // draw_attack_arrow draw_double_arrow draw_three_arrow
      this.plotTool.changeMode(mode);
    },

    setPlotEdit(plotEdit) {
      this.plotEdit = plotEdit;
    },

    addPlot(plot) {
      this.plots.push(plot);
    },

    deletePlot(plot) {
      const index = this.plots.indexOf(plot);
      if (index > -1) {
        this.plots.splice(index, 1);
      }
    },

    updatePlot(plot) {},
  },
});
