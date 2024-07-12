import { defineStore } from "pinia";
import { useMap } from "@/models/map.js";

const useWebmap = defineStore("webmap", {
  state() {
    return {
      id: "",
      name: "新的工程",
    };
  },

  getters: {
    dirty(state) {
      const mapStore = useMap();
    },
  },

  actions: {
    initWebmapFromRemoteData(data) {
      this.id = data.id;
      this.name = data.name;
    },
  },
});

export { useWebmap };
