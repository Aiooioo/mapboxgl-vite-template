<template>
  <div class="route-planning-view__list">
    <div
      v-for="(item, index) in mapperStore.lines"
      :key="`${mapStore.zone}-route-plan-${index}`"
      :class="[
        'route-planning-view__list-item',
        {
          selected: mapperStore.selectedLine === item,
        },
      ]"
      @click="() => switchCurrentRouteLine(item.id)"
    >
      <span class="route-planning-view__list-item-icon">
        <span class="route-planning-view__list-item-icon-num">{{
          index + 1
        }}</span>
      </span>
      <span class="route-planning-view__list-item-content">
        <span class="route-planning-view__list-item-title">
          {{ item.name }}
          <span @click="() => emit('apply-user', item.id)">
            <i-mdi-table-user />
          </span>
        </span>
        <span class="route-planning-view__list-item-desc">
          这是一个简要描述该线路的分布和途径点情况的文字
        </span>
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";
import { NRate } from "naive-ui";
import { useMapper } from "@/models/mapper.js";
import { useMap } from "@/models/map.js";

const emit = defineEmits(["apply-user"]);

const mapStore = useMap();
const mapperStore = useMapper();

function switchCurrentRouteLine(routeId) {
  mapperStore.switchDisplayRouteLine(routeId);
}
</script>

<style scoped lang="scss">
.route-planning-view__list {
  display: flex;
  flex-direction: column;

  &-item {
    border-radius: 4px;
    padding: 8px;
    margin-bottom: 8px;
    background: $minor_bg_color;
    border: 1px solid transparent;
    display: flex;
    align-items: stretch;
    cursor: pointer;

    &.selected {
      border-color: $primary_bg_color;
    }

    &:not(.selected):hover {
      border-color: $hint_text_color;
    }

    &-icon {
      flex: none;
      margin-right: 6px;
      width: 24px;
      display: flex;
      align-items: flex-start;

      &-num {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: $primary_text_color;
        background: coral;
      }
    }
    &-content {
      flex: 1;
    }
    &-title {
      margin-bottom: 4px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: $primary_text_color;
      font-size: 14px;
      font-weight: 600;
    }
    &-desc {
      margin-bottom: 4px;
      font-size: 12px;
      color: $secondary_text_color;
    }
  }
}
</style>
