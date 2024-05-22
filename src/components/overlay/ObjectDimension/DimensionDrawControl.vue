<template>
  <div class="object-dimension__draw">
    <div class="object-dimension__draw-actions">
      <span
        :class="[
          'object-dimension__draw-item object-dimension__draw-rect',
          { active: activeTool === 'rect' },
        ]"
        @click="createRect"
      >
        <StopIcon />
      </span>
      <span
        :class="[
          'object-dimension__draw-item object-dimension__draw-rect',
          { active: activeTool === 'polygon' },
        ]"
        @click="createPolygon"
      >
        <Icon icon="ph:polygon-light" style="height: 28px; width: 28px" />
      </span>
    </div>
    <div class="object-dimension__draw-more">
      <span
        class="object-dimension__draw-item object-dimension__draw-cancel"
        v-show="activeTool !== ''"
        @click="cancelDraw"
      >
        <NoSymbolIcon style="color: #d50000; height: 24px; width: 24px" />
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from "vue";
import { Icon } from "@iconify/vue";
import { StopIcon, NoSymbolIcon } from "@heroicons/vue/24/outline";
import useMapboxSketch from "@/utils/hooks/useMapboxSketch.js";

const map = inject("map");
const { activeTool, createRect, createPolygon, cancelDraw } =
  useMapboxSketch(map);
</script>

<style scoped lang="scss">
.object-dimension__draw {
  display: flex;
  align-items: center;
  gap: 16px;

  &-actions {
    flex: 1;
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    align-items: center;
  }
  &-more {
    flex: none;
  }

  &-item {
    @apply rounded-md bg-gray-50 ring-1 ring-inset ring-gray-500;

    flex: none;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 3px;
    box-sizing: border-box;
    cursor: pointer;

    &.active {
      background: hsl(173, 80%, 36%);
    }
  }
}
</style>
