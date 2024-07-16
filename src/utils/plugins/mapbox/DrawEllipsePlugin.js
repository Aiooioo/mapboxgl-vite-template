import MapboxDraw from "@mapbox/mapbox-gl-draw";

const doubleClickZoom = {
  enable: (ctx) => {
    setTimeout(() => {
      if (
        !ctx.map ||
        !ctx.map.doubleClickZoom ||
        !ctx._ctx ||
        !ctx._ctx.store ||
        !ctx._ctx.store.getInitialConfigValue
      ) {
        return;
      }

      if (!ctx._ctx.store.getInitialConfigValue("doubleClickZoom")) return;

      ctx.map.doubleClickZoom.enable();
    }, 0);
  },
  disable: (ctx) => {
    setTimeout(() => {
      if (!ctx.map || !ctx.map.doubleClickZoom) return;

      ctx.map.doubleClickZoom.disable();
    }, 0);
  },
};

export const DrawEllipse = {
  onSetup: function (opts) {
    this.eccentricity =
      opts.eccentricity >= 0 && opts.eccentricity < 1 ? opts.eccentricity : 0.8;
    this.divisions = opts.divisions || 60;

    const ellipse = this.newFeature({
      type: "Feature",
      properties: {},
      geometry: {
        type: "Polygon",
        coordinates: [[]],
      },
    });

    this.addFeature(ellipse);
    this.clearSelectedFeatures();
    doubleClickZoom.disable(this);
    this.updateUIClasses({ mouse: "add" });
    this.setActionableState({
      trash: true,
    });

    return {
      ellipse,
    };
  },

  onClick: function (state, e) {
    if (
      state.center &&
      state.center[0] !== e.lngLat.lng &&
      state.center[1] !== e.lngLat.lat
    ) {
      this.updateUIClasses({ mouse: "pointer" });
      this.changeMode("simple_select", { featuresId: state.ellipse.id });
    }

    state.center = [e.lngLat.lng, e.lngLat.lat];
  },

  onMouseMove: function (state, e) {
    if (state.center) {
      const xRadius = Math.sqrt(
        (e.lngLat.lng - state.center[0]) ** 2 +
          (e.lngLat.lat - state.center[1]) ** 2
      );
      const yRadius = xRadius * Math.sqrt(1 - this.eccentricity ** 2);

      const radian = Math.atan2(
        e.lngLat.lat - state.center[1],
        e.lngLat.lng - state.center[0]
      );

      const twoPi = Math.PI * 2;

      for (let i = 0; i < this.divisions; i++) {
        const t = i / this.divisions;
        const angle = t * twoPi;

        let x = state.center[0] + xRadius * Math.cos(angle);
        let y = state.center[1] + yRadius * Math.sin(angle);

        if (radian !== 0) {
          const cos = Math.cos(radian);
          const sin = Math.sin(radian);

          const tx = x - state.center[0];
          const ty = y - state.center[1];

          // 围绕椭圆中心旋转点。
          x = tx * cos - ty * sin + state.center[0];
          y = tx * sin + ty * cos + state.center[1];
        }

        // 更新要素坐标
        state.ellipse.updateCoordinate("0." + i, x, y);
      }
    }
  },
  onKeyUp: function (state, e) {
    if (e.keyCode === 27) return this.changeMode("simple_select");
  },
  onStop: function (state) {
    doubleClickZoom.enable(this);
    this.updateUIClasses({ mouse: "none" });
    this.activateUIButton();

    // 检查我们是否删除了此要素
    if (this.getFeature(state.ellipse.id) === undefined) return;

    if (state.ellipse.isValid()) {
      this.map.fire("draw.create", {
        features: [state.ellipse.toGeoJSON()],
        mode: "draw_ellipse",
      });
    } else {
      this.deleteFeature([state.ellipse.id], { silent: true });
      this.changeMode("simple_select", {}, { silent: true });
    }
  },

  toDisplayFeatures: function (state, geojson, display) {
    const isActivePolygon = geojson.properties.id === state.ellipse.id;
    geojson.properties.active = isActivePolygon ? "true" : "false";
    if (!isActivePolygon) return display(geojson);

    if (!state.center) return;
    return display(geojson);
  },
  onTrash: function (state) {
    this.deleteFeature([state.ellipse.id], { silent: true });
    this.changeMode("simple_select");
  },
};

class DrawEllipsePlugin {
  constructor() {
    this.modes = MapboxDraw.modes;
  }

  attach() {
    const modes = MapboxDraw.modes;
    modes.draw_ellipse = DrawEllipse;
  }
}

export default DrawEllipsePlugin;
