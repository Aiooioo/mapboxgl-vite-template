<template>
  <div class="simple-drawing__pane">
    <div class="simple-drawing__pane-bar">
      <span :class="['simple-drawing__pane-bar-item']" @click="createPoint">
        <i-mdi-map-marker />
      </span>
      <span :class="['simple-drawing__pane-bar-item']" @click="createPolyline">
        <i-mdi-vector-line />
      </span>
      <span :class="['simple-drawing__pane-bar-item']" @click="createRect">
        <i-mdi-rectangle-outline />
      </span>
      <span :class="['simple-drawing__pane-bar-item']" @click="createCircle">
        <i-mdi-checkbox-blank-circle-outline />
      </span>
      <span :class="['simple-drawing__pane-bar-item']" @click="createEllipse">
        <i-mdi-ellipse-outline />
      </span>
      <span :class="['simple-drawing__pane-bar-item']" @click="createText">
        <i-mdi-format-text />
      </span>
      <span :class="['simple-drawing__pane-bar-item']">
        <i-mdi-arrow-top-right-bold-outline />
      </span>
    </div>
  </div>
</template>

<script setup>
import useMapboxSketch from "@/utils/hooks/useMapboxSketch.js";

const {
  activeTool,
  createText,
  createRect,
  createPolyline,
  createPolygon,
  cancelDraw,
  createEllipse,
  createCircle,
  createPoint,
} = useMapboxSketch();
</script>

<style scoped lang="scss">
.simple-drawing__pane {
  display: flex;
  flex-direction: column;

  &-bar {
    padding: 6px 0;
    height: 36px;
    border-radius: 6px;
    display: flex;
    background: $secondary_bg_color;
    color: $primary_text_color;

    &-item {
      flex: 1;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      cursor: pointer;

      &:not(:last-child) {
        border-right: 2px solid $secondary_text_color;
      }
    }
  }
}
</style>
