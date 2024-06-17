import { defineStore } from "pinia";

const useMap = defineStore("map", {
  state: () => {
    return {
      map: null,

      ready: false,

      layerIds: [],

      activeBar: '',

      showZones: true,

      zone: "长沙市",
    };
  },

  actions: {
    onViewReady(map) {
      this.map = map;

      this.ready = true;
    },

    switchActiveTool(toolName) {
      this.activeBar = toolName;
    },

    switchCurrentZone(current) {
      this.zone = current;
    },
  },
});

export { useMap };
