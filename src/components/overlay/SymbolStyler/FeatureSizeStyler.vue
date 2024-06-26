<template>
  <div class="feature-symbol__styler-size">
    <template v-if="isFillSymbol">
      <div class="feature-symbol__styler-size-row">
        <div class="feature-symbol__styler-size-row-label">边框宽度</div>
        <div class="feature-symbol__styler-size-row-value">
          <n-slider
            v-model:value="fillSymbolStore.strokeWidth"
            :min="1"
            :max="4"
            :step="0.5"
          />
        </div>
      </div>
    </template>
    <template v-else-if="sketchStore.context.geometryType === 'text'">
      <div class="feature-symbol__styler-size-row">
        <div class="feature-symbol__styler-size-row-label">字号</div>
        <div class="feature-symbol__styler-size-row-value">
          <n-slider
            v-model:value="textSymbolStore.fontSize"
            :min="10"
            :max="20"
            :step="1"
          />
        </div>
      </div>
      <div class="feature-symbol__styler-size-row">
        <div class="feature-symbol__styler-size-row-label">光晕宽度</div>
        <div class="feature-symbol__styler-size-row-value">
          <n-slider
            v-model:value="textSymbolStore.haloSize"
            :min="1"
            :max="5"
            :step="0.5"
          />
        </div>
      </div>
    </template>
    <template v-else-if="sketchStore.context.geometryType === 'polyline'">
      <div class="feature-symbol__styler-size-row">
        <div class="feature-symbol__styler-size-row-label">线宽</div>
        <div class="feature-symbol__styler-size-row-value">
          <n-slider
            v-model:value="lineSymbolStore.strokeWidth"
            :min="1"
            :max="4"
            :step="0.5"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { NSlider } from "naive-ui";
import {
  useFillSymbol,
  useTextSymbol,
  useLineSymbol,
} from "@/models/symbol.js";
import { useSketch } from "@/models/sketch.js";
import { computed } from "vue";

const sketchStore = useSketch();
const fillSymbolStore = useFillSymbol();
const textSymbolStore = useTextSymbol();
const lineSymbolStore = useLineSymbol();

const isFillSymbol = computed(() => {
  return (
    ["rect", "polygon", "circle", "ellipse"].indexOf(
      sketchStore.context.geometryType,
    ) > -1
  );
});
</script>

<style scoped lang="scss">
.feature-symbol__styler-size {
  display: flex;
  flex-direction: column;

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
