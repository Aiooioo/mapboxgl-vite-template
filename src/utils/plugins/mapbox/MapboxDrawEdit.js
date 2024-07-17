export default class MapboxDrawEdit {
  constructor(map) {
    this.map = map;
    this.plotEditLayer = null;
    this.plotEditLayerId = "draw-edit-layer";

    this.initPlotEditLayer();
  }

  initPlotEditLayer() {
    const plotEditLayer = {
      id: this.plotEditLayerId,
      type: "circle",
      source: {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [],
        },
      },
      paint: {
        "circle-color": "yellow",
        "circle-radius": 5,
        "circle-opacity": 0.5,
      },
    };

    this.map.addLayer(plotEditLayer);

    this.plotEditLayer = this.map.getLayer(plotEditLayer.id);
    this.plotEditLayer.on("click", this.handleClick);
  }

  updateEditSource(points) {
    const features = points.map((point) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: point,
      },
      properties: {},
    }));

    // console.log(features);

    const data = {
      type: "FeatureCollection",
      features: features,
    };

    const editSource = this.map.getSource(this.plotEditLayerId);
    editSource.setData(data);
  }

  handleClick = (e) => {
    const features = this.plotEditLayer.queryRenderedFeatures(e.point, {
      layers: [this.plotEditLayer.id],
    });
  };
}
