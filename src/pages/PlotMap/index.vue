<template>
  <div class="page-mapper">
    <div class="page-mapper-bar">
      <HeadTool />
    </div>
    <div class="page-mapper-main">
      <MainContent>
        <template #overlay-left>
          <PlotList
            class="page-mapper-main__zones"
            :style="{
              display: showZones ? 'flex' : 'none',
            }"
          />
        </template>
        <template #overlay-right>
          <div class="page-mapper-main-right">
            <div class="page-mapper-main-right-panel-holder">
              <FloatPanel
                :title="curTool.title"
                :component="curTool.component"
                v-show="showPanel"
              />
            </div>
            <BasemapToggle />
          </div>
        </template>
      </MainContent>
    </div>
  </div>
</template>

<script setup>
import { ref, shallowRef } from "vue";
import HeadTool from "./HeadTool.vue";
import MainContent from "./MainContent.vue";
import FloatPanel from "./FloatPanel.vue";
import PlotList from "./PlotList.vue";
import BasemapToggle from "@/components/widgets/BasemapGallery/BasemapToggle.vue";

import { CUS_TOOL_COMPS } from "./conf";

const curTool = shallowRef(CUS_TOOL_COMPS[0]);

const showZones = ref(true);
const showPanel = ref(true);
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
