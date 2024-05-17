<template>
  <div ref="viewDivRef" class="viewDiv"></div>
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
}
</style>
