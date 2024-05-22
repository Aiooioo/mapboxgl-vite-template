<template>
  <div class="mapbox-viewer__bar">
    <div class="mapbox-viewer__bar-left">
      <ViewportNavi />
      <div class="mapbox-viewer__bar-split"></div>
      <Home />
      <div class="mapbox-viewer__bar-split"></div>
      <Attribution />
      <div class="mapbox-viewer__bar-split"></div>
    </div>
    <div class="mapbox-viewer__bar-right">
      <div class="mapbox-viewer__bar-split"></div>
      <ObjectDimensionBar />
      <div class="mapbox-viewer__bar-split"></div>
    </div>
  </div>
</template>

<script setup>
import ViewportNavi from "@/components/widgets/Navigation/ViewportNavi.vue";
import Attribution from "@/components/widgets/Attribution/index.vue";
import Home from "./widgets/Navigation/Home.vue";
import ObjectDimensionBar from "@/components/overlay/ObjectDimension/ObjectDimensionBar.vue";
</script>

<style scoped lang="scss">
.mapbox-viewer__bar {
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
}
</style>
