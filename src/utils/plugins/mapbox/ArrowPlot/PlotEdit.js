export default class PlotEdit {
  constructor(map) {
    this.map = map;
    this.plotEditLayer = null;

    this.initPlotEditLayer();
  }

  initPlotEditLayer() {
    const plotEditLayer = {
      id: "plot-edit-layer",
      type: "circle",
      source: {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [],
        },
      },
      paint: {
        "circle-color": "#008000",
        "circle-radius": 5,
        "circle-opacity": 0.5,
      },
    };

    this.map.addLayer(plotEditLayer);

    this.plotEditLayer = this.map.getLayer(plotEditLayer.id);
    this.plotEditLayer.on("click", this.handleClick);

    // console.log("PlotEdit layer added", this.plotEditLayer);
  }

  updatePlotEditSource(points) {
    const editSource = this.plotEditLayer.getSource();
    editSource.setData({
      type: "FeatureCollection",
      features: points.map((point) => {
        return {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: point,
          },
          properties: {
            name: "",
            description: "",
            color: "#008000",
          },
        };
      }),
    });
  }

  handleClick = (e) => {
    const features = this.plotEditLayer.queryRenderedFeatures(e.point, {
      layers: [this.plotEditLayer.id],
    });
    if (features.length) {
      const feature = features[0];
      const geometry = feature.geometry;
      const coordinates = geometry.coordinates;
      const popup = new mapboxgl.Popup({ closeOnClick: false })
        .setLngLat(coordinates)
        .setHTML(
          `
          <div>
            <h3>Edit Plot</h3>
            <form>
              <label for="name">Name:</label>
              <input type="text" id="name" value="${feature.properties.name}">
              <br>
              <label for="description">Description:</label>
              <textarea id="description" rows="4" cols="50">${feature.properties.description}</textarea>
              <br>
              <label for="color">Color:</label>
              <input type="color" id="color" value="${feature.properties.color}">
              <br>
              <button type="button" id="save">Save</button>
            </form>
          </div>
        `
        )
        .addTo(this.map);
      const saveButton = popup.getElement().querySelector("#save");
      saveButton.addEventListener("click", () => {
        const name = popup.getElement().querySelector("#name").value;
        const description = popup
          .getElement()
          .querySelector("#description").value;
        const color = popup.getElement().querySelector("#color").value;
        feature.properties.name = name;
        feature.properties.description = description;
        feature.properties.color = color;
        this.plotLayer.changed();
        popup.remove();
      });
    }
  };
}
