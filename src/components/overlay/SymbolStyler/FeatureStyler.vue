<template>
  <div class="feature-symbol__styler">
    <div class="feature-symbol__styler-title">符号设置</div>
    <div class="feature-symbol__styler-content">
      <div class="feature-symbol__styler-types">
        <div
          :class="[
            'feature-symbol__styler-type',
            { selected: currentType === 'color' },
          ]"
          @click="switchToColor"
        >
          <i-mdi-color />色彩
        </div>

        <div
          :class="[
            'feature-symbol__styler-type',
            { selected: currentType === 'size' },
          ]"
          @click="switchToSize"
        >
          <i-mdi-chart-bubble />大小
        </div>

        <div
          v-if="canBeRotated"
          :class="[
            'feature-symbol__styler-type',
            { selected: currentType === 'rotate' },
          ]"
          @click="switchToRotate"
        >
          <i-mdi-angle-acute />旋转
        </div>
      </div>
      <div class="feature-symbol__styler-editor">
        <component :is="editors[currentType]"></component>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import FeatureColorStyler from "@/components/overlay/SymbolStyler/FeatureColorStyler.vue";
import FeatureSizeStyler from "@/components/overlay/SymbolStyler/FeatureSizeStyler.vue";
import FeatureRotateStyler from "@/components/overlay/SymbolStyler/FeatureRotateStyler.vue";
import { useSymbol } from "@/models/symbol.js";
import { useSketch } from "@/models/sketch.js";

const sketchStore = useSketch();
const symbolStore = useSymbol();

const currentType = ref("color");
const canBeRotated = computed(() => {
  return sketchStore.context.geometryType === "text";
});

const editors = {
  color: FeatureColorStyler,
  size: FeatureSizeStyler,
  rotate: FeatureRotateStyler,
};

function switchToColor() {
  // check if dirty

  currentType.value = "color";
}

function switchToSize() {
  // check if dirty

  currentType.value = "size";
}

function switchToRotate() {
  // check if dirty

  currentType.value = "rotate";
}
</script>

<style scoped lang="scss">
.feature-symbol__styler {
  display: flex;
  flex-direction: column;

  &-title {
    margin-bottom: 8px;
    font-size: 15px;
    font-weight: 500;
    color: $primary_text_color;
    line-height: 16px;
  }

  &-content {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
  }

  &-types {
    flex: none;
    width: 64px;
    display: flex;
    flex-direction: column;
    background: $minor_bg_color;
  }
  &-type {
    height: 64px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: $primary_text_color;
    font-size: 14px;
    cursor: pointer;

    &:hover {
      background: $minor_bg_color;
    }

    &.selected {
      color: $primary_bg_color;
      background: $global_bg_color;
    }
  }

  &-editor {
    flex: 1;
    padding: 0 8px;
  }
}
</style>
