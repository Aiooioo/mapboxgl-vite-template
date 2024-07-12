import { shallowRef } from "vue";
import { defineStore } from "pinia";

const useMap = defineStore("map", {
  state: () => {
    return {
      map: shallowRef(null),

      currentBasemapId: "arcgis-imagery",

      checkPointIconLoaded: false,

      ready: false,

      layerIds: [],

      activeBar: "",

      showZones: true,
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
  },
});

export { useMap };
