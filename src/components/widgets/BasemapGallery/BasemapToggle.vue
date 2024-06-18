<template>
  <div class="mapbox-viewer__basemaps">
    <span
      :class="[
        'mapbox-viewer__basemap-item',
        { selected: mapStore.currentBasemapId === 'arcgis-imagery' },
      ]"
    >
      <img alt="" :src="'./imgs/basemap-arcgis.png'" />
      <span class="mapbox-viewer__basemap-item-overlay">
        <span class="mapbox-viewer__basemap-item-name">ESRI 影像图</span>
      </span>
    </span>
    <span
      :class="[
        'mapbox-viewer__basemap-item',
        { selected: mapStore.currentBasemapId === 'topo' },
      ]"
    >
      <img alt="" :src="'./imgs/basemap-topo.png'" />
      <span class="mapbox-viewer__basemap-item-overlay">
        <span class="mapbox-viewer__basemap-item-name">地形图</span>
      </span>
    </span>
    <span
      :class="[
        'mapbox-viewer__basemap-item',
        { selected: mapStore.currentBasemapId === 'cover' },
      ]"
    >
      <img alt="" :src="'./imgs/terrain.jpg'" />
      <span class="mapbox-viewer__basemap-item-overlay">
        <span class="mapbox-viewer__basemap-item-name">地貌图</span>
      </span>
    </span>
    <span
      :class="[
        'mapbox-viewer__basemap-item',
        { selected: mapStore.currentBasemapId === 'road' },
      ]"
    >
      <img alt="" :src="'./imgs/streets-navigation.jpg'" />
      <span class="mapbox-viewer__basemap-item-overlay">
        <span class="mapbox-viewer__basemap-item-name">交通图</span>
      </span>
    </span>
  </div>
</template>

<script setup>
import { useMap } from "@/models/map.js";

const mapStore = useMap();
</script>

<style scoped lang="scss">
.mapbox-viewer__basemaps {
  padding: 8px;
  height: 80px;
  display: flex;
  gap: 10px;
  border-radius: 6px;
  background: $panel_bg_color;
  pointer-events: auto;
}

.mapbox-viewer__basemap-item {
  position: relative;
  width: 96px;
  height: 100%;
  border: 1px solid transparent;
  color: white;
  cursor: pointer;
  overflow: hidden;

  &.selected {
    color: $primary_bg_color;
    border-color: $primary_bg_color;
  }

  &-overlay {
    height: 24px;
    padding-left: 4px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    background: rgba(0, 0, 0, 0.65);
    z-index: 2;
  }

  img {
    width: 100%;
    object-fit: cover;
  }
}
</style>
