<template>
  <div class="imagery-catalog__item flex items-center justify-between">
    <n-checkbox
      size="small"
      :checked="originChecked"
      @update:checked="handleCheckedOrigin"
    >
      <span class="text-[12px] text-gray-400">
        {{ item.label }}
      </span>
    </n-checkbox>

    <n-tooltip trigger="hover">
      <template #trigger>
        <n-button quaternary circle size="small">
          <template #icon>
            <i-mdi-help-circle-outline />
          </template>
        </n-button>
      </template>

      <n-checkbox
        size="small"
        :checked="resultChecked"
        @update:checked="handleCheckedResult"
      >
        查看影像已识别结果
      </n-checkbox>
    </n-tooltip>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { NCheckbox, NTooltip, NButton } from "naive-ui";
import { useMapboxLayer } from "@/utils/hooks/useMapboxLayer.js";

const props = defineProps({
  item: {},
});

const originChecked = ref(false);
const resultChecked = ref(false);

const { toogelLayerVisibility } = useMapboxLayer(props.item);

// 原始影像
function handleCheckedOrigin(checked) {
  originChecked.value = checked;

  // console.log(props.item);

  toogelLayerVisibility(checked, props.item.origin);
}

// 已识别结果
function handleCheckedResult(checked) {
  resultChecked.value = checked;

  toogelLayerVisibility(checked, props.item.result);
}
</script>

<style scoped lang="scss">
.imagery-catalog__item {
  display: flex;
  align-items: center;
  margin-bottom: 8px;

  &-check {
    flex: none;
    display: flex;
    align-items: center;
    margin-right: 4px;
  }
  &-label {
    flex: 1;
    font-size: 14px;
    color: $primary_text_color;
  }
}
</style>
