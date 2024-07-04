import { ref, watch } from "vue";
import { useMap } from "@/models/map.js";

const useMapboxLayer = (item) => {
  const status = ref("loading");
  const layerRef = ref(null);
  const mapStore = useMap();

  function addToMap(info) {
    const map = mapStore.map;
    if (!map) return;

    // console.log("add to map--info", info);

    map.addLayer(info);

    // map.addLayer({
    //   id: "wms-layer",
    //   type: "raster",
    //   source: {
    //     type: "raster",
    //     tiles: [
    //       // "http://192.168.0.239:8080/geoserver/gwc/service/wmts?layer=whgis%3Acar&style=&tilematrixset=WebMercatorQuad&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix={z}&TileCol={x}&TileRow={y}",
    //       "https://whps.gis.test/geoserver/gwc/service/wmts?layer=whgis%3Acar&style=&tilematrixset=WebMercatorQuad&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix={z}&TileCol={x}&TileRow={y}",
    //     ],
    //     tileSize: 256,
    //   },
    //   paint: {
    //     "raster-opacity": 0.9,
    //   },
    // });

    // map.addLayer({
    //   id: "wms-test-layer",
    //   type: "raster",
    //   source: {
    //     type: "raster",
    //     tiles: [
    //       "https://whps.gis.test/geoserver/whgis/wms?service=WMS&version=1.1.0&request=GetMap&layers=whgis%3Acar_target&bbox={bbox-epsg-3857}&width=663&height=768&srs=EPSG%3A3857&styles=&format=image/png&transparent=true",
    //     ],
    //     tileSize: 256,
    //   },
    //   paint: {},
    // });
  }

  function toogelLayerVisibility(isVisiable, info) {
    const map = mapStore.map;
    if (!map) return;

    const layerId = info.id;
    const source = map.getSource(layerId);

    if (source) {
      map.setLayoutProperty(
        layerId,
        "visibility",
        isVisiable ? "visible" : "none"
      );
    } else {
      addToMap(info);
    }
  }

  function removeFromMap() {
    if (!mapStore.map) return;

    const map = mapStore.map;

    // map.setLayoutProperty("wms-layer", "visibility", "none"); // hide layer
  }

  function onMapReady() {
    //
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
