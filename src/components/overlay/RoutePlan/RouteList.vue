<template>
  <div class="route-planning-view__list">
    <n-empty
      size="huge"
      style="margin-top: 40px"
      description="还没有创建定向越野任务计划"
      v-if="!mapperStore.lines || mapperStore.lines.length === 0"
    >
      <template #icon>
        <i-mdi-task-auto />
      </template>
    </n-empty>
    <template v-else>
      <div
        v-for="(item, index) in mapperStore.lines"
        :key="`${mapStore.zone}-route-plan-${index}`"
        :class="[
          'route-planning-view__list-item',
          {
            selected: mapperStore.selectedLine === item.id,
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
            <n-tag
              v-if="item.byHand === true"
              size="small"
              round
              type="primary"
              style="font-size: 12px"
              >手动</n-tag
            >
          </span>
          <span class="route-planning-view__list-item-desc">
            该定向越野任务计划共包含可分配线路 1 条。
          </span>
          <span class="route-planning-view__list-item-creator">
            <span>{{ item.createUser }}</span>
            <span>{{ item.updateTime }}</span>
          </span>
          <span class="route-planning-view__list-item-actions">
            <span
              class="route-planning-view__list-item-action"
              :data-routeId="item.id"
              @click="applyAction"
            >
              <i-mdi-user-multiple />
              分配学员
            </span>
            <n-popconfirm
              positive-text="删除"
              negative-text="取消"
              @positive-click="() => deleteAction(item.id)"
            >
              <template #icon>
                <i-mdi-delete-variant style="color: crimson" />
              </template>
              <template #trigger>
                <span
                  class="route-planning-view__list-item-action"
                  :data-routeId="item.id"
                >
                  <i-mdi-delete-outline />
                  删除计划
                </span>
              </template>
              确认删除该任务计划?
            </n-popconfirm>
          </span>
        </span>
      </div>
      <n-pagination
        style="margin-top: 16px"
        :page="mapperStore.lineListPage"
        :page-size="10"
        :item-count="mapperStore.lineListTotal"
      ></n-pagination>
    </template>
  </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";
import { NTag, NEmpty, NPagination, NPopconfirm } from "naive-ui";
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

function applyAction(e) {
  e.stopPropagation();

  const { routeid } = e.target.dataset;

  if (routeid) {
    emit("apply-user", routeid);
  }
}

function deleteAction(id) {
  deleteRouteLineById(id);
}
</script>

<style scoped lang="scss">
.route-planning-view__list {
  display: flex;
  flex-direction: column;

  :deep(.n-empty__description) {
    margin-top: 30px !important;
  }

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
      margin-bottom: 6px;
      font-size: 12px;
      color: $secondary_text_color;
    }
    &-creator {
      margin-bottom: 12px;
      display: flex;
      justify-content: space-between;
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
