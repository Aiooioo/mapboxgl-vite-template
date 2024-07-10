<template>
  <div class="mapbox-mapper__bar">
    <div class="mapbox-mapper__bar-left">
      <ViewportNavi />
      <div class="mapbox-mapper__bar-split"></div>
      <Home />
      <div class="mapbox-mapper__bar-split"></div>
      <span class="mapbox-mapper__bar-btn" @click="toggleZoneSwitcher">
        <i-mdi-select-multiple-marker />
      </span>
      <div class="mapbox-mapper__bar-split"></div>
      <Attribution />
      <div class="mapbox-mapper__bar-split"></div>
    </div>
    <div class="mapbox-mapper__bar-right">
      <WebmapTitle />
      <div class="mapbox-mapper__bar-split"></div>
      <span class="mapbox-mapper__bar-btn">
        <i-mdi-file-restore />
      </span>
      <div class="mapbox-mapper__bar-split"></div>
      <span class="mapbox-mapper__bar-btn">
        <i-mdi-content-save />
      </span>
      <div class="mapbox-mapper__bar-split"></div>
      <span class="mapbox-mapper__bar-btn" @click="showCheckPoints">
        <i-mdi-source-branch-check />
      </span>
      <div class="mapbox-mapper__bar-split"></div>
      <span class="mapbox-mapper__bar-btn" @click="startRoutePlan">
        <i-mdi-vector-polyline-edit />
      </span>
      <div class="mapbox-mapper__bar-split"></div>
      <span class="mapbox-mapper__bar-btn" @click="startMapDrawing">
        <i-mdi-drawing />
      </span>
      <div class="mapbox-mapper__bar-split"></div>
      <span class="mapbox-mapper__bar-btn" @click="startPrintMap">
        <i-mdi-printer-outline />
      </span>
    </div>
  </div>
</template>

<script setup>
import ViewportNavi from "@/components/widgets/Navigation/ViewportNavi.vue";
import Attribution from "@/components/widgets/Attribution/index.vue";
import Home from "@/components/widgets/Navigation/Home.vue";
import WebmapTitle from "@/components/widgets/Webmap/WebmapTitle.vue";
import { useMap } from "@/models/map.js";

const mapStore = useMap();

function toggleZoneSwitcher() {
  mapStore.showZones = !mapStore.showZones;
}

function showCheckPoints() {
  mapStore.switchActiveTool("checks");
}

function startRoutePlan() {
  mapStore.switchActiveTool("mapper");
}

function startMapDrawing() {
  mapStore.switchActiveTool("drawing");
}

function startPrintMap() {
  mapStore.switchActiveTool("print");
}
</script>

<style scoped lang="scss">
.mapbox-mapper__bar {
  height: 100%;
  padding: 0 24px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  &-left,
  &-right {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  &-split {
    width: 2px;
    height: 28px;
    margin: 0 24px;
    background: $primary_border_color;
  }

  &-btn {
    flex: none;
    height: 24px;
    width: 24px;
    font-size: 24px;
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
