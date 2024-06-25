import { defineStore } from "pinia";

export const useImageryStore = defineStore("imagery", {
  state: () => ({
    enableDraw: false,
  }),
  actions: {
    toggelEnableDraw() {
      this.enableDraw = !this.enableDraw;
    },
  },
});
