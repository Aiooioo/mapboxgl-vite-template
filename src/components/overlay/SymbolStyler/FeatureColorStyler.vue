<template>
  <div class="feature-symbol__styler-color">
    <template v-if="isFillSymbol">
      <div class="feature-symbol__styler-color-row">
        <div class="feature-symbol__styler-color-row-label">填充</div>
        <div class="feature-symbol__styler-color-row-value">
          <div class="feature-symbol__styler-color-thumb">
            <n-color-picker
              v-model:value="fillSymbolStore.fillColor"
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
            v-model:value="fillSymbolStore.fillOpacity"
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
              v-model:value="fillSymbolStore.strokeColor"
              :modes="['rgb']"
              :show-alpha="false"
            ></n-color-picker>
          </div>
        </div>
      </div>
    </template>
    <template v-else-if="sketchStore.context.geometryType === 'text'">
      <div class="feature-symbol__styler-color-row">
        <div class="feature-symbol__styler-color-row-label">文字填充</div>
        <div class="feature-symbol__styler-color-row-value">
          <div class="feature-symbol__styler-color-thumb">
            <n-color-picker
              v-model:value="textSymbolStore.color"
              :modes="['rgb']"
              :show-alpha="false"
            ></n-color-picker>
          </div>
        </div>
      </div>
      <div class="feature-symbol__styler-color-row">
        <div class="feature-symbol__styler-color-row-label">文字光晕</div>
        <div class="feature-symbol__styler-color-row-value">
          <div class="feature-symbol__styler-color-thumb">
            <n-color-picker
              v-model:value="textSymbolStore.haloColor"
              :modes="['rgb']"
              :show-alpha="false"
            ></n-color-picker>
          </div>
        </div>
      </div>
    </template>
    <template v-else-if="sketchStore.context.geometryType === 'polyline'">
      <div class="feature-symbol__styler-color-row">
        <div class="feature-symbol__styler-color-row-label">颜色</div>
        <div class="feature-symbol__styler-color-row-value">
          <div class="feature-symbol__styler-color-thumb">
            <n-color-picker
              v-model:value="lineSymbolStore.strokeColor"
              :modes="['rgb']"
              :show-alpha="false"
            ></n-color-picker>
          </div>
        </div>
      </div>
    </template>
    <template v-else-if="sketchStore.context.geometryType === 'point'">
      <div class="feature-symbol__styler-color-row">
        <div class="feature-symbol__styler-color-row-label">颜色</div>
        <div class="feature-symbol__styler-color-row-value">
          <div class="feature-symbol__styler-color-thumb">
            <n-color-picker
              v-model:value="pointSymbolStore.pointColor"
              :modes="['rgb']"
              :show-alpha="false"
            ></n-color-picker>
          </div>
        </div>
      </div>
      <div class="feature-symbol__styler-color-row">
        <div class="feature-symbol__styler-color-row-label">边框颜色</div>
        <div class="feature-symbol__styler-color-row-value">
          <div class="feature-symbol__styler-color-thumb">
            <n-color-picker
              v-model:value="pointSymbolStore.pointStrokeColor"
              :modes="['rgb']"
              :show-alpha="false"
            ></n-color-picker>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { NColorPicker, NSlider } from "naive-ui";
import {
  usePointSymbol,
  useFillSymbol,
  useTextSymbol,
  useLineSymbol,
} from "@/models/symbol.js";
import { useSketch } from "@/models/sketch.js";

const sketchStore = useSketch();
const pointSymbolStore = usePointSymbol();
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
