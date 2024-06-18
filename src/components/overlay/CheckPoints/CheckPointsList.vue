<template>
  <div class="check-points__filter">
    <n-select placeholder="请指定点位库分组"></n-select>
    <n-input placeholder="根据关键词检索" size="small"></n-input>
  </div>
  <div class="check-points__list">
    <div
      v-for="(item, index) in mapperStore.checkPoints"
      :key="`${mapStore.zone}-check-points-${index}`"
      class="check-points__list-item"
    >
      <span class="check-points__list-item-icon">
        <i-mdi-circle-double />
      </span>
      <span class="check-points__list-item-name">{{ item }}</span>
    </div>
  </div>
</template>

<script setup>
import { NSelect, NInput } from "naive-ui";
import { useMap } from "@/models/map.js";
import { useMapper } from "@/models/mapper.js";

const mapStore = useMap();
const mapperStore = useMapper();
</script>

<style scoped lang="scss">
.check-points__filter {
  height: 34px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: stretch;

  :global(.n-select),
  :global(.n-input) {
    flex: 1;
    height: 100%;
  }
  :global(.n-select) :global(.n-base-selection) {
    height: 100% !important;
  }
}

.check-points__list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;

  &-item {
    padding-left: 6px;
    border-radius: 4px;
    height: 32px;
    display: flex;
    align-items: center;
    background: $minor_bg_color;
    color: $primary_text_color;
    font-size: 14px;
    cursor: pointer;

    &:hover {
      color: $secondary_bg_color;
    }

    &-icon {
      margin-right: 6px;
      font-size: 14px;
    }
    &-name {
      font-size: 12px;
    }
  }
}
</style>
