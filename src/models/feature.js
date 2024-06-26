import { defineStore } from "pinia";
import { useSketch } from "./sketch.js";

const DefaultText = "";

const useIconFeature = defineStore("feature-icon", {
  state() {
    return {
      iconName: "",

      iconSize: "",
    };
  },
});

const useTextFeature = defineStore("feature-text", {
  state() {
    return {
      text: "文字标注",

      textSize: "",
      textColor: "",

      textHalo: "",
    };
  },
});

const useFeature = defineStore("feature", {
  state() {
    return {
      remark: "",
    };
  },

  getters: {
    featureProps(state) {
      const sketchStore = useSketch();

      if (sketchStore.context.feature) {
        switch (sketchStore.context.geometryType) {
          case "text":
            return this.textFeatureProps(state);
        }
      }
      return null;
    },

    textFeatureProps(state) {
      const textFt = useTextFeature();

      return { text: textFt.text };
    },
  },
});

export { useFeature };
