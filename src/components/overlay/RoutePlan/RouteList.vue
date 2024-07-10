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
          <n-tag size="small" round type="primary" style="font-size: 12px"
            >手动</n-tag
          >
        </span>
        <span class="route-planning-view__list-item-desc">
          该定向越野任务计划共包含可分配线路 1 条。
        </span>
        <span class="route-planning-view__list-item-actions">
          <span
            class="route-planning-view__list-item-action"
            @click="() => emit('apply-user', item.id)"
          >
            <i-mdi-user-multiple />
            分配学员
          </span>
          <span
            class="route-planning-view__list-item-action"
            @click="() => deleteRouteTask(item.id)"
          >
            <i-mdi-delete-outline />
            删除计划
          </span>
        </span>
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";
import { NTag } from "naive-ui";
import { useMapper } from "@/models/mapper.js";
import { useMap } from "@/models/map.js";
import { useRoutePlan } from "./useRoutePlan.js";

const emit = defineEmits(["apply-user"]);

const mapStore = useMap();
const mapperStore = useMapper();
const { deleteRouteLineById } = useRoutePlan();

function switchCurrentRouteLine(routeId) {
  mapperStore.switchDisplayRouteLine(routeId);
}

function deleteRouteTask(id) {
  deleteRouteLineById(id);
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
      display: flex;
      flex-direction: column;
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
      margin-bottom: 12px;
      font-size: 12px;
      color: $secondary_text_color;
    }
    &-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    &-action {
      padding: 3px 6px;
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 12px;
      color: $primary_bg_color;
      cursor: pointer;
    }
  }
}
</style>
