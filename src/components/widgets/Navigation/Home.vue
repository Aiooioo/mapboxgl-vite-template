<template>
  <div class="mapbox-viewer__navi-home">
    <i-mdi-home-outline />
  </div>
</template>

<script setup>

</script>

<style scoped lang="scss">
.mapbox-viewer__navi-home {
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
</style>
