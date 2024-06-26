<template>
  <div class="simple-drawing__pane">
    <div class="simple-drawing__pane-bar">
      <span
        :class="['simple-drawing__pane-bar-item']"
        @click="ensureCreateStatus(createPoint)"
      >
        <i-mdi-map-marker />
      </span>
      <span
        :class="['simple-drawing__pane-bar-item']"
        @click="ensureCreateStatus(createPolyline)"
      >
        <i-mdi-vector-line />
      </span>
      <span
        :class="['simple-drawing__pane-bar-item']"
        @click="ensureCreateStatus(createRect)"
      >
        <i-mdi-rectangle-outline />
      </span>
      <span
        :class="['simple-drawing__pane-bar-item']"
        @click="ensureCreateStatus(createCircle)"
      >
        <i-mdi-checkbox-blank-circle-outline />
      </span>
      <span
        :class="['simple-drawing__pane-bar-item']"
        @click="ensureCreateStatus(createEllipse)"
      >
        <i-mdi-ellipse-outline />
      </span>
      <span
        :class="['simple-drawing__pane-bar-item']"
        @click="ensureCreateStatus(createText)"
      >
        <i-mdi-format-text />
      </span>
      <span :class="['simple-drawing__pane-bar-item']">
        <i-mdi-arrow-top-right-bold-outline />
      </span>
    </div>
    <div
      v-if="sketchStore.currentStep !== 0"
      class="simple-drawing__pane-content"
    >
      <component :is="contentComps[displayContent]"></component>
    </div>
    <div
      v-if="sketchStore.currentStep !== 0"
      class="simple-drawing__pane-footer"
    >
      <span
        v-if="sketchStore.currentStep === 1"
        class="simple-drawing__pane-action simple-drawing__pane-action-delete"
      >
        <i-mdi-delete />
      </span>
      <span class="simple-drawing__pane-footer-last">
        <span
          v-if="sketchStore.currentStep !== 2"
          class="simple-drawing__pane-action simple-drawing__pane-action-minor"
          @click="sketchStore.saveAndNext"
        >
          <i-mdi-color style="margin-right: 4px" />继续设置样式
        </span>
        <span
          class="simple-drawing__pane-action simple-drawing__pane-action-primary"
          @click="sketchStore.saveAndExit"
        >
          <i-mdi-content-save-outline style="margin-right: 4px" /> 保 存
        </span></span
      >
    </div>
  </div>
</template>

<script setup>
import { computed, watch } from "vue";
import FeatureEditor from "@/components/overlay/SimpleDrawing/FeatureEditor.vue";
import FeatureStyler from "@/components/overlay/SymbolStyler/FeatureStyler.vue";
import useMapboxSketch from "@/utils/hooks/useMapboxSketch.js";
import { useSketch } from "@/models/sketch.js";
import { useFeatureProps } from "./useFeatureProps.js";
import setupWorkflow from "./workflow.js";

const sketchStore = useSketch();

const { $channel: $feature } = useFeatureProps(sketchStore.context);
const {
  activeTool,
  $channel: $sketch,
  completeFeature,
  createText,
  createRect,
  createPolyline,
  createEllipse,
  createCircle,
  createPoint,
} = useMapboxSketch();

const contentComps = {
  "prop-editor": FeatureEditor,
  "style-editor": FeatureStyler,
};

const displayContent = computed(() => {
  if (sketchStore.currentStep === 1) {
    return "prop-editor";
  } else if (sketchStore.currentStep === 2) {
    return "style-editor";
  }
});

function checkCurrentStatus() {
  return new Promise((resolve, reject) => {
    if (sketchStore.currentStep === 1) {
    }

    resolve();
  });
}

function ensureCreateStatus(createFn) {
  checkCurrentStatus().then(createFn);
}

setupWorkflow($sketch, $feature);
watch(completeFeature, (value) => {
  if (value) {
    sketchStore.onCompleteDrawFeature(value);
  }
});
</script>

<style scoped lang="scss">
.simple-drawing__pane {
  display: flex;
  flex-direction: column;

  &-bar {
    padding: 6px 0;
    height: 36px;
    border-radius: 6px;
    display: flex;
    background: $secondary_bg_color;
    color: $primary_text_color;

    &-item {
      flex: 1;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      cursor: pointer;

      &:not(:last-child) {
        border-right: 2px solid $secondary_text_color;
      }
    }
  }

  &-content {
    padding: 15px 0;
  }

  &-footer {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &-last {
      display: flex;
      align-items: center;
    }
  }

  &-action {
    margin-left: 8px;
    height: 28px;
    min-width: 72px;
    padding: 0 6px;
    border-radius: 6px;
    font-size: 13px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  &-action-delete {
    width: 28px;
    min-width: unset;
    border-radius: 50%;
    background: crimson;
    color: $primary_text_color;
  }
  &-action-primary {
    background: $secondary_bg_color;
    color: $primary_text_color;
  }
  &-action-minor {
    background: transparent;
    border: 1px solid $primary_bg_color;
    color: $primary_bg_color;
  }
}
</style>
