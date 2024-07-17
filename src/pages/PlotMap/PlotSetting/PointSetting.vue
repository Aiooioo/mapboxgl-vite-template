<script setup>
import { reactive } from "vue";
import { NSlider, NColorPicker } from "naive-ui";

const styles = reactive({
  type: "",
  strokeColor: "",
  strokeWidth: 1,
  fillColor: "",
  rotation: 0,
  iconSrc: "",
  iconSize: 12,
  text: "",
  textSize: 12,
  textColor: "",
});
</script>

<template>
  <ul>
    <li>
      <span>标注类型</span>
      <span>点</span>
    </li>
    <li>
      <span>大小</span>
      <n-slider
        v-model:value="styles.strokeWidth"
        :min="4"
        :max="12"
        :step="1"
      />
    </li>
    <li>
      <span>颜色</span>
      <n-color-picker
        v-model:value="styles.strokeColor"
        :modes="['rgb']"
        :show-alpha="false"
      />
    </li>
  </ul>
</template>
