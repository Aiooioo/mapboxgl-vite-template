<template>
  <div class="mapbox-viewer__navi-home">
    <HomeIcon />
  </div>
</template>

<script setup>
import { HomeIcon } from "@heroicons/vue/24/outline";
</script>

<style scoped lang="scss">
.mapbox-viewer__navi-home {
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
</style>
