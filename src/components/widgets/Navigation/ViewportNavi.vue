<template>
  <div class="mapbox-viewer__quick-navi">
    <div class="mapbox-viewer__quick-navi-btn">
      <ArrowUturnLeftIcon />
    </div>
    <div class="mapbox-viewer__quick-navi-btn">
      <ArrowUturnRightIcon />
    </div>
  </div>
</template>

<script setup>
import {
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
} from "@heroicons/vue/24/outline";
</script>

<style scoped lang="scss">
.mapbox-viewer__quick-navi {
  display: flex;
  align-items: center;
  gap: 20px;

  &-btn {
    flex: none;
    height: 24px;
    width: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $primary_text_color;
    cursor: pointer;

    &:hover {
      color: $secondary_bg_color;
    }
  }
}
</style>
