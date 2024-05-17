import mapboxgl from "mapbox-gl";

export function configMapboxGL() {
  mapboxgl.accessToken = window.gisApiConfig.token;
}
