<template>
  <section class="text-white">
    <div class="mb-2 flex items-center gap-1">
      <label>标注类型：</label>
      <n-select
        size="small"
        v-model:value="locationInfo.type"
        :options="typeOptions"
        placeholder="请选择标注类型"
      />
    </div>
    <div class="mb-2 flex items-center gap-1">
      <label>标注样式：</label>
      <n-select
        size="small"
        v-model:value="locationInfo.style"
        :options="MARKER_STYLE_OPTS"
      />
    </div>

    <div class="mb-2 flex gap-1">
      <label class="ml-6">备注：</label>
      <n-input
        v-model:value="locationInfo.remark"
        type="textarea"
        placeholder="请输入备注信息"
      />
    </div>

    <div class="mb-4 flex items-center gap-1">
      <n-button
        size="small"
        type="warning"
        :disabled="!locationInfo.type"
        @click="handleCompare"
      >
        验证地物判读结果：
      </n-button>
      <n-tag
        size="small"
        round
        :type="locationInfo.result === 1 ? 'success' : 'error'"
        v-show="locationInfo.result !== undefined"
      >
        <template #icon>
          <div
            class="flex gap-1 items-center justify-center"
            v-if="locationInfo.result === 1"
          >
            <i-gg-check-o />
            正确
          </div>

          <div class="flex gap-1 items-center justify-center" v-else>
            <i-codicon-error />
            错误
          </div>
        </template>
      </n-tag>
    </div>

    <div class="flex items-center justify-center gap-3">
      <n-button
        size="small"
        type="primary"
        @click="handleSave"
        :disabled="!locationInfo.type"
      >
        保存
      </n-button>

      <n-button size="small" type="secondary" @click="handleDelete">
        删除
      </n-button>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, watch, onMounted } from "vue";
import { NSelect, NInput, NButton, NTag } from "naive-ui";
import { useImageryStore } from "@/models/imagery";
import {
  $listByCode,
  $createPlot,
  $deletePlot,
} from "@/utils/api/location/plot";
import { $comparePlot } from "@/utils/api/location/identify";

import WKT from "terraformer-wkt-parser";
import * as turf from "@turf/turf";

import { MARKER_TYPE_OPTS, MARKER_STYLE_OPTS } from "./conf";

const imageryStore = useImageryStore();
const { changeMarkerType, changeMarkerStyle, removeMarker, updateCurMarkerId } =
  imageryStore;

const locationInfo = reactive({
  type: undefined,
  style: MARKER_STYLE_OPTS[0].value,
  remark: "",
  result: undefined,
});

const typeOptions = ref(MARKER_TYPE_OPTS);

const getCodeListAsync = async () => {
  const res = await $listByCode({ code: "featuretype" });
  // console.log("$listByCode--res", res);
  if (res.code === 200) {
    const options = res?.data?.map((item) => ({
      ...item,
      label: item.name,
      value: item.code,
    }));

    typeOptions.value = options;
    // locationInfo.type = options?.[0]?.value;
  }
};

onMounted(() => {
  getCodeListAsync();
});

watch(
  () => locationInfo.type,
  (val) => {
    // const code = typeOptions.value.find((item) => item.value === val)?.code;
    // styleOptions.value = code === "tank" ? TANK_OPTS : PLANE_OPTS;
    // locationInfo.style = styleOptions.value[0].value;

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
      locationInfo.remark = val.remark;
    }
  }
);

// 验证
const handleCompare = async () => {
  const { type } = locationInfo;
  const typeInfo = typeOptions.value.find((item) => item.value === type);
  const { loGeometry } = imageryStore.curEditMarker;
  const mGeojson = turf.toMercator(loGeometry);
  const loWkt = WKT.convert(mGeojson);
  // console.log("loWkt", loWkt);

  const params = [
    {
      itemId: "0acefb3c845a42e5b0f81373797cdb6e",
      type: typeInfo.name,
      code: typeInfo.code,
      geometrys: [loWkt], // wkt
    },
  ];
  // console.log("handleCompare--params", params);
  const res = await $comparePlot(params);
  console.log("$comparePlot--res", res);

  if (res.code === 200) {
    locationInfo.result = res.data[0].result;
  }
};

// 保存
const handleSave = async () => {
  // console.log(imageryStore.curEditMarker);
  const { type, style, remark } = locationInfo;
  const typeInfo = typeOptions.value.find((item) => item.value === type);
  const { loGeometry } = imageryStore.curEditMarker;

  // console.log("loGeometry", loGeometry);

  const content = JSON.stringify({
    type: "FeatureCollection",
    features: [loGeometry],
  });

  const params = {
    code: typeInfo.code,
    type: typeInfo.name,
    style,
    remark, // 备注信息
    content,
  };
  const res = await $createPlot(params);
  console.log("$createPlot--res", res);

  if (res.code === 200) {
    updateCurMarkerId(res.data.id);
  }
};

const handleDelete = async () => {
  const params = {
    ids: [imageryStore.curEditMarker.id],
  };
  const res = await $deletePlot(params);
  console.log("$deletePlot--res", res);

  if (res.code === 200) {
    removeMarker();
  }
};
</script>
