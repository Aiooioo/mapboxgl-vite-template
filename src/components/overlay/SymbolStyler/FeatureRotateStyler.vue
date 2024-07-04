<template>
  <div class="feature-symbol__styler-rotate">
    <template v-if="sketchStore.context.geometryType === 'text'">
      <div class="feature-symbol__styler-rotate-row">
        <div class="feature-symbol__styler-rotate-row-label">旋转角度</div>
        <div class="feature-symbol__styler-rotate-row-value">
          <n-slider
            v-model:value="textSymbolStore.textRotate"
            :min="0"
            :max="360"
            :step="1"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { NSlider } from "naive-ui";
import { useTextSymbol } from "@/models/symbol.js";
import { useSketch } from "@/models/sketch.js";

const sketchStore = useSketch();
const textSymbolStore = useTextSymbol();
</script>

<style scoped lang="scss">
.feature-symbol__styler-rotate {
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
