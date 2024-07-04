import { defineStore } from "pinia";

let mapInst= null;

const useMap = defineStore("map", {
  state: () => {
    return {
      map: null,

      currentBasemapId: "arcgis-imagery",

      checkPointIconLoaded: false,

      ready: false,

      layerIds: [],

      activeBar: "",

      showZones: true,

      zone: "长沙市",
    };
  },

  actions: {
    onViewReady(map) {
      this.map = map;

      this.ready = true;
    },

    switchBasemap(basemapId) {
      this.currentBasemapId = basemapId;


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
