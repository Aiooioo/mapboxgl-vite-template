import { ref, watch } from "vue";
import { useMap } from "@/models/map.js";

const useMapboxLayer = (item) => {
  const status = ref("loading");
  const layerRef = ref(null);
  const mapStore = useMap();

  function addToMap() {
    if (!mapStore.map) return;

    const map = mapStore.map;

    map.addSource("wms-source", {
      type: "raster",
      tiles: [
        "http://192.168.0.239:8080/geoserver/gwc/service/wmts?layer=whgis%3Acar&style=&tilematrixset=WebMercatorQuad&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix={z}&TileCol={x}&TileRow={y}",
        // "http://192.168.0.239:8080/geoserver/gwc/service/wmts?layer=whgis%3Acar&style=&tilematrixset=WebMercatorQuad&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=22&TileCol=3426017&TileRow=1826204",
      ],
      tileSize: 256,
    });
    map.addLayer({
      id: "wms-layer",
      type: "raster",
      source: "wms-source",
      paint: {
        "raster-opacity": 0.9,
      },
    });
  }

  function toogelLayerVisibility(isVisiable) {
    if (!mapStore.map) return;

    const map = mapStore.map;

    const source = map.getSource("wms-source");

    if (source) {
      map.setLayoutProperty(
        "wms-layer",
        "visibility",
        isVisiable ? "visible" : "none"
      );
    } else {
      addToMap();
    }
  }

  function removeFromMap() {
    if (!mapStore.map) return;

    const map = mapStore.map;

    map.setLayoutProperty("wms-layer", "visibility", "none");
  }

  function onMapReady() {
    //
    addToMap();
  }

  watch(() => !!mapStore.ready, onMapReady, {
    once: true,
  });

  return {
    status,
    layer: layerRef,
    addToMap,
    removeFromMap,
    toogelLayerVisibility,
  };
};

export { useMapboxLayer };
