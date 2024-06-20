<template>
  <div class="feature-symbol__styler-color">
    <div class="feature-symbol__styler-color-row">
      <div class="feature-symbol__styler-color-row-label">填充</div>
      <div class="feature-symbol__styler-color-row-value">
        <div class="feature-symbol__styler-color-thumb">
          <n-color-picker
            v-model:value="colors.fill"
            :modes="['rgb']"
            :show-alpha="false"
          ></n-color-picker>
        </div>
      </div>
    </div>
    <div class="feature-symbol__styler-color-row">
      <div class="feature-symbol__styler-color-row-label">填充透明度</div>
      <div class="feature-symbol__styler-color-row-value">
        <n-slider
          v-model:value="colors.fillOpacity"
          :min="0"
          :max="1"
          :step="0.1"
        />
      </div>
    </div>
    <div class="feature-symbol__styler-color-row">
      <div class="feature-symbol__styler-color-row-label">边框</div>
      <div class="feature-symbol__styler-color-row-value">
        <div class="feature-symbol__styler-color-thumb">
          <n-color-picker
            v-model:value="colors.stroke"
            :modes="['rgb']"
            :show-alpha="false"
          ></n-color-picker>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from "vue";
import { NColorPicker, NSlider } from "naive-ui";
import { useSketch } from "@/models/sketch.js";
import {
  parseFeatureFillColor,
  parseFeatureStrokeColor,
  parseFeatureFillOpacity,
  updateFeatureFillColorNotSave,
  updateFeatureStrokeColorNotSave,
  updateFeatureOpacityNotSave,
  tempUpdateLayerPaint4Preview,
} from "./support/color-utils.js";

const sketchStore = useSketch();

const colors = reactive({
  fill: parseFeatureFillColor(sketchStore.context),
  fillOpacity: parseFeatureFillOpacity(sketchStore.context),
  stroke: parseFeatureStrokeColor(sketchStore.context),
});

watch(
  () => colors.fillOpacity,
  (value) => {
    updateFeatureOpacityNotSave(sketchStore.context, value);

    tempUpdateLayerPaint4Preview(sketchStore.context, "fill-opacity", value);
  },
);

watch(
  () => colors.fill,
  (value) => {
    updateFeatureFillColorNotSave(sketchStore.context, value);

    tempUpdateLayerPaint4Preview(sketchStore.context, "fill-color", value);
  },
);

watch(
  () => colors.stroke,
  (value) => {
    updateFeatureStrokeColorNotSave(sketchStore.context, value);

    tempUpdateLayerPaint4Preview(
      sketchStore.context,
      "fill-outline-color",
      value,
    );
  },
);
</script>

<style scoped lang="scss">
.feature-symbol__styler-color {
  display: flex;
  flex-direction: column;

  &-thumb {
  }

  &-row {
    margin-bottom: 16px;

    &-label {
      margin-bottom: 6px;
      font-size: 13px;
      font-weight: 500;
      color: $primary_text_color;
    }

    &-value {
      padding: 2px;
    }
  }
}
</style>
