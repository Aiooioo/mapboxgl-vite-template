import { defineStore } from "pinia";

const useMap = defineStore("map", {
  state: () => {
    return {
      map: null,

      ready: false,

      layerIds: [],
    };
  },

  actions: {
    onViewReady(map) {
      this.map = map;

      this.ready = true;
    },
  },
});

export { useMap };
