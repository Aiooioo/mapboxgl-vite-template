import { defineStore } from "pinia";
import { useSketch } from "./sketch.js";
import * as defaults from "@/components/overlay/SymbolStyler/support/defaults.js";

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
      }
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
      };
    },
  },
});

export { useSymbol, useTextSymbol, useFillSymbol, useLineSymbol };
