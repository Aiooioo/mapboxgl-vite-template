<script setup>
import { reactive } from "vue";
import { NSlider, NColorPicker, NInput } from "naive-ui";

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
      <span>文本</span>
    </li>
    <li>
      <span>文本内容</span>
      <n-input v-model:value="styles.text" />
    </li>
    <li>
      <span>大小</span>
      <n-slider v-model:value="styles.textSize" :min="1" :max="4" :step="0.5" />
    </li>
    <li>
      <span>颜色</span>
      <n-color-picker
        v-model:value="styles.textColor"
        :modes="['rgb']"
        :show-alpha="false"
      />
    </li>
  </ul>
</template>
