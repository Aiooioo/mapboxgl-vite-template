<template>
  <div class="object-dimension__list-toggle">
    <i-mdi-palette-swatch-variant @click="active = !active" />
  </div>

  <n-drawer v-model:show="active" :width="300">
    <n-drawer-content title="标注列表">
      <n-card
        :title="`标注点${item.id}`"
        size="small"
        v-for="item in loMarkers"
        :key="item"
        class="mb-2 cursor-pointer hover:bg-gray-600"
        @click="imageryStore.flyToMarker(item.id)"
      >
        <ul>
          <li>
            <label>标注类型：</label>
            <span>{{ item.type }}</span>
          </li>
          <li>
            <label>标注样式：</label>
            <span>{{ item.style }}</span>
          </li>
          <li>
            <label>备注：</label>
            <span>{{ item.remark }}</span>
          </li>
          <li class="flex items-center">
            <label>验证结果：</label>
            <!-- <span>{{ getResultText(item.result) }}</span> -->
            <n-select
              v-model:value="item.result"
              :options="[
                { label: '错误', value: 0 },
                { label: '正确', value: 1 },
              ]"
            />
          </li>
        </ul>
      </n-card>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { NDrawer, NDrawerContent, NCard, NSelect } from "naive-ui";
import { $plotList } from "@/utils/api/location/identify";
import { useImageryStore } from "@/models/imagery";
import { useMap } from "@/models/map.js";

const mapStore = useMap();

const imageryStore = useImageryStore();

const loMarkers = computed(() => imageryStore.loMarkers);

const active = ref(false);

// onMounted(() => {
//   getPlotList();
// });

const getResultText = (result) => {
  if (result === 0) return "错误";

  if (result === 1) return "正确";

  return "-";
};

watch(
  () => mapStore.ready,
  (val) => {
    if (val) {
      imageryStore.initLoLayer();

      getPlotList();
    }
  }
);

const getPlotList = async () => {
  const params = {
    itemId: "0acefb3c845a42e5b0f81373797cdb6e",
    type: "汽车",
    code: "car",
    pageSize: 9999,
    pageNum: 1,
  };

  const res = await $plotList(params);
  // console.log("getPlotList--res", res);
  if (res.code === 200 && res.data.records) {
    imageryStore.initLoMarkers(res.data.records);
  }
};
</script>

<style scoped lang="scss">
.object-dimension__list-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  color: $primary_text_color;
  cursor: pointer;

  &:hover:not(&.active) {
    color: $secondary_bg_color;
  }

  &.active {
    color: $primary_bg_color;
  }
}
</style>
