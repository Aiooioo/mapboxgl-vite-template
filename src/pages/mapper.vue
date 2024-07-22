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
        <template #overlay-right>
          <div class="page-mapper-main-right">
            <div class="page-mapper-main-right-panel-holder">
              <MapToolPane v-if="mapStore.activeBar !== ''" />
            </div>
            <BasemapToggle />
          </div>
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
import MapToolPane from "@/components/MapToolPane.vue";
import BasemapToggle from "@/components/widgets/BasemapGallery/BasemapToggle.vue";
import { useMap } from "@/models/map.js";
import { useWebmapCompose } from "@/utils/hooks/useWebmap.js";

const mapStore = useMap();
const { showZones } = storeToRefs(mapStore);

useWebmapCompose();
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

    &-right {
      margin-right: 50px;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 15px;

      &-panel-holder {
        flex: 1;
        pointer-events: none;
      }
    }
  }
}
</style>
