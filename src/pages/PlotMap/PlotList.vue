<script setup>
import { ref } from "vue";
import { NInput, NCollapse, NCollapseItem } from "naive-ui";
import { PLOT_LIST } from "./conf";
import { usePlotMapStore } from "@/models/plotMap";

const plotMapStore = usePlotMapStore();
const { changePlotMode } = plotMapStore;

const keyword = ref("");
const list = ref(PLOT_LIST);

const handleUpdate = (val) => {
  console.log("keyword", keyword.value);
  // console.log("update", val);
};

const handleClick = (item) => {
  // console.log("click", item);
  changePlotMode(item.mode);
};
</script>

<template>
  <div class="app-zone__switcher">
    <div class="app-zone__switcher-header">
      <i-mdi-select-multiple-marker class="app-zone__switcher-header-icon" />
      标注符号库
    </div>
    <div class="app-zone__switcher-content">
      <div class="app-zone__switcher-content-search">
        <n-input
          clearable
          v-model:value="keyword"
          @update:value="handleUpdate"
          placeholder="搜索"
        >
          <template #suffix>
            <i-mdi-search />
          </template>
        </n-input>
      </div>

      <n-collapse>
        <n-collapse-item
          :title="item.title"
          :name="item.name"
          v-for="item in list"
          :key="item.name"
        >
          <ul class="grid grid-cols-3 gap-2 px-4">
            <li
              class="border border-gray-600 rounded p-1 text-center text-[12px] hover:bg-[#414143] cursor-pointer"
              v-for="child in item.children"
              :key="child.name"
              @click="handleClick(child)"
            >
              {{ child.title }}
            </li>
          </ul>
        </n-collapse-item>
      </n-collapse>
    </div>
  </div>
</template>

<style scoped lang="scss">
.app-zone__switcher {
  min-height: 480px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  background: $panel_bg_color;
  color: $secondary_text_color;
  font-size: 14px;
  pointer-events: auto;

  &-header {
    flex: none;
    height: 48px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    color: $primary_text_color;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-image-source: linear-gradient(
      to right,
      transparent 0%,
      $secondary_text_color 50%,
      transparent 100%
    );
    border-image-slice: 1;
    font-size: 16px;
    font-weight: 500;

    &-icon {
      font-size: 16px;
      color: $primary_text_color;
      margin-right: 8px;
    }
  }

  &-content {
    padding: 10px;
    flex: 1;
    overflow-y: auto;

    &-search {
      //height: 40px;
      //padding: 0 15px;
      margin-bottom: 8px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      background: $minor_bg_color;

      &-icon {
        display: flex;
        align-items: center;
        font-size: 18px;
        color: $primary_text_color;
      }
    }
  }
}
</style>
