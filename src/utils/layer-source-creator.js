import _ from "lodash";
import qs from "qs";
import idGenerator from "./id-generator.js";

const tdtVecUrl = "https://basemaps.geosceneonline.cn/t/vec_w/wmts";
const tdtImgUrl = "https://basemaps.geosceneonline.cn/t/img_w/wmts";
const tdtCvaUrl = "https://basemaps.geosceneonline.cn/t/cva_w/wmts";
const agolImageryUrl =
  "https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer";
const agolImageryWmtsUrl =
  "https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/WMTS/tile/1.0.0/World_Imagery/default/default028mm/{z}/{y}/{x}.jpg";

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
      case "ArcGIS-World-Imagery":
        return {
          type: "raster",
          tiles: [agolImageryWmtsUrl],
          tileSize: 256,
        };
      case "ArcGIS-World-Basemap-V2":
        return {
          type: "vector",
          tiles: [
            "https://basemaps.arcgis.com/arcgis/rest/services/World_Basemap_v2/VectorTileServer/tile/{z}/{y}/{x}.pbf",
          ],
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
