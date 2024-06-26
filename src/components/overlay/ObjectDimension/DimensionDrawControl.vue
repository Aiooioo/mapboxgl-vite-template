<template>
  <div class="object-dimension__draw">
    <div class="object-dimension__draw-actions">
      <span
        :class="[
          'object-dimension__draw-item object-dimension__draw-point',
          { active: activeTool === 'point' },
        ]"
        @click="handlePoint"
      >
        <i-mdi-map-marker-outline style="height: 28px; width: 28px" />
      </span>
      <span
        :class="[
          'object-dimension__draw-item object-dimension__draw-rect',
          { active: activeTool === 'rect' },
        ]"
        @click="createRect"
      >
        <i-mdi-rectangle-outline style="height: 28px; width: 28px" />
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
        <i-mdi-cancel
          :style="{
            color: activeTool === '' ? '#71717a' : '#d50000',
            height: '24px',
            width: '24px',
          }"
        />
      </span>

      <span
        :class="[
          'object-dimension__draw-item object-dimension__draw-cancel',
          { disabled: activeTool === '' },
        ]"
        @click="imageryStore.removeMarker"
      >
        <i-mdi-delete
          :style="{
            color: imageryStore.curEditMarker ? '#d50000' : '#71717a',
            height: '24px',
            width: '24px',
          }"
        />
      </span>
    </div>
  </div>
</template>

<script setup>
import { watch } from "vue";
import useMapboxSketch from "@/utils/hooks/useMapboxSketch.js";
import { useImageryStore } from "@/models/imagery";
import { useMap } from "@/models/map.js";

const mapStore = useMap();
const imageryStore = useImageryStore();

const {
  createDrawToolAfterLoad,
  activeTool,
  createRect,
  createPolygon,
  cancelDraw,
  createPoint,
  clear,
} = useMapboxSketch();

watch(
  () => imageryStore.enableDraw,
  (val) => {
    if (val) {
      createDrawToolAfterLoad();

      mapStore.switchActiveTool("location");

      createPoint();
    } else {
      cancelDraw();

      mapStore.switchActiveTool("");
    }
  }
);

const handlePoint = () => {
  createPoint();
};
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
