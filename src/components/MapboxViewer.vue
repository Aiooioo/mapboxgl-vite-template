<template>
  <div ref="viewDivRef" class="viewDiv">
    <div class="viewDiv-plus">
      <img alt="" :src="'./images/plus.svg'" height="24" width="24" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import useMapboxView from "../utils/hooks/useMapboxView.js";

const viewDivRef = ref(null);

useMapboxView(viewDivRef);
</script>

<style scoped>
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
}
</style>
