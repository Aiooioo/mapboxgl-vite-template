import mapboxgl from "mapbox-gl";
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

  map.addControl(nav);
  map.addControl(fullscreen);
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

    createMapControls(map);

    return map;
  },
};
