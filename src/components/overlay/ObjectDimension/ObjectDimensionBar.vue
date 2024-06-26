<template>
  <div class="object-dimension__bar">
    <div class="object-dimension__bar-switch">
      <div class="object-dimension__bar-switch-label">启用标注</div>
      <div class="object-dimension__bar-switch-action">
        <Switch
          :checked="enableDraw"
          @update:checked="toggelEnableDraw"
          :style="{
            '--primary': '255, 91.7%, 76.3%',
          }"
        />
      </div>
    </div>
    <div class="object-dimension__bar-split"></div>
    <div class="object-dimension__bar-controls">
      <DimensionDrawControl />
    </div>
    <div class="object-dimension__bar-split"></div>
    <ObjectDimensionListToggle />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { Switch } from "@/components/ui/switch";
import DimensionDrawControl from "./DimensionDrawControl.vue";
import ObjectDimensionListToggle from "./ObjectDimensionListToggle.vue";

import { useImageryStore } from "@/models/imagery";

const imageryStore = useImageryStore();

const { toggelEnableDraw } = imageryStore;

const enableDraw = computed(() => imageryStore.enableDraw);
</script>

<style scoped lang="scss">
.object-dimension__bar {
  display: flex;
  align-items: center;

  &-switch {
    display: flex;
    flex-direction: column;

    &-label {
      font-size: 12px;
      font-weight: 500;
      color: $primary_text_color;
      line-height: 18px;
    }
  }

  &-split {
    width: 2px;
    height: 28px;
    margin: 0 24px;
    background: $primary_border_color;
  }
}
</style>
