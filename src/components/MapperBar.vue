<template>
  <div class="mapbox-mapper__bar">
    <div class="mapbox-mapper__bar-left">
      <ViewportNavi />
      <div class="mapbox-mapper__bar-split"></div>
      <Home />
      <div class="mapbox-mapper__bar-split"></div>
      <Attribution />
      <div class="mapbox-mapper__bar-split"></div>
    </div>
    <div class="mapbox-mapper__bar-right">
      <div class="mapbox-mapper__bar-split"></div>

      <div class="mapbox-mapper__bar-split"></div>
    </div>
  </div>
</template>

<script setup>
import ViewportNavi from "@/components/widgets/Navigation/ViewportNavi.vue";
import Attribution from "@/components/widgets/Attribution/index.vue";
import Home from "@/components/widgets/Navigation/Home.vue";
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
}
</style>
