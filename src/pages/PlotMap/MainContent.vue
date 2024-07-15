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
        <div class="viewDiv-widgets-bottom-right"></div>
      </div>
    </div>
    <div class="viewDiv-overlay">
      <div class="viewDiv-overlay-left">
        <slot name="overlay-left"></slot>
      </div>
      <div class="viewDiv-overlay-right">
        <slot name="overlay-right"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useInitMap } from "./hooks/useInitMap";
import { usePlotMap } from "./hooks/usePlotMap";

const viewDivRef = ref();

useInitMap(viewDivRef);
usePlotMap();
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
    }

    &-right {
      margin: 10px 0;
    }
  }
}
</style>
