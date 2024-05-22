<template>
  <div class="map-widget__attribution">
    <div class="map-widget__attribution_zoom">
      <div class="map-widget__attribution_zoom-label">缩放级别</div>
      <div class="map-widget__attribution_zoom-value">
        {{ zoom.toFixed(2) }}
      </div>
    </div>
    <div class="map-widget__attribution_divide"></div>
    <div class="map-widget__attribution_center">
      <div class="map-widget__attribution_center-label">地图中心点</div>
      <div class="map-widget__attribution_center-value">
        {{ `${longitude}, ${latitude}` }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import _ from "lodash";
import useViewPort from "./useViewPort.js";

const { center, zoom } = useViewPort();

const longitude = computed(() => {
  if (center.value && _.isNumber(center.value.lng)) {
    return center.value.lng.toFixed(5);
  }

  return "0";
});
const latitude = computed(() => {
  if (center.value && _.isNumber(center.value.lat)) {
    return center.value.lat.toFixed(5);
  }

  return "0";
});
</script>

<style scoped lang="scss">
.map-widget__attribution {
  display: flex;
  flex-direction: row;
  align-items: center;

  &_divide {
    flex: none;
    width: 1.5px;
    height: 28px;
    margin: 0 24px;
    background: $primary_border_color;
  }

  &_zoom,
  &_center {
    display: flex;
    flex-direction: column;

    &-label {
      font-size: 12px;
      font-weight: 500;
      color: $hint_text_color;
      line-height: 12px;
    }
    &-value {
      font-size: 12px;
      color: $primary_text_color;
      line-height: 16px;
    }
  }
}
</style>
