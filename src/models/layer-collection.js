import { shallowReadonly } from "vue";
import { defineStore } from "pinia";
import { Layer } from "./layer.js";
import _ from "lodash";
import {
  DefaultLayerTypeGeoJSON,
  EmptyGeoJSONFeature,
} from "@/common/system-const.js";
import { getLayerTemplate } from "@/common/webmap-template.js";
import idGen from "@/utils/id-generator.js";

function convertLayerCollectionFromWebmapData(webmapLayers) {
  return _.map(webmapLayers, (layer) => {
    return {
      id: layer.id,
      name: layer.name,
      visible: layer.visible,
    };
  });
}

class LayerCollection {
  constructor() {
    this.layers = new Map();
  }

  create(template, properties, data) {
    if (!template) {
      throw new Error("必须为Layer对象指定一个数据模板");
    }

    const layerTemplate = getLayerTemplate(template);
    if (!layerTemplate) {
      throw new Error("未知的图层类型模板");
    }

    const id = `client-id-${idGen.next()}`;
    const layer = new Layer({
      id,
      type: layerTemplate.type || DefaultLayerTypeGeoJSON,
    });

    // layer properties
    properties = properties || {};
    properties.name = properties.name || layerTemplate.name;
    properties.style = { ...layerTemplate.style, ...properties.style };

    // layer data
    const layerData = data || EmptyGeoJSONFeature;
    if (layerData.geometry && !layerData.geometry.type) {
      layerData.geometry = {
        type: layerTemplate.geometryType,
        coordinates: [],
      };
    }

    layer.properties = properties;
    layer.data = layerData;

    layer.loaded = true;

    this.layers.set(id, layer);

    return layer;
  }

  #getInternal(id) {
    if (id === null) throw new Error("ID is required.");

    let layer = this.layers.get(id);

    if (layer == null) {
      // create and set
      layer = new Layer({ id });
      this.layers.set(id, layer)
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

      isLayersLoaded: false,
    };
  },

  actions: {
    loadLayerCollectionsFromWebmap(webmap) {
      this.layers = convertLayerCollectionFromWebmapData(webmap.layers);

      this.internalData.clear();

      _.each(webmap.layers, (lyr) => {
        this.internalData.create(lyr);
      });
    },
  },
});

export { useLayerCollection };
