import { defineStore } from "pinia";
import { useSketch } from "./sketch.js";
import * as defaults from "@/components/overlay/SymbolStyler/support/defaults.js";

const usePointSymbol = defineStore("symbol-point", {
  state() {
    return {
      pointColor: defaults.DefaultPointColor,
      pointSize: defaults.DefaultPointSize,
      pointStrokeColor: defaults.DefaultPointStroke,
      pointStrokeWidth: defaults.DefaultPointStrokeWidth,
    };
  },
});

const useLineSymbol = defineStore("symbol-line", {
  state() {
    return {
      strokeColor: defaults.DefaultPolygonOutline,
      strokeWidth: defaults.DefaultPolygonOutlineWidth,
    };
  },
});

const useTextSymbol = defineStore("symbol-text", {
  state() {
    return {
      color: defaults.DefaultTextFillColor,
      fontSize: defaults.DefaultTextFontSize,
      haloColor: defaults.DefaultTextHaloColor,
      haloSize: defaults.DefaultTextHaloSize,
      textRotate: defaults.DefaultTextRotateDegree,
    };
  },
});

const useFillSymbol = defineStore("symbol-fill", {
  state() {
    return {
      fillColor: defaults.DefaultPolygonFill,
      fillOpacity: defaults.DefaultPolygonFillOpacity,
      strokeColor: defaults.DefaultPolygonOutline,
      strokeWidth: defaults.DefaultPolygonOutlineWidth,
    };
  },
});

const useSymbol = defineStore("symbol", {
  state() {
    return {};
  },

  getters: {
    sketchSymbolPaint(state) {
      const sketchStore = useSketch();
      switch (sketchStore.context.geometryType) {
        case "rect":
        case "polygon":
        case "circle":
        case "ellipse": {
          return this.fillSymbol;
        }
        case "polyline": {
          return this.lineSymbol;
        }
        case "text": {
          return this.textSymbol;
        }
        case "point": {
          return this.pointSymbol;
        }
      }
    },

    pointSymbol() {
      const point = usePointSymbol();

      return {
        color: point.pointColor,
        size: point.pointSize,
        strokeColor: point.pointStrokeColor,
        strokeWidth: point.pointStrokeWidth,
      };
    },

    lineSymbol() {
      const line = useLineSymbol();

      return {
        strokeColor: line.strokeColor,
        strokeWidth: line.strokeWidth,
      };
    },

    fillSymbol(state) {
      const fill = useFillSymbol();

      return {
        fillColor: fill.fillColor,
        fillOpacity: fill.fillOpacity,
        strokeColor: fill.strokeColor,
        strokeWidth: fill.strokeWidth,
      };
    },

    textSymbol() {
      const text = useTextSymbol();

      return {
        color: text.color,
        fontSize: text.fontSize,
        haloColor: text.haloColor,
        haloSize: text.haloSize,
        rotate: text.textRotate,
      };
    },
  },
});

export {
  useSymbol,
  usePointSymbol,
  useTextSymbol,
  useFillSymbol,
  useLineSymbol,
};
