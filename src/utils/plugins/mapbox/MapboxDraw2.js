import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { MapboxDrawExtends } from "./MapboxDrawExtends";
import MapboxDrawEdit from "./MapboxDrawEdit";
import { renderFeatureLayer } from "./renders/index";

export default class MapboxDraw2 {
  constructor({ map, canEdit }) {
    this.map = map;
    this.canEdit = canEdit || true;
    this.draw = null;
    this.store = {};
    this.mode = null;
    this.edit = null;
    this.clickFunc = null;
    this.selectedIds = [];

    this.init();
  }

  init() {
    const draw = new MapboxDraw({
      displayControlsDefault: false,
      userProperties: true,
      modes: {
        ...MapboxDraw.modes,
        ...MapboxDrawExtends,
      },
    });
    this.draw = draw;

    this.map.addControl(draw);
    this.map.on("draw.create", this.onCreateComplete.bind(this));

    if (this.canEdit) {
      this.edit = new MapboxDrawEdit(this.map);
    }
  }

  changeMode(mode) {
    // mode
    // draw_text draw_icon draw_circle draw_ellipse
    // draw_rectangle draw_polygon draw_line_string
    // draw_attack_arrow draw_double_arrow draw_three_arrow
    this.draw.changeMode(mode);
    this.mode = mode;

    this.map.off("click", this.clickFunc);
  }

  onCreateComplete(values) {
    // 移除默认的绘制要素
    const featureId = values.features[0].id;
    this.draw.delete(featureId);

    this.store[featureId] = values;

    // 绘制自定义要素
    const params = {
      map: this.map,
      mode: this.mode,
      features: values.features,
    };
    renderFeatureLayer(params);

    // 绑定点击事件
    if (this.canEdit) {
      const clickFunc = this.onClickFeature.bind(this);
      this.clickFunc = clickFunc;

      // 绘制完成时会立即触发 click 事件，需要延迟绑定
      setTimeout(() => {
        this.map.on("click", clickFunc);
      }, 500);
    }
  }

  onClickFeature(evt) {
    //   console.log("click", e);
    const features = this.map.queryRenderedFeatures(evt.point);
    // console.log(features);

    if (features.length > 0) {
      const ids = Object.keys(this.store);
      const idsFilter = ids.filter((id) => {
        const feats = features.filter((feat) => feat.source.includes(id));
        return feats.length;
      });

      this.selectedIds = idsFilter;

      for (let i = 0; i < idsFilter.length; i++) {
        // 控制点绘制，目前只有箭头有
        const controlPnts = this.store[idsFilter[i]].controlPnts;
        if (controlPnts) {
          this.edit.updateEditSource(controlPnts);
          return;
        }
      }
    } else {
      this.selectedIds = [];
    }

    // 借用 mapbox 事件系统，注册选中事件
    this.map.fire("draw.select", { selectedIds: this.selectedIds });
  }

  destroy() {
    if (this.canEdit) {
      this.map.off("click", this.clickFunc);
    }

    this.map.removeControl(this.draw);

    this.draw = null;
    this.store = {};
    this.mode = null;
    this.edit = null;
    this.clickFunc = null;
    this.selectedIds = [];
  }
}
