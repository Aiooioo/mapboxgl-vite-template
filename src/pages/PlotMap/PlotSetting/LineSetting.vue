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
      <span>线</span>
    </li>
    <li>
      <span>线宽</span>
      <n-slider
        v-model:value="styles.strokeWidth"
        :min="1"
        :max="4"
        :step="0.5"
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
