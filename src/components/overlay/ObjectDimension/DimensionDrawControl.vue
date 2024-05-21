<template>
  <div class="object-dimension__draw">
    <span
      class="object-dimension__draw-item object-dimension__draw-rect"
      @click="createRect"
    >
      <StopIcon :class="{ active: activeTool === 'rect' }" />
    </span>
  </div>
</template>

<script setup>
import { ref, inject } from "vue";
import { StopIcon } from "@heroicons/vue/24/outline";
import useMapboxSketch from "@/utils/hooks/useMapboxSketch.js";

const map = inject("map");
const { activeTool, createRect } = useMapboxSketch(map);
</script>

<style scoped lang="scss">
.object-dimension__draw {
  display: flex;
  align-items: center;
  gap: 8px;

  &-item {
    @apply rounded-md bg-gray-50 ring-1 ring-inset ring-gray-500;

    flex: none;
    display: flex;
    width: 24px;
    height: 24px;
    border-radius: 3px;
    box-sizing: border-box;
    cursor: pointer;

    &.active {
      @apply bg-primary;
    }
  }
}
</style>
