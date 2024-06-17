<template>
  <div class="page-mapper">
    <div class="page-mapper-bar">
      <MapperBar />
    </div>
    <div class="page-mapper-main">
      <MapboxViewer>
        <template #overlay-left>
          <ZoneSwitcher
            class="page-mapper-main__zones"
            :style="{
              display: showZones ? 'flex' : 'none',
            }"
          />
        </template>
      </MapboxViewer>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import MapperBar from "@/components/MapperBar.vue";
import MapboxViewer from "@/components/MapboxViewer.vue";
import ZoneSwitcher from "@/components/overlay/TrainingZone/ZoneSwitcher.vue";
import { useMap } from "@/models/map.js";

const mapStore = useMap();
const { showZones } = storeToRefs(mapStore);
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

    &__zones {
      width: 350px;
      max-height: 100%;
    }
  }
}
</style>
