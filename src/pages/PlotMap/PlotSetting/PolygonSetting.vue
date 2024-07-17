<script setup>
import { reactive } from "vue";
import { NSlider, NColorPicker } from "naive-ui";

const styles = reactive({
  type: "",
  strokeColor: "",
  strokeWidth: 1,
  fillColor: "",
  fillOpacity: 1,
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
      <span>面</span>
    </li>
    <li>
      <span>填充颜色</span>
      <n-color-picker
        v-model:value="styles.fillColor"
        :modes="['rgb']"
        :show-alpha="false"
      />
    </li>
    <li>
      <span>透明度</span>
      <n-slider
        v-model:value="styles.fillOpacity"
        :min="0"
        :max="1"
        :step="0.05"
      />
    </li>
    <li>
      <span>边框颜色</span>
      <n-color-picker
        v-model:value="styles.strokeColor"
        :modes="['rgb']"
        :show-alpha="false"
      />
    </li>
    <li>
      <span>边框宽度:</span>
      <n-slider
        v-model:value="styles.strokeWidth"
        :min="1"
        :max="4"
        :step="0.5"
      />
    </li>
  </ul>
</template>
