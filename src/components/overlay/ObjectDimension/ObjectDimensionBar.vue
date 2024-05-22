<template>
  <div class="object-dimension__bar">
    <div class="object-dimension__bar-switch">
      <div class="object-dimension__bar-switch-label">启用标注</div>
      <div class="object-dimension__bar-switch-action">
        <Switch
          :checked="enabled"
          @update:checked="handleEnableChanged"
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
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Switch } from "@/components/ui/switch";
import DimensionDrawControl from "./DimensionDrawControl.vue";

const enabled = ref(false);

function handleEnableChanged() {
  enabled.value = !enabled.value;
}
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
