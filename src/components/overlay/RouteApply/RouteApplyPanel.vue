<template>
  <div class="route-apply__panel">
    <div class="route-apply__panel-schemas">
      <div class="route-apply__panel-schemas-title">
        <n-badge v-if="isDirtySchema" value="新">
          <span>线路方案</span>
        </n-badge>
        <span v-else>线路方案</span>
      </div>
      <div class="route-apply__panel-schemas-search">
        <n-input style="width: 100%" size="small" placeholder="请输入关键字">
          <template #prefix>
            <i-mdi-search />
          </template>
        </n-input>
      </div>
      <div v-if="hasSchema" class="route-apply__panel-schemas-list">
        <div
          v-if="!!mapperStore.lineInEdit.byHand"
          class="route-apply__panel-schema selected"
        >
          <span class="route-apply__panel-schema-index">1</span>
          <div class="route-apply__panel-schema-content">
            <div class="route-apply__panel-schema-title">
              <strong>手动创建的线路</strong>
            </div>
            <div class="route-apply__panel-schema-points">
              <RouteSchemaPoints :item="mapperStore.lineInEdit" />
            </div>
            <div class="route-apply__panel-schema-applied">
              <!--              <RouteSchemaDifficulty :item="mapperStore.lineInEdit" />-->
              <RouteSchemaApplied :item="mapperStore.lineInEdit" />
            </div>
          </div>
        </div>
        <template v-else>
          <div
            v-for="(item, index) in schemas"
            :key="`route-schema-${index}`"
            :class="[
              'route-apply__panel-schema',
              { selected: schema === item.id },
            ]"
            @click="() => (schema = item.id)"
          >
            <span class="route-apply__panel-schema-index">{{ index + 1 }}</span>
            <div class="route-apply__panel-schema-content">
              <div class="route-apply__panel-schema-title">
                <span><strong>线路 #</strong> {{ item.id + 1 }}</span>
                <n-badge
                  dot
                  v-if="
                    item.applyUsers.addedUsers.length > 0 ||
                    item.applyUsers.removeUsers.length > 0
                  "
                ></n-badge>
              </div>
              <div class="route-apply__panel-schema-points">
                <RouteSchemaPoints :item="item" />
              </div>
              <div class="route-apply__panel-schema-applied">
                <!--                <RouteSchemaDifficulty :item="item" />-->
                <RouteSchemaApplied :item="item" />
              </div>
            </div>
          </div>
        </template>
      </div>
      <div v-else class="route-apply__panel-schemas-noop">
        <n-spin v-if="isGeneratingSchema" size="large">
          <template #icon>
            <i-mdi-loading style="font-size: 36px" />
          </template>
        </n-spin>
        <template v-else>
          <n-empty size="huge" description="当前任务计划还没有线路方案">
            <template #icon>
              <i-mdi-scatter-plot-outline />
            </template>
          </n-empty>
          <a href="javascript:void(0)" @click="generateRandomSchema">
            现在去生成
          </a>
        </template>
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
        <n-divider vertical></n-divider>
        <n-input
          v-model:value.trim="inputUserKeywords"
          clearable
          size="small"
          style="width: 180px"
          placeholder="学员搜索"
          @clear="clearUserSearch"
        >
          <template #prefix>
            <i-mdi-search />
          </template>
        </n-input>
        <n-button type="info" size="small" @click="handleUserSearch">
          <template #icon>
            <i-mdi-search />
          </template>
          搜索
        </n-button>
      </span>
      <span class="route-apply__panel-bar-switch"></span>
    </div>
    <div class="route-apply__panel-table">
      <n-data-table
        :columns="columns"
        :bordered="false"
        :data="users"
        :row-key="(row) => row.id"
        :checked-row-keys="appliedUserIds"
        @update:checked-row-keys="handleUserCheck"
      />
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  computed,
  watch,
  defineProps,
  defineExpose,
  onMounted,
} from "vue";
import {
  NBadge,
  NEmpty,
  NDivider,
  NInput,
  NSelect,
  NDataTable,
  NButton,
  NSpin,
} from "naive-ui";
import _ from "lodash";
import { useMapper } from "@/models/mapper.js";
import { useRouteApply } from "./hooks/useRouteApply.js";
import { useUserList } from "./hooks/useUserList.js";
import RouteSchemaPoints from "./support/RouteSchemaPoints.vue";
import RouteSchemaDifficulty from "./support/RouteSchemaDifficuty.vue";
import RouteSchemaApplied from "./support/RouteSchemaApplied.vue";
import { timeout } from "@/utils/promise-utils.js";

const props = defineProps({
  zonePoints: {},
});

const inputUserKeywords = ref("");
const searchUserKeywords = ref("");
const currentGrade = ref(2024);

const mapperStore = useMapper();
const {
  schema,
  schemas,
  hasSchema,
  isGeneratingSchema,
  isDirtySchema,
  flushApplyUsers,
  generateRouteSchemas,
  updateRoutePlanSchemas,
  fulfillSchemasWithApplyUsers,
} = useRouteApply(props.zonePoints);
const { users, savedApplyData, appliedUsers } = useUserList(
  currentGrade,
  searchUserKeywords,
);

const appliedUserIds = computed(() => {
  if (schemas.value === null || schema.value === null) return [];

  const currentSchema = schemas.value.find((s) => s.id === schema.value);

  return currentSchema.applyUsers.applyUsers;
});

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
    key: "nickName",
  },
  {
    title: "学员学号",
    key: "idCard",
  },
  {
    title: "学员账号",
    key: "username",
  },
  {
    title: "所属年级",
    key: "deptName",
  },
];

function clearUserSearch() {
  searchUserKeywords.value = "";
}

function handleUserSearch() {
  searchUserKeywords.value = inputUserKeywords.value;
}

function handleUserCheck(rowKeys, rows, meta) {
  const currentSchema = schemas.value.find((s) => s.id === schema.value);

  if (meta.action === "check") {
    currentSchema.applyUsers.addUser(meta.row.id);
  } else if (meta.action === "uncheck") {
    currentSchema.applyUsers.removeUser(meta.row.id);
  }
}

function handleSave() {
  const promises = [];

  // 第一步先保存exam的变更
  if (isDirtySchema.value) {
    promises.push(updateRoutePlanSchemas());
  }

  // 第二步更新所有的分配关系
  _.each(
    _.filter(schemas.value, (s) => s.applyUsers.isDirty()),
    (s) => {
      promises.push(...flushApplyUsers(s));
    },
  );

  return Promise.all([...promises, timeout(1000)]).then(() => {});
}

function generateRandomSchema() {
  generateRouteSchemas();
}

watch(appliedUsers, (value) => {
  if (Array.isArray(value)) {
    fulfillSchemasWithApplyUsers(savedApplyData);
  }
});

onMounted(() => {
  if (mapperStore.lineInEdit) {
    appliedUserIds.value = mapperStore.lineInEdit.applyUsers || [];
  }
});

defineExpose({ handleSave });
</script>

<style scoped lang="scss">
.route-apply__panel {
  width: 100%;
  height: 480px;
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: 40px 1fr;

  &-schema {
    margin-bottom: 6px;
    border-radius: 6px;
    padding: 8px;
    background: $global_bg_color;
    border: 1px solid transparent;
    display: grid;
    grid-template-columns: 20px 1fr;
    gap: 6px;
    cursor: pointer;

    &.selected {
      border-color: $primary_bg_color;
    }

    &-index {
      height: 20px;
      width: 20px;
      border-radius: 50%;
      font-size: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: $primary_bg_color;
      color: $primary_text_color;
    }
    &-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
      padding-right: 8px;
      font-size: 13px;
      font-weight: 500;
      line-height: 20px;
    }
    &-points {
      margin: 2px 0 16px;
    }
    &-applied {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  &-schemas {
    height: 100%;
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
    overflow-y: auto;

    &-title {
      margin-bottom: 16px;
      font-size: 16px;
      font-weight: 500;
      line-height: 1.5;
      color: $primary_text_color;
    }

    &-search {
      margin-bottom: 10px;
    }

    &-noop {
      padding-top: 40px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;

      :deep(.n-empty__description) {
        margin-top: 40px !important;
      }

      a {
        color: $primary_bg_color;
        text-decoration: underline;
      }
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
