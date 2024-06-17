<template>
  <div class="mapbox-viewer__quick-navi">
    <div class="mapbox-viewer__quick-navi-btn">
      <i-mdi-arrow-left-top />
    </div>
    <div class="mapbox-viewer__quick-navi-btn">
      <i-mdi-arrow-right-top />
    </div>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.mapbox-viewer__quick-navi {
  display: flex;
  align-items: center;
  gap: 20px;

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
