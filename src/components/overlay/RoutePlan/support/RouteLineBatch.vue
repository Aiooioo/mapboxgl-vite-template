<template>
  <div class="route-planning-view__editor-row">
    <span class="route-planning-view__editor-row-label"
      >每线路途经检查点数量</span
    >
    <span class="route-planning-view__editor-row-wrapper">
      <n-input-number
        size="small"
        disabled
        :show-button="false"
        style="width: 100%"
        :value="5"
      ></n-input-number>
    </span>
  </div>
  <div class="route-planning-view__editor-row">
    <span class="route-planning-view__editor-row-label">线路条数</span>
    <span class="route-planning-view__editor-row-wrapper">
      <n-input-number
        :value="props.batchNumber"
        size="small"
        :show-button="false"
        style="width: 100%"
        @update-value="(val) => emit('update:batchNumber', val)"
      ></n-input-number>
    </span>
  </div>
  <div class="route-planning-view__editor-row">
    <span class="route-planning-view__editor-row-label">难度策略</span>
    <span class="route-planning-view__editor-row-wrapper">
      <n-radio-group
        name="strategies"
        :value="props.batchStrategy"
        @update-value="(val) => emit('update:batchStrategy', val)"
      >
        <n-space vertical style="padding-left: 16px">
          <n-radio
            v-for="strag in allStrategies"
            :key="`strategy-${strag.value}`"
            :value="strag.value"
            >{{ strag.label }}</n-radio
          >
        </n-space>
      </n-radio-group>
    </span>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, onMounted } from "vue";
import { NInputNumber, NRadioGroup, NRadio, NSpace } from "naive-ui";
import { request } from "@/utils/api/request.ts";

const allStrategies = ref([]);

const props = defineProps({
  batchNumber: {},
  batchStrategy: {},
});
const emit = defineEmits(["update:batchNumber", "update:batchStrategy"]);

onMounted(async () => {
  const res = await request({
    url: "/map/route/strategies",
    method: "GET",
  });
  if (res && res.code === 200) {
    allStrategies.value = Object.keys(res.data).map((k) => ({
      label: res.data[k],
      value: +k,
    }));
  }
});
</script>

<style scoped lang="scss"></style>
