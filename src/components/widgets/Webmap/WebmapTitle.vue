<template>
  <div class="mapbox-viewer__webmap-title">
    <span class="mapbox-viewer__webmap-title-text"><sup>*</sup> 新的工程</span>
    <n-popselect
      trigger="hover"
      placement="bottom-end"
      :options="mock"
      size="small"
      scrollable
    >
      <span>
        <i-mdi-keyboard-arrow-down />
      </span>
    </n-popselect>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { NPopselect } from "naive-ui";

const mock = ref([
  {
    type: "group",
    label: "保存的工程",
    value: "saved",
    children: [
      {
        label: "工程1",
        value: "project1",
      },
    ],
  },
]);
</script>

<style scoped lang="scss">
.mapbox-viewer__webmap-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: $primary_text_color;
}
</style>
