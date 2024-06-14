<template>
  <div class="object-dimension__draw">
    <div class="object-dimension__draw-actions">
      <span
        :class="[
          'object-dimension__draw-item object-dimension__draw-point',
          { active: activeTool === 'point' },
        ]"
        @click="createPoint"
      >
        <MapPinIcon />
      </span>
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
        <i-ph-polygon-light style="height: 28px; width: 28px" />
      </span>
      <span
        :class="[
          'object-dimension__draw-item object-dimension__draw-cancel',
          { disabled: activeTool === '' },
        ]"
        @click="cancelDraw"
      >
        <NoSymbolIcon
          :style="{
            color: activeTool === '' ? '#71717a' : '#d50000',
            height: '24px',
            width: '24px',
          }"
        />
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from "vue";
import { MapPinIcon, StopIcon, NoSymbolIcon } from "@heroicons/vue/24/outline";
import useMapboxSketch from "@/utils/hooks/useMapboxSketch.js";

const { activeTool, createRect, createPolygon, cancelDraw, createPoint } =
  useMapboxSketch();
</script>

<style scoped lang="scss">
.object-dimension__draw {
  &-actions {
    flex: 1;
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    align-items: center;
  }

  &-item {
    flex: none;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    color: $primary_text_color;
    cursor: pointer;

    &:hover:not(&.active) {
      color: $secondary_bg_color;
    }

    &.active {
      color: $primary_bg_color;
    }
  }
}
</style>
