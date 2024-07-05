import _ from "lodash";
import layerCreator from "./layer-source-creator.js";

export default {
  createBasemapSources() {
    if (
      !window.basemapConfig ||
      !Array.isArray(window.basemapConfig) ||
      window.basemapConfig.length === 0
    ) {
      return null;
    }

    const basemapSources = {};
    const basemapLayers = [];

    _.each(window.basemapConfig, (cfg) => {
      const layerSources = layerCreator.createLayerFromConfig(cfg);

      _.each(layerSources, (layerSrc) => {
        let layerSrcId = layerSrc.id || layerSrc.key;

        basemapSources[layerSrcId] = layerSrc.layer;

        if (!_.find(basemapLayers, (l) => l.id === layerSrcId)) {
          basemapLayers.push({
            id: layerSrc.key,
            type: layerSrc.layer.type,
            source: layerSrcId,
            layout: {
              visibility: !!cfg.default ? "visible" : "none",
            },
          });
        }
      });
    });

    return {
      sources: basemapSources,
      layers: basemapLayers,
    };
  },
};
