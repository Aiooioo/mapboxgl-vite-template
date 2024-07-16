import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { MapboxDrawExtends } from "./MapboxDrawExtends";
import MapboxDrawEdit from "./MapboxDrawEdit";
import { renderFeatureLayer } from "./renders/index";

export default class MapboxDraw2 {
  constructor({ map, canEdit }) {
    this.map = map;
    this.canEdit = canEdit;
    this.draw = null;
    this.store = null;
    this.mode = null;
    this.edit = null;
    this.clickFunc = null;

    this.init();
    this.bindEvents();

    if (canEdit) {
      this.edit = new MapboxDrawEdit(map);
    }
  }

  init() {
    const draw = new MapboxDraw({
      displayControlsDefault: true,
      userProperties: true,
      modes: {
        ...MapboxDraw.modes,
        ...MapboxDrawExtends,
      },
    });

    this.map.addControl(draw);
    this.draw = draw;
  }

  changeMode(mode) {
    // mode
    // draw_text draw_icon draw_circle draw_ellipse
    // draw_rectangle draw_polygon draw_line_string
    // draw_attack_arrow draw_double_arrow draw_three_arrow
    this.draw.changeMode(mode);
    this.mode = mode;

    console.log("change-mode", mode);
    this.map.off("click", this.clickFunc);
  }

  bindEvents() {
    this.map.on("draw.create", this.onCreateComplete.bind(this));
  }

  onCreateComplete(values) {
    console.log("onCreateComplete--values", values);

    // 移除默认的绘制要素
    const featureId = values.features[0].id;
    this.draw.delete(featureId);

    const params = {
      map: this.map,
      mode: this.mode,
      features: values.features,
    };

    renderFeatureLayer(params);

    const clickFunc = this.onClickFeature.bind(this);
    this.map.on("click", clickFunc);

    this.clickFunc = clickFunc;
  }

  onClickFeature(evt) {
    //   console.log("click", e);
    const features = this.map.queryRenderedFeatures(evt.point);
    console.log(features);
  }
}
