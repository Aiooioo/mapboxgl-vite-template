<template>
  <div class="viewer-tools__pane">
    <div class="viewer-tools__pane-header">
      <div class="viewer-tools__pane-header-title">{{ displayTitle }}</div>
      <div class="viewer-tools__pane-header-action" @click="closePanel">
        <i-mdi-close />
      </div>
    </div>
    <div class="viewer-tools__pane-content">
      <component :is="tools[logicalKey]" />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";
import CheckPointsList from "@/components/overlay/CheckPoints/CheckPointsList.vue";
import RoutePlan from "@/components/overlay/RoutePlan/RoutePlan.vue";
import DrawingPane from "@/components/overlay/SimpleDrawing/DrawingPane.vue";
import LocationType from "@/components/overlay/LocationType/LocationType.vue";
import { useMap } from "@/models/map.js";

const mapStore = useMap();

const tools = {
  checks: CheckPointsList,
  mapper: RoutePlan,
  drawing: DrawingPane,
  location: LocationType,
};

const logicalKey = computed(() => {
  const key = mapStore.activeBar;

  return key;
});

const displayTitle = computed(() => {
  switch (logicalKey.value) {
    case "checks":
      return "点位库";
    case "mapper":
      return "线路规划";
    case "drawing":
      return "地图标注";
    case "print":
      return "制图出图";
    case "location":
      return "标注类型";
  }

  return "";
});

function closePanel() {
  mapStore.switchActiveTool("");
}
</script>

<style scoped lang="scss">
.viewer-tools__pane {
  max-height: 480px;
  width: 330px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  background: $panel_bg_color;
  pointer-events: auto;

  &-header {
    flex: none;
    padding-left: 10px;
    height: 48px;
    min-width: 330px;
    display: flex;
    align-items: center;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-image-source: linear-gradient(
      to right,
      transparent 0%,
      $secondary_text_color 50%,
      transparent 100%
    );
    border-image-slice: 1;
    color: $primary_text_color;

    &-title {
      flex: 1;
      font-size: 16px;
      font-weight: 500;
    }
    &-action {
      flex: none;
      width: 48px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 24px;
      font-weight: 700;
      border-left: 1px solid $secondary_text_color;
      cursor: pointer;
    }
  }

  &-content {
    flex: 1;
    overflow-y: auto;
    padding: 10px;
  }
}
</style>
