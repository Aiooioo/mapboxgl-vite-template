import { defineStore } from "pinia";

export const usePlotMapStore = defineStore("plotMap", {
  state: () => ({
    plotMap: null,
    plots: [],
  }),
  actions: {
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
