<template>
  <div class="route-planning-view__editor">
    <div class="route-planning-view__editor-hints">
      <i-mdi-lightbulb-on-outline
        style="color: darkgoldenrod; margin-top: 2px; margin-left: 1px"
      />
      <span>
        借助强大的地图可视化工具，轻松规划出行进路线，通过丰富的策略和因子，合理避开障碍和限制。
      </span>
    </div>
    <div class="route-planning-view__editor-row">
      <span class="route-planning-view__editor-row-label">线路名称</span>
      <span class="route-planning-view__editor-row-wrapper">
        <n-input round size="small" placeholder="请输入线路标识" />
      </span>
    </div>
    <div class="route-planning-view__editor-row">
      <span class="route-planning-view__editor-row-label">途经点</span>
      <span class="route-planning-view__editor-row-wrapper">
        <n-radio-group size="small">
          <n-radio>手动选取</n-radio>
          <n-radio>随机选取</n-radio>
        </n-radio-group>
      </span>
    </div>
    <div class="route-planning-view__editor-row">
      <span class="route-planning-view__editor-row-label">路线难度</span>
      <span class="route-planning-view__editor-row-wrapper">
        <n-rate size="small" />
      </span>
    </div>
  </div>
</template>

<script setup>
import { NInput, NRadioGroup, NRadio, NRate } from "naive-ui";
import { useMapper } from "@/models/mapper.js";

const mapperStore = useMapper();
</script>

<style scoped lang="scss">
.route-planning-view__editor {
  display: flex;
  flex-direction: column;

  &-hints {
    padding: 8px;
    margin-bottom: 6px;
    border-radius: 6px;
    background: $minor_bg_color;
    color: $secondary_text_color;
    font-size: 12px;
    display: grid;
    justify-content: flex-start;
    grid-template-columns: 18px 1fr;
  }

  &-row {
    padding: 0 6px;
    display: flex;
    flex-direction: column;
    margin-bottom: 12px;
    font-size: 13px;

    &-label {
      margin-bottom: 4px;
      font-size: 13px;
      color: $primary_text_color;
      font-weight: 600;
    }

    &-wrapper {
      :global(.n-input),
      :global(.n-radio-group) {
        font-size: 13px;
      }
    }
  }
}
</style>
