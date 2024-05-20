import { defineStore } from "pinia";

const useMap = defineStore("map", {
  state: () => {
    return {
      ready: false,
    };
  },

  actions: {
    onViewReady() {
      this.ready = true;
    },
  },
});

export { useMap };
