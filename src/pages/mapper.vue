<template>
  <div class="page-mapper">
    <div class="page-mapper-bar">
      <MapperBar />
    </div>
    <div class="page-mapper-main">
      <MapboxViewer />
    </div>
  </div>
</template>

<script setup>
import MapperBar from "@/components/MapperBar.vue";
import MapboxViewer from "@/components/MapboxViewer.vue";
</script>

<style scoped lang="scss">
.page-mapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  &-bar {
    height: 64px;
    background: $global_bg_color;
    border-bottom-width: 1px;
    border-image-source: linear-gradient(
      to right,
      transparent 0%,
      $secondary_text_color 50%,
      transparent 100%
    );
    border-image-slice: 1;
  }

  &-main {
    flex: 1;
  }
}
</style>
