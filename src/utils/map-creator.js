import mapboxgl from "mapbox-gl";
import MapGlUtils from "map-gl-utils";
import basemapCreator from "./basemap-creator.js";

function buildStyleObject() {
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
}

function createMapControls(map) {
  const nav = new mapboxgl.NavigationControl();

  const fullscreen = new mapboxgl.FullscreenControl({
    container: document.querySelector("body"),
  });

  const scalebar = new mapboxgl.ScaleControl();

  map.addControl(nav);
  map.addControl(fullscreen);
  map.addControl(scalebar);
}

export default {
  createMap(viewDiv) {
    const initProps = window.gisApiConfig.initialViewProps;

    const map = new mapboxgl.Map({
      container: viewDiv,
      // style: "mapbox://styles/mapbox/streets-v12",
      style: buildStyleObject(),
      ...initProps,
    });

    MapGlUtils.init(map);

    createMapControls(map);

    return map;
  },
};
