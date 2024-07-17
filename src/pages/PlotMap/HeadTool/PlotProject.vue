<script setup>
import { ref, onMounted } from "vue";
import { NSelect } from "naive-ui";
import { $getProjectList } from "@/utils/api/plotMap/project";
import { usePlotMapStore } from "@/models/plotMap";

const options = ref([]);
const curProjectId = ref();

const plotMapStore = usePlotMapStore();
const { setCurProject, mapZoomToExtend } = plotMapStore;

onMounted(() => {
  getProjectListAsync();
});

const getProjectListAsync = async () => {
  const params = {
    pageNum: 1,
    pageSize: 10,
  };

  const res = await $getProjectList(params);

  if (res.code === 200) {
    options.value = res.data.records.map((item) => ({
      ...item,
      label: item.name,
      value: item.id,
    }));

    setCurProject(options.value[0]);

    curProjectId.value = options.value[0].value;

    // 需要地图缩放至 project 范围
    mapZoomToExtend();
  }
};
</script>

<template>
  <n-select v-model:value="curProjectId" :options="options" />
</template>
