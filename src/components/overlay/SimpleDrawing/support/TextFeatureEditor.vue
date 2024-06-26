<template>
  <div class="simple-drawing__editor-text">
    <span>文本内容</span>
    <span>
      <n-input
        placeholder="请输入文本内容"
        v-model="featureStore.textFeatureProps.text"
      ></n-input>
    </span>
  </div>
</template>

<script setup>
import { NInput } from "naive-ui";
import { useFeature } from "@/models/feature.js";

const featureStore = useFeature();
</script>

<style scoped lang="scss">
.simple-drawing__editor-text {

}
</style>
