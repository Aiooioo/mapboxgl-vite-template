<template>
  <section class="text-white">
    <div class="mb-2 flex items-center gap-1">
      <label>标注类型：</label>
      <n-select
        size="small"
        v-model:value="locationInfo.type"
        :options="MARKER_TYPE_OPTS"
      />
    </div>
    <div class="mb-2 flex items-center gap-1">
      <label>标注样式：</label>
      <n-select
        size="small"
        v-model:value="locationInfo.style"
        :options="styleOptions"
      />
    </div>
    <div class="flex gap-1">
      <label class="ml-6">备注：</label>
      <n-input
        v-model:value="locationInfo.backup"
        type="textarea"
        placeholder="请输入备注信息"
      />
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, watch } from "vue";
import { NSelect, NInput } from "naive-ui";
import { useImageryStore } from "@/models/imagery";

import { MARKER_TYPE_OPTS, TANK_OPTS, PLANE_OPTS } from "./conf";

const imageryStore = useImageryStore();
const { changeMarkerType, changeMarkerStyle } = imageryStore;

const locationInfo = reactive({
  type: "tank",
  style: TANK_OPTS[0].value,
  backup: "",
});

const styleOptions = ref(TANK_OPTS);

watch(
  () => locationInfo.type,
  (val) => {
    styleOptions.value = val === "tank" ? TANK_OPTS : PLANE_OPTS;
    locationInfo.style = styleOptions.value[0].value;

    changeMarkerType(val);
  }
);

watch(
  () => locationInfo.style,
  (val) => {
    // console.log("locationInfo.style", val);
    changeMarkerStyle(val);
  }
);

watch(
  () => imageryStore.curEditMarker,
  (val) => {
    if (val) {
      locationInfo.type = val.type;
      locationInfo.style = val.style;
      locationInfo.backup = val.backup;

      // TODO
      // 更新 geojson 信息， 通过 id
    }
  }
);
</script>
