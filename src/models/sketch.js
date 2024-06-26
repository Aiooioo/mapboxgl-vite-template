import { defineStore } from "pinia";
import { useMap } from "./map.js";
import { hasNextStep } from "@/components/overlay/SimpleDrawing/workflow.js";

const DefaultState = {
  defaultStep: 0,
  defaultFeature: null,
};

/**
 * Sketch Steps States Composition API
 *
 */
const useSketch = defineStore("sketch", {
  state() {
    return {
      currentStep: DefaultState.defaultStep,
      currentFeature: DefaultState.defaultFeature,

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

        featureDrawId: state.currentFeature?.id,
        feature: state.currentFeature,
      };
    },
  },

  actions: {
    onCompleteDrawFeature(feature) {
      this.currentFeature = feature;

      this.currentStep = 1;
    },

    cancelWorkflow() {},

    exitSketch() {
      // reset
      this.featureRemark = "";
      this.currentFeature = null;
      this.currentStep = 0;
    },

    saveAndExit() {
      if (!this.featureRemark) {
        this.currentFeature.properties.remark = this.featureRemark;
      }

      this.exitSketch();
    },

    goToNextStep() {
      if (hasNextStep(this.context)) {
        this.currentStep++;
      }
    },

    saveAndNext() {
      if (!this.featureRemark) {
        this.currentFeature.properties.remark = this.featureRemark;
      }

      this.goToNextStep();
    },
  },
});

export { useSketch };
