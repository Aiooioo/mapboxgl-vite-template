<template>
  <div ref="viewDivRef" class="viewDiv">
    <div class="viewDiv-plus">
      <img alt="" :src="'./images/plus.svg'" height="24" width="24" />
    </div>
    <div class="viewDiv-widgets">
      <div class="viewDiv-widgets-top"></div>
      <div class="viewDiv-widgets-center">
        <div class="viewDiv-widgets-center-left"></div>
        <div class="viewDiv-widgets-center-right"></div>
      </div>
      <div class="viewDiv-widgets-bottom">
        <div class="viewDiv-widgets-bottom-left"></div>
        <div class="viewDiv-widgets-bottom-right">
          <Attribution />
        </div>
      </div>
    </div>
    <div class="viewDiv-overlay">
      <div class="viewDiv-overlay-left">
        <CatalogPanel class="viewDiv-overlay-left-catalog" />
      </div>
      <div class="viewDiv-overlay-right">
        <SimpleObjDimension class="viewDiv-overlay-right-dimension" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, provide } from "vue";
import Attribution from "./widgets/Attribution/index.vue";
import SimpleObjDimension from "./overlay/ObjectDimension/SimpleObjDimension.vue";
import CatalogPanel from "@/components/overlay/ImageryCatalog/CatalogPanel.vue";
import useMapboxView from "../utils/hooks/useMapboxView.js";

const viewDivRef = ref(null);

const { map } = useMapboxView(viewDivRef);
provide("map", map);
</script>

<style scoped lang="scss">
.viewDiv {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  position: relative;

  .viewDiv-plus,
  .viewDiv-widgets,
  .viewDiv-overlay {
    position: absolute;
    inset: 0;
    margin: 0 auto;
    width: 100%;
    height: 100%;
  }

  .viewDiv-plus {
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    z-index: 1;
  }

  .viewDiv-widgets {
    display: flex;
    flex-direction: column;
    pointer-events: none;
    z-index: 2;

    &-top {
      flex: none;
    }

    &-center {
      flex: 1;
    }

    &-bottom {
      flex: none;
      display: flex;
      align-items: center;
      justify-content: space-between;

      &-right {
        padding: 4px 15px 4px 30px;
        border-radius: 20px 0 0 0;
        background: rgba(0, 0, 0, 0.5);
        border-top: 1px solid #d3d4d5;
        border-left: 1px solid #d3d4d5;
        color: #f9f9f9;
      }
    }
  }

  .viewDiv-overlay {
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    pointer-events: none;
    z-index: 3;

    &-left {
      margin: 16px 0 64px 10px;

      &-catalog {
        width: 350px;
        height: 100%;
      }
    }

    &-right {
      margin: 10px 0;

      .viewDiv-overlay-right-dimension {
        min-width: 260px;
        margin: 0 50px 0 0;
      }
    }
  }
}
</style>
