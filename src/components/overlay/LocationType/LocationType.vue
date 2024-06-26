<template>
  <section class="text-white">
    <div class="mb-2 flex items-center gap-1">
      <label for="location-type">标注类型：</label>
      <n-select
        size="small"
        v-model:value="locationInfo.type"
        :options="typeOptions"
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
import { ref, reactive } from "vue";
import { NSelect } from "naive-ui";

const locationInfo = reactive({
  type: "airplane",
  style: "marker",
});

const typeOptions = [
  {
    label: "飞机",
    value: "plane",
  },
  {
    label: "坦克",
    value: "tank",
  },
];

const styleOptions = [
  {
    label: "坦克1",
    value: "marker",
  },
  {
    label: "坦克2",
    value: "mark-active",
  },
];
</script>
