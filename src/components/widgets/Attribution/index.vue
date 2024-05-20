<template>
  <div class="map-widget__attribution">
    <div class="map-widget__attribution_zoom">
      缩放级别: <span>{{ zoom.toFixed(2) }}</span>
    </div>
    <div class="map-widget__attribution_divide">|</div>
    <div class="map-widget__attribution_center">
      中心点: <span>{{ center && `${center.lng}, ${center.lat}` }}</span>
    </div>
  </div>
</template>

<script setup>
import { inject } from "vue";
import useViewPort from "./useViewPort.js";

const map = inject("map");
const { center, zoom } = useViewPort(map);
</script>

<style scoped lang="scss">
.map-widget__attribution {
  display: flex;
  flex-direction: row;
  align-items: center;

  &_divide {
    flex: none;
    margin: 0 15px;
  }

  &_zoom {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
}
</style>
