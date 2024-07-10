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
      <span class="route-planning-view__editor-row-label">任务名称</span>
      <span class="route-planning-view__editor-row-wrapper">
        <n-input
          v-model:value="taskName"
          round
          size="small"
          placeholder="请输入定向越野任务标识"
        />
      </span>
    </div>
    <div class="route-planning-view__editor-row">
      <span class="route-planning-view__editor-row-label">任务起点</span>
      <span class="route-planning-view__editor-row-wrapper">
        <img
          alt=""
          :src="'./imgs/icons/start-point.png'"
          height="24"
          width="24"
        />
        <RoutePointSelect
          style="flex: 1; margin-left: 10px"
          :point="selectedStart"
          @select="beginSelectStart"
          @clear="clearSelectedStart"
        />
      </span>
    </div>
    <div class="route-planning-view__editor-row">
      <span class="route-planning-view__editor-row-label">任务终点</span>
      <span class="route-planning-view__editor-row-wrapper">
        <img
          alt=""
          :src="'./imgs/icons/end-point.png'"
          height="24"
          width="24"
        />
        <RoutePointSelect
          style="flex: 1; margin-left: 10px"
          :point="selectedEnd"
          @select="beginSelectEnd"
          @clear="clearSelectedEnd"
        />
      </span>
    </div>
    <div class="route-planning-view__editor-row">
      <span class="route-planning-view__editor-row-label flex justify-between">
        <strong>线路规划</strong>
        <span class="route-planning-view__editor-modes">
          <span
            :class="[
              'route-planning-view__editor-mode',
              { selected: routeLineMode === 'manual' },
            ]"
            @click="() => switchRouteLineMode('manual')"
            >手动</span
          >
          <span
            :class="[
              'route-planning-view__editor-mode',
              { selected: routeLineMode === 'auto' },
            ]"
            @click="() => switchRouteLineMode('auto')"
            >自动</span
          >
        </span>
      </span>
      <span class="route-planning-view__editor-row-wrapper">
        <RouteCheckPointsList
          :route-name="taskName"
          :points="checkPoints"
          @remove-point="removeCheckPointAt"
        />
      </span>
    </div>

    <div class="route-planning-view__editor-row">
      <span class="route-planning-view__editor-row-label">路线难度</span>
      <span class="route-planning-view__editor-row-wrapper">
        <span class="route-planning-view__editor-rates">
          <span
            :class="[
              'route-planning-view__editor-rate very-easy',
              { selected: singleDifficulty === 'very-easy' },
            ]"
            @click="() => (singleDifficulty = 'very-easy')"
          >
            <span class="route-planning-view__editor-rate-inner">非常简单</span>
          </span>
          <span
            :class="[
              'route-planning-view__editor-rate easy',
              { selected: singleDifficulty === 'easy' },
            ]"
            @click="() => (singleDifficulty = 'easy')"
          >
            <span class="route-planning-view__editor-rate-inner">简单</span>
          </span>
          <span
            :class="[
              'route-planning-view__editor-rate medium',
              { selected: singleDifficulty === 'medium' },
            ]"
            @click="() => (singleDifficulty = 'medium')"
          >
            <span class="route-planning-view__editor-rate-inner">中等</span>
          </span>
          <span
            :class="[
              'route-planning-view__editor-rate hard',
              { selected: singleDifficulty === 'hard' },
            ]"
            @click="() => (singleDifficulty = 'hard')"
          >
            <span class="route-planning-view__editor-rate-inner">困难</span>
          </span>
        </span>
      </span>
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  shallowRef,
  watch,
  toValue,
  onMounted,
  onUnmounted,
  defineExpose,
} from "vue";
import { NInput } from "naive-ui";
import RoutePointSelect from "./RoutePointSelect.vue";
import RouteCheckPointsList from "./RouteCheckPointsList.vue";
import { useMap } from "@/models/map.js";
import { useMapper } from "@/models/mapper.js";
import useMapboxSketch from "@/utils/hooks/useMapboxSketch.js";
import {
  renderStartPointSymbol,
  clearStartPointSymbol,
  renderEndPointSymbol,
  clearEndPointSymbol,
} from "./utils/render-start-end.js";
import { useRouteCheckPoints } from "./useRouteCheckPoints.js";
import {
  prepareAnimationLineSource,
  animateLineSymbol,
  clearAnimationLineSource,
} from "./utils/render-route-line.js";
import { validateSingleRoute } from "./utils/validator.js";
import { RouteThresholds } from "./utils/thresholds.js";

const errorMsg = ref("");
const taskName = ref("");
const singleDifficulty = ref("medium");
const routeLineMode = ref("manual");
const selectedStart = shallowRef(null);
const selectedEnd = shallowRef(null);
const currentSelectionPoint = ref("");
const { createPoint, completeFeature } = useMapboxSketch();

const mapStore = useMap();
const mapperStore = useMapper();
const { checkPoints, removeCheckPointAt } = useRouteCheckPoints();

function switchRouteLineMode(mode) {
  routeLineMode.value = mode;
}

function beginSelectStart() {
  currentSelectionPoint.value = "start";

  createPoint();
}

function clearSelectedStart() {
  selectedStart.value = null;

  clearStartPointSymbol(toValue(mapStore.map));
}

function beginSelectEnd() {
  currentSelectionPoint.value = "end";

  createPoint();
}

function clearSelectedEnd() {
  selectedEnd.value = null;

  clearEndPointSymbol(toValue(mapStore.map));
}

function clearValidationError() {
  errorMsg.value = "";
}

function validateNow() {
  clearValidationError();

  try {
    validateSingleRoute(taskName, selectedStart, selectedEnd, checkPoints);
  } catch (e) {
    errorMsg.value = e;

    return false;
  }

  return {
    mode: "single",
    data: {
      name: taskName.value,
      start: selectedStart.value,
      end: selectedEnd.value,
      points: checkPoints.value,
      threshold: RouteThresholds[singleDifficulty.value],
    },
  };
}

watch(completeFeature, (value) => {
  if (value) {
    if (currentSelectionPoint.value === "start") {
      selectedStart.value = value;

      renderStartPointSymbol(toValue(mapStore.map), value);
    } else if (currentSelectionPoint.value === "end") {
      selectedEnd.value = value;

      renderEndPointSymbol(toValue(mapStore.map), value);
    }

    currentSelectionPoint.value = "";
  }
});

watch(
  () => [selectedStart.value, selectedEnd.value, checkPoints.value],
  () => {
    if (
      selectedStart.value &&
      selectedEnd.value &&
      checkPoints.value.length > 0
    ) {
      animateLineSymbol(
        toValue(mapStore.map),
        selectedStart.value,
        selectedEnd.value,
        checkPoints.value,
      );
    }
  },
  {
    deep: true,
  },
);

onMounted(() => {
  prepareAnimationLineSource(toValue(mapStore.map));
});
onUnmounted(() => {
  clearAnimationLineSource(toValue(mapStore.map));
});

defineExpose({ validateNow });
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

  &-modes {
    width: 80px;
    height: 24px;
    border-radius: 4px;
    background: $minor_bg_color;
    display: flex;
    color: $primary_text_color;
    font-size: 12px;
    overflow: hidden;
  }
  &-mode {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &.selected {
      background: $secondary_bg_color;
    }
  }

  &-rates {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  &-rate {
    height: 32px;
    width: 72px;
    display: flex;
    border: 2px solid transparent;
    color: #121212;
    font-size: 12px;
    box-sizing: border-box;
    cursor: pointer;

    &-inner {
      flex: 1;
      margin: 2px;
      background: transparent;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &.very-easy &-inner {
      background: white;
    }
    &.easy &-inner {
      background: #ffff00;
    }
    &.medium &-inner {
      background: #ed7d31;
    }
    &.hard &-inner {
      background: #7f6000;
    }

    &.selected {
      border-color: $primary_bg_color;
    }
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
      font-weight: 500;
    }

    &-wrapper {
      display: flex;
      align-items: center;

      :global(.n-input),
      :global(.n-radio-group) {
        font-size: 13px;
      }
    }
  }
}
</style>
