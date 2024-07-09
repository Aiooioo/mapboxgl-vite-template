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

    <div class="mb-4 flex items-center justify-center gap-1">
      <n-button
        size="small"
        type="warning"
        :disabled="isCanCompare"
        @click="handleCompare"
        v-show="locationInfo.result === undefined"
      >
        验证
      </n-button>

      <n-button
        size="small"
        type="secondary"
        @click="handleDelete"
        v-if="locationInfo.result === null || locationInfo.result === undefined"
      >
        取消
      </n-button>

      <n-tag
        size="small"
        round
        :type="locationInfo.result === 1 ? 'success' : 'error'"
        v-else
      >
        <template #icon>
          <div
            class="flex gap-1 items-center justify-center"
            v-if="locationInfo.result === 1"
          >
            <i-gg-check-o />
            <span>地物判读结果正确</span>
          </div>

          <div class="flex gap-1 items-center justify-center" v-else>
            <i-codicon-error />
            <span>地物判读结果错误</span>
          </div>
        </template>
      </n-tag>
    </div>

    <!-- <div class="flex items-center justify-center gap-3">
      <n-button
        size="small"
        type="primary"
        @click="handleSave"
        :disabled="!locationInfo.type"
      >
        保存
      </n-button>

      <n-button size="small" type="secondary" @click="handleDelete">
        取消
      </n-button>
    </div> -->
  </section>
</template>

<script setup>
import { ref, reactive, watch, onMounted, computed } from "vue";
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
const { changeMarkerType, changeMarkerStyle, removeMarker, updateCurMarker } =
  imageryStore;

const locationInfo = reactive({
  type: null,
  style: MARKER_STYLE_OPTS[0].value,
  remark: null,
  result: null,
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

const isCanCompare = computed(() => {
  if (!locationInfo.type) return true;

  // if (locationInfo.result !== null) return true;

  // 已校验过是否需要再校验
  // if (!locationInfo.type || locationInfo.result !== null) {
  //   return true;
  // }

  return false;
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
      locationInfo.result = val.result;

      // console.log("curEditMarker", val);
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
      style: locationInfo.style,
      geometrys: [loWkt], // wkt
    },
  ];
  // console.log("handleCompare--params", params);
  const res = await $comparePlot(params);
  console.log("$comparePlot--res", res);

  if (res.code === 200) {
    const { id, result } = res.data[0];
    const params = {
      id,
      result,
    };
    updateCurMarker(params);

    locationInfo.result = result;
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
    updateCurMarker(res.data.id);
  }
};

const handleDelete = async () => {
  removeMarker();

  // const params = {
  //   ids: [imageryStore.curEditMarker.id],
  // };
  // const res = await $deletePlot(params);
  // console.log("$deletePlot--res", res);

  // if (res.code === 200) {
  //   removeMarker();
  // }
};
</script>
