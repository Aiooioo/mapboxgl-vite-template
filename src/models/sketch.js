import { defineStore } from "pinia";
import { useMap } from "./map.js";

const useSketch = defineStore("sketch", {
  state() {
    return {
      currentStep: 0,
      currentFeature: null,

      featureRemark: "",
    };
  },

  getters: {
    context(state) {
      const mapStore = useMap();

      let geometryType = "";

      if (state.currentFeature) {
        geometryType = state.currentFeature.properties.sketch;
      }

      return {
        map: mapStore.map,

        geometryType,

        featureDrawId: state.currentFeature.id,
        feature: state.currentFeature,
      };
    },
  },

  actions: {
    onCompleteDrawFeature(feature) {
      this.currentFeature = feature;

      this.currentStep = 1;
    },

    saveAndExit() {
      if (!this.featureRemark) {
        this.currentFeature.properties.remark = this.featureRemark;
      }

      // reset
      this.featureRemark = "";
      this.currentFeature = null;
      this.currentStep = 0;
    },

    saveAndNext() {
      if (!this.featureRemark) {
        this.currentFeature.properties.remark = this.featureRemark;
      }

      this.currentStep++;
    },
  },
});

export { useSketch };
