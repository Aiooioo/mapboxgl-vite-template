<script setup lang="tsx">
import { ref, reactive, computed } from "vue";
import { NPopconfirm, NButton, NTooltip } from "naive-ui";
import {
  Editor,
  Delete,
  DataUser,
  DataDisplay,
  Switch,
  Tips,
  DatabaseSetting,
  PreviewOpen,
} from "@icon-park/vue-next";
const props = defineProps({
  type: { type: String, default: "" },
  text: { type: String, default: "" },
  size: { type: Number, default: 20 },
});
const emit = defineEmits(["click", "confirm"]);
const tipText = computed(() => {
  if (props.type === "编辑") {
    return "编辑";
  } else if (props.type === "删除") {
    return "删除";
  } else if (props.type === "查看") {
    return "查看";
  } else if (props.type === "预览") {
    return "预览";
  }
  return props.text;
});
const showIcon = {
  编辑: Editor,
  删除: Delete,
  查看: DataDisplay,
  预览: PreviewOpen,
  设置: DatabaseSetting,
  用户: DataUser,
  提示: Tips,
  开关: Switch,
};
</script>

<template>
  <n-popconfirm @positive-click="$emit('confirm')" v-if="props.type === '删除'">
    <template #trigger>
      <n-tooltip>
        <template #trigger>
          <n-button text @click.stop>
            <template #icon>
              <Delete theme="outline" :size="size" fill="#00FFCB" />
            </template>
          </n-button>
        </template>
        删除
      </n-tooltip>
    </template>
    确认删除吗？
  </n-popconfirm>
  <n-tooltip v-else>
    <template #trigger>
      <n-button text @click.stop="$emit('click')">
        <component
          :is="showIcon[props.type]"
          :size="size"
          fill="#00FFCB"
          v-if="props.type"
        ></component>
        <slot />
      </n-button>
    </template>
    {{ tipText }}
  </n-tooltip>
</template>

<style scoped lang="scss"></style>
