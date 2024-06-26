<template>
  <div class="simple-drawing__editor">
    <div class="simple-drawing__editor-title">标注数据</div>
    <div class="simple-drawing__editor-properties">
      <div class="simple-drawing__editor-type">
        <span>标注类型:</span>
        <span>{{ displayNoteType }}</span>
      </div>
      <TextFeatureEditor v-if="sketchStore.context.geometryType === 'text'">
      </TextFeatureEditor>
      <div class="simple-drawing__editor-remark">
        <span>备注信息:</span>
        <span>
          <n-input
            type="textarea"
            placeholder="为当前标注添加备注信息"
            v-model="featureStore.remark"
          />
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { NInput } from "naive-ui";
import TextFeatureEditor from "@/components/overlay/SimpleDrawing/support/TextFeatureEditor.vue";
import { useSketch } from "@/models/sketch.js";
import { useFeature } from "@/models/feature.js";

const sketchStore = useSketch();
const featureStore = useFeature();

const displayNoteType = computed(() => {
  if (sketchStore.context.feature) {
    switch (sketchStore.context.geometryType) {
      case "point":
        return "点";
      case "polyline":
        return "折线";
      case "circle":
        return "圆形";
      case "ellipse":
        return "椭圆";
      case "rect":
        return "矩形";
      case "text":
        return "文本";
    }
  }

  return "";
});
</script>

<style scoped lang="scss">
.simple-drawing__editor {
  display: flex;
  flex-direction: column;

  &-title {
    margin-bottom: 8px;
    font-size: 15px;
    font-weight: 500;
    color: $primary_text_color;
    line-height: 16px;
  }

  &-properties {
    padding: 6px;
    border-radius: 6px;
    border: 1px solid #617889;
  }

  &-type {
    margin-bottom: 6px;
    display: flex;
    align-items: center;

    > span:first-child {
      flex: none;
      margin-right: 6px;
      color: $primary_text_color;
      font-weight: 500;
    }
    > span:last-child {
      color: #617889;
    }
  }

  &-remark {
    display: flex;
    flex-direction: column;

    > span:first-child {
      flex: none;
      margin-right: 6px;
      margin-bottom: 6px;
      color: $primary_text_color;
      font-weight: 500;
    }
  }
}
</style>
