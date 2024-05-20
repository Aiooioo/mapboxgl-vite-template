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
  </div>
</template>

<script setup>
import { ref, provide } from "vue";
import Attribution from "./widgets/Attribution/index.vue";
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

  .viewDiv-plus {
    position: absolute;
    inset: 0;
    margin: 0 auto;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    z-index: 1;
  }

  .viewDiv-widgets {
    position: absolute;
    inset: 0;
    margin: 0 auto;
    width: 100%;
    height: 100%;
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
        border-radius: 40px 0 0 0;
        background: rgba(0, 0, 0, 0.5);
        color: #f9f9f9;
      }
    }
  }
}
</style>
