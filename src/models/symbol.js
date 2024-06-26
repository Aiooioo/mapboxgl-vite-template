import { defineStore } from "pinia";
import { useSketch } from "./sketch.js";
import * as defaults from "@/components/overlay/SymbolStyler/support/defaults.js";

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
        case "text": {
          return this.textSymbol;
        }
      }
    },

    fillSymbol(state) {
      const fill = useFillSymbol();

      return { ...fill };
    },

    textSymbol() {
      const text = useTextSymbol();

      return { ...text };
    },
  },
});

export { useSymbol };
