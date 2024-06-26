<template>
  <div class="simple-drawing__editor-text">
    <span>文本内容</span>
    <span>
      <n-input
        placeholder="请输入文本内容"
        v-model:value="textStore.text"
      ></n-input>
    </span>
  </div>
</template>

<script setup>
import { NInput } from "naive-ui";
import { useTextFeature } from "@/models/feature.js";

const textStore = useTextFeature();
</script>

<style scoped lang="scss">
.simple-drawing__editor-text {
  margin-bottom: 6px;

  > span:first-child {
    flex: none;
    margin-right: 6px;
    margin-bottom: 6px;
    color: $primary_text_color;
    font-weight: 500;
  }
}
</style>
