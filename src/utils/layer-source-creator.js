import _ from "lodash";
import qs from "qs";
import idGenerator from "./id-generator.js";

const tdtVecUrl =
  "http://t0.tianditu.com/vec_w/wmts?tk=317e52a409b6b382957e09003ee7e235";
const tdtImgUrl =
  "http://t0.tianditu.com/img_w/wmts?tk=317e52a409b6b382957e09003ee7e235";
const tdtCvaUrl =
  "http://t0.tianditu.com/cva_w/wmts?tk=317e52a409b6b382957e09003ee7e235";

const tdtWmtsParams = {
  SERVICE: "WMTS",
  REQUEST: "GetTile",
  VERSION: "1.0.0",
  STYLE: "default",
  TILEMATRIXSET: "w",
  TILEMATRIX: "{z}",
  TILEROW: "{y}",
  TILECOL: "{x}",
  FORMAT: "tiles",
};

export default {
  createLayerFromId(id) {
    switch (id) {
      case "tdt-vec":
        return {
          type: "raster",
          tiles: [
            tdtVecUrl +
              "&" +
              qs.stringify(
                {
                  ...tdtWmtsParams,
                  LAYER: "vec",
                },
                {
                  encode: false,
                },
              ),
          ],
          tileSize: 256,
        };
      case "tdt-img":
        return {
          type: "raster",
          tiles: [
            tdtImgUrl +
              "&" +
              qs.stringify(
                {
                  ...tdtWmtsParams,
                  LAYER: "img",
                },
                {
                  encode: false,
                },
              ),
          ],
          tileSize: 256,
        };
      case "tdt-cva":
        return {
          type: "raster",
          tiles: [
            tdtCvaUrl +
              "&" +
              qs.stringify(
                {
                  ...tdtWmtsParams,
                  LAYER: "cva",
                },
                {
                  encode: false,
                },
              ),
          ],
          tileSize: 256,
        };
      default:
        break;
    }
  },

  createLayerFromConfig(config) {
    if (!config || (!config.id && !config.url)) {
      return null;
    }

    if (config.id) {
      let layerSources = [];

      if (Array.isArray(config.id)) {
        _.each(config.id, (i) => {
          const layer = this.createLayerFromId(i);
          layerSources.push({
            key: "layer-by-id-" + idGenerator.next(),
            id: i,
            layer,
          });
        });
      } else {
        const layer = this.createLayerFromId(config.id);
        layerSources.push({
          key: "layer-by-id-" + idGenerator.next(),
          id: config.id,
          layer,
        });
      }

      return layerSources;
    }
  },
};
