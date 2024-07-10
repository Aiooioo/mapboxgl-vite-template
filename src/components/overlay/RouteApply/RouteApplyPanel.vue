<template>
  <div class="route-apply__panel">
    <div class="route-apply__panel-schemas">
      <div class="route-apply__panel-schemas-title">线路方案</div>
      <div class="route-apply__panel-schemas-search">
        <n-input style="width: 100%" size="small" placeholder="请输入关键字">
          <template #prefix>
            <i-mdi-search />
          </template>
        </n-input>
      </div>
      <div class="route-apply__panel-schemas-list">
        <div
          v-for="(item, index) in schemas"
          :key="`route-schema-${index}`"
          :class="[
            'route-apply__panel-schema',
            { selected: schema === item.id },
          ]"
        >
          <span class="route-apply__panel-schema-index">{{ index + 1 }}</span>
          <div class="route-apply__panel-schema-content">
            <div class="route-apply__panel-schema-title">
              <strong>#</strong> {{ item.name || item.id }}
            </div>
            <div class="route-apply__panel-schema-points">
              <RouteSchemaPoints :item="item" />
            </div>
            <div class="route-apply__panel-schema-applied">
              <RouteSchemaDifficulty :item="item" />
              <RouteSchemaApplied :item="item" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="route-apply__panel-bar">
      <span class="route-apply__panel-bar-search">
        <n-select
          size="small"
          style="width: 64px"
          :default-value="2024"
          :options="grades"
        >
        </n-select>
        <n-input size="small" style="width: 180px" placeholder="学员搜索">
          <template #prefix>
            <i-mdi-search />
          </template>
        </n-input>
      </span>
      <span class="route-apply__panel-bar-switch">

      </span>
    </div>
    <div class="route-apply__panel-table">
      <n-data-table :columns="columns" :bordered="false" />
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { NInput, NSelect, NDataTable } from "naive-ui";
import { useRouteApply } from "./hooks/useRouteApply.js";
import RouteSchemaPoints from "./support/RouteSchemaPoints.vue";
import RouteSchemaDifficulty from "./support/RouteSchemaDifficuty.vue";
import RouteSchemaApplied from "./support/RouteSchemaApplied.vue";

const props = defineProps(['item'])

const { schema, schemas, pagination } = useRouteApply();

const grades = [
  {
    value: 2024,
    label: "2024 级",
  },
];

const columns = [
  {
    type: "selection",
  },
  {
    title: "学员姓名",
  },
  {
    title: "学员学号",
  },
  {
    title: "所属年级",
  },
];
</script>

<style scoped lang="scss">
.route-apply__panel {
  width: 100%;
  height: 480px;
  display: grid;
  grid-template-columns: 280px 1fr;
  grid-template-rows: 40px 1fr;

  &-schema {
    margin-bottom: 6px;
    border-radius: 6px;
    padding: 6px;
    background: $minor_bg_color;
    border: 1px solid transparent;
    display: grid;
    grid-template-columns: 20px 1fr;
    gap: 10px;
    cursor: pointer;

    &.selected {
      border-color: $primary_bg_color;
    }

    &-index {
      height: 20px;
      width: 20px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      background: $secondary_bg_color;
      color: $primary_text_color;
    }
    &-title {
      margin-bottom: 4px;
      font-size: 16px;
      font-weight: 500;
      line-height: 20px;
    }
    &-points {
      margin: 8px 0;
    }
    &-applied {
      display: flex;
      justify-content: space-between;
    }
  }

  &-schemas {
    padding: 10px;
    grid-column: 0;
    grid-row: 1 / span 2;
    border-right-width: 1px;
    border-right-style: solid;
    border-image-source: linear-gradient(
      to bottom,
      transparent 0%,
      $secondary_text_color 50%,
      transparent 100%
    );
    border-image-slice: 1;

    &-title {
      margin-bottom: 16px;
      font-size: 20px;
      font-weight: 500;
      line-height: 22px;
      color: $primary_text_color;
    }

    &-search {
      margin-bottom: 10px;
    }
  }
  &-bar {
    padding: 0 15px;
    grid-column: 2;
    grid-row: 1;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-image-source: linear-gradient(
      to right,
      transparent 0%,
      $secondary_text_color 50%,
      transparent 100%
    );
    border-image-slice: 1;
    display: flex;
    justify-content: space-between;

    &-search {
      flex: none;
      display: flex;
      align-items: center;
      gap: 8px;
      height: 28px;
    }
    &-switch {
      flex: none;
      height: 32px;
      display: flex;
      align-items: center;
    }
  }
  &-table {
    padding: 15px;
    grid-column: 2;
    grid-row: 2;
  }
}
</style>
