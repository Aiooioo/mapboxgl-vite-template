import { shallowReadonly } from "vue";
import { defineStore } from "pinia";

class LayerCollection {
  constructor() {
    this.layers = new Map();
  }

  #getInternal(id) {
    if (id === null) throw new Error("ID is required.");

    let layer = this.layers.get(id);

    if (layer == null) {
      // create and set
    }

    return layer;
  }

  async get(id) {
    const layer = this.#getInternal(id);

    if (!layer.loaded) await layer.loadData();

    return layer;
  }

  clear() {
    this.layers = new Map();
  }
}

const useLayerCollection = defineStore("layer-collection", {
  state() {
    return {
      internalData: shallowReadonly(new LayerCollection()),

      layers: [],
    };
  },
});

export { useLayerCollection };
