<script setup>
import { ref } from "vue";
import { NButton } from "naive-ui";
import LineSetting from "./LineSetting.vue";
import PointSetting from "./PointSetting.vue";
import PolygonSetting from "./PolygonSetting.vue";
import TextSetting from "./TextSetting.vue";
import { usePlotMapStore } from "@/models/plotMap";
import { $addProjectPlot } from "@/utils/api/plotMap/plot";

const plotMapStore = usePlotMapStore();

const plotType = ref("point");

const COMPONET_DICT = {
  point: PointSetting,
  line: LineSetting,
  polygon: PolygonSetting,
  text: TextSetting,
};

const handleSave = () => {
  addProjectPlotAsync();
};

const addProjectPlotAsync = async () => {
  const featurId = plotMapStore.selectedIds[0];
  const plot = plotMapStore.plotTool.store[featurId];

  console.log("addProjectPlotAsync--feature", feature);

  const geojson = {
    type: "FeatureCollection",
    features: plot.features,
  };

  const params = {
    projectId: plotMapStore.curProject.id,
    content: geojson,
    code: plot.mode,
  };

  const res = await $addProjectPlot(params);
  console.log("onDrawComplete--res", res);
};
</script>

<template>
  <section class="text-white plot-setting-wrap">
    <button class="border m-2 px-2 rounded" @click="plotType = 'point'">
      点
    </button>
    <button class="border m-2 px-2 rounded" @click="plotType = 'line'">
      线
    </button>
    <button class="border m-2 px-2 rounded" @click="plotType = 'polygon'">
      面
    </button>
    <button class="border m-2 px-2 rounded" @click="plotType = 'text'">
      文本
    </button>

    <div class="mb-2">
      <span>当前选中ID:</span>
      <span>{{ plotMapStore.selectedIds }}</span>
    </div>

    <component :is="COMPONET_DICT[plotType]"></component>

    <div class="mt-2 flex items-center justify-center gap-2">
      <n-button @click="handleSave">保存</n-button>
      <n-button>删除</n-button>
      <n-button>取消</n-button>
    </div>
  </section>
</template>

<style lang="scss">
.plot-setting-wrap {
  ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;

    & > li {
      width: 100%;
      height: 36px;
      padding-right: 8px;
      display: flex;
      align-items: center;
      gap: 8px;
      border: 1px solid #4b5563;
      border-radius: 4px;
      overflow: hidden;

      & > span:first-of-type {
        min-width: 70px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #4b5563;
      }
    }
  }
}
</style>
