import { defineStore } from "pinia";

const useMap = defineStore("map", {
  state: () => {
    return {
      map: null,

      ready: false,

      layerIds: [],

      showZones: true,

      zone: "长沙市",
    };
  },

  actions: {
    onViewReady(map) {
      this.map = map;

      this.ready = true;
    },

    switchCurrentZone(current) {
      this.zone = current;
    },
  },
});

export { useMap };
