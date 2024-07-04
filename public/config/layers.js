(function () {
  window.mockCatalog = [
    {
      label: "测试影像",
      layers: [
        {
          label: "测试区域影像",
          origin: {
            id: "wmts-layer-test",
            type: "raster",
            source: {
              type: "raster",
              tiles: [
                // "http://192.168.0.239:8080/geoserver/gwc/service/wmts?layer=whgis%3Acar&style=&tilematrixset=WebMercatorQuad&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix={z}&TileCol={x}&TileRow={y}",
                "https://whps.gis.test/geoserver/gwc/service/wmts?layer=whgis%3Acar&style=&tilematrixset=WebMercatorQuad&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix={z}&TileCol={x}&TileRow={y}",
              ],
              tileSize: 256,
            },
            paint: {
              "raster-opacity": 0.7,
            },
          },
          result: {
            id: "wms-layer-test",
            type: "raster",
            source: {
              type: "raster",
              tiles: [
                "https://whps.gis.test/geoserver/whgis/wms?service=WMS&version=1.1.0&request=GetMap&layers=whgis%3Acar_target&bbox={bbox-epsg-3857}&width=663&height=768&srs=EPSG%3A3857&styles=&format=image/png&transparent=true",
              ],
              tileSize: 256,
            },
            paint: {},
          },
        },
      ],
    },
    {
      label: "Landsat 9",
      layers: [
        {
          label: "NLCDLandCover2001",
          url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/NLCDLandCover2001/ImageServer",
        },
      ],
    },
    {
      label: "GF-1",
      layers: [
        {
          label: "World_Terrain_BaseTile",
          url: "https://services.arcgisonline.com/arcgis/rest/services/World_Terrain_Base/MapServer",
        },
      ],
    },
    {
      label: "GF-2",
    },
    {
      label: "GF-4",
    },
    {
      label: "IKONOS",
    },
    {
      label: "Jilin-1",
    },
    {
      label: "PlanetScope",
    },
    {
      label: "Pleiades 1",
    },
    {
      label: "Sentinel 2 MSI",
    },
  ];
})();
