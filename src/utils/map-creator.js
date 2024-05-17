import mapboxgl from "mapbox-gl";
import _ from "lodash";
import basemapCreator from "./basemap-creator.js";

export default {
  _buildStyleObject() {
    const baseSources = basemapCreator.createBasemapSources();

    if (!baseSources) {
      return "mapbox://styles/mapbox/streets-v12";
    }

    const style = {
      version: 8,
      glyphs: "mapbox://fonts/mapbox/{fontstack}/{range}.pbf",
      ...baseSources,
    };

    return style;
  },

  createMap(viewDiv) {
    const initProps = window.gisApiConfig.initialViewProps;

    const map = new mapboxgl.Map({
      container: viewDiv,
      // style: "mapbox://styles/mapbox/streets-v12",
      style: this._buildStyleObject(),
      ...initProps,
    });

    return map;
  },
};
