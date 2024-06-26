<template>
  <section class="text-white">
    <div class="mb-2 flex items-center gap-1">
      <label for="location-type">标注类型：</label>
      <n-select
        size="small"
        v-model:value="locationInfo.type"
        :options="MARKER_TYPE_OPTS"
      />
    </div>
    <div class="flex items-center gap-1">
      <label for="location-value">标注样式：</label>
      <n-select
        size="small"
        v-model:value="locationInfo.style"
        :options="styleOptions"
      />
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, watch } from "vue";
import { NSelect } from "naive-ui";
import { useImageryStore } from "@/models/imagery";

import { MARKER_TYPE_OPTS, TANK_OPTS, PLANE_OPTS } from "./conf";

const imageryStore = useImageryStore();
const { changeMarkerType, changeMarkerStyle } = imageryStore;

const locationInfo = reactive({
  type: "tank",
  style: TANK_OPTS[0].value,
});

const styleOptions = ref(TANK_OPTS);

watch(
  () => locationInfo.type,
  (val) => {
    styleOptions.value = val === "tank" ? TANK_OPTS : PLANE_OPTS;
    locationInfo.style = styleOptions.value[0].value;

    changeMarkerType(val);
    // changeMarkerStyle(locationInfo.style);
  }
);

watch(
  () => locationInfo.style,
  (val) => {
    // console.log("locationInfo.style", val);
    changeMarkerStyle(val);
  }
);
</script>
