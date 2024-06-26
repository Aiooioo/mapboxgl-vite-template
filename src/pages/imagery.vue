<template>
  <div class="page-imagery">
    <div class="page-imagery-bar">
      <MapboxBar />
    </div>
    <div class="page-imagery-main">
      <MapboxViewer>
        <template #overlay-left>
          <CatalogPanel class="page-imagery-main__catalog"></CatalogPanel>
        </template>

        <template #overlay-right>
          <div class="page-imagery-main-right">
            <div class="page-imagery-main-right-panel-holder">
              <MapToolPane v-if="imageryStore.enableDraw" />
            </div>
          </div>
        </template>
      </MapboxViewer>
    </div>
  </div>
</template>

<script setup>
import MapboxViewer from "@/components/MapboxViewer.vue";
import MapboxBar from "@/components/MapboxBar.vue";
import CatalogPanel from "@/components/overlay/ImageryCatalog/CatalogPanel.vue";
import MapToolPane from "@/components/MapToolPane.vue";
import { useImageryStore } from "@/models/imagery";

const imageryStore = useImageryStore();
</script>

<style scoped lang="scss">
.page-imagery {
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

    &__catalog {
      width: 350px;
      height: 100%;
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
