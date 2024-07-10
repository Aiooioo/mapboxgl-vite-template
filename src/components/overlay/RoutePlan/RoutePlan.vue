<template>
  <div class="route-planning">
    <div class="route-planning__inner">
      <div class="route-planning__view">
        <component :is="views[mapperStore.currentView]" ref="compRef" />
      </div>
      <div class="route-planning__actions">
        <span
          class="route-planning__action-msg"
          :style="{ visibility: hasValidationError ? 'visible' : 'hidden' }"
          >当前表单还有未完成的项</span
        >

        <span class="route-planning__action-btns">
          <span
            v-if="mapperStore.currentView === 'editor'"
            class="route-planning__action-btn route-planning__action-cancel"
            @click="mapperStore.cancelEditLine"
          >
            <i-mdi-cancel-octagon-outline
              style="margin-right: 3px; font-size: 16px"
            />
            取 消
          </span>
          <span
            v-if="mapperStore.currentView === 'editor'"
            class="route-planning__action-btn route-planning__action-save"
            @click="handleSave"
          >
            <i-mdi-content-save-outline />
          </span>
          <span
            v-if="mapperStore.currentView === 'list'"
            class="route-planning__action-btn route-planning__action-add"
            @click="startAddLine"
          >
            <i-mdi-add />
          </span>
        </span>
      </div>
    </div>
    <div
      class="route-planning__overlay"
      :style="{ display: isLoading ? 'flex' : 'none' }"
    ></div>
    <n-modal
      size="huge"
      preset="dialog"
      style="width: 80%; max-width: 900px; height: 60%"
      title="test"
      :show="showApplyModal"
      role="dialog"
    >
      <RouteApplyPanel />
    </n-modal>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { NModal } from "naive-ui";
import { useMapper } from "@/models/mapper.js";
import { useZone } from "@/models/zone.js";
import RouteList from "./RouteList.vue";
import RouteLineEditor from "./RouteLineEditor.vue";
import RouteApplyPanel from "@/components/overlay/RouteApply/RouteApplyPanel.vue";
import { useCheckPointService } from "../CheckPoints/useCheckPointService.js";
import { useRoutePlan } from "./useRoutePlan.js";
import { saveAddNewRoute } from "./utils/route-save.js";

const showApplyModal = ref(false);
const isLoading = ref(false);
const hasValidationError = ref(false);
const compRef = ref(null);
const { checkPoints } = useCheckPointService();
useRoutePlan();
const mapperStore = useMapper();
const zoneStore = useZone();

const views = {
  list: RouteList,
  editor: RouteLineEditor,
};

function startAddLine() {
  mapperStore.goToAddNewLine();
}

function handleSave() {
  hasValidationError.value = false;

  if (mapperStore.currentView === "editor") {
    const valid = compRef.value.validateNow();
    if (valid !== false) {
      const { data, mode } = valid;
      if (mode === "single") {
        saveAddNewRoute(
          zoneStore.currentId,
          data.start,
          data.end,
          data.points,
          data.threshold,
        );
      }
    } else {
      hasValidationError.value = true;
    }
  }
}


</script>

<style scoped lang="scss">
.route-planning {
  height: 400px;
  position: relative;

  &__inner {
    position: absolute;
    inset: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    z-index: 1;
  }
  &__overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
    z-index: 2;
  }

  &__view {
    flex: 1;
  }

  &__actions {
    width: 100%;
    flex: none;
    height: 56px;
    padding: 0 8px;
    border-top-width: 1px;
    border-top-style: solid;
    border-image-source: linear-gradient(
      to right,
      transparent 0%,
      $secondary_text_color 50%,
      transparent 100%
    );
    border-image-slice: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__action-msg {
    font-size: 13px;
    font-style: italic;
    color: #dc143c;
  }
  &__action-btns {
    display: flex;
    align-items: center;
  }
  &__action-btn {
    font-size: 20px;
    color: $primary_text_color;
    display: flex;
    justify-content: center;
    align-items: center;
    background: $secondary_bg_color;
    cursor: pointer;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.12);
  }
  &__action-cancel {
    margin-right: 8px;
    border-radius: 6px;
    height: 28px;
    width: 72px;
    font-size: 14px;
    background: transparent;
    border: 1px dashed crimson;
    color: crimson;
    box-shadow: none;

    &:hover {
      background: $minor_bg_color;
    }
  }

  &__action-add,
  &__action-save {
    height: 36px;
    width: 36px;
    border-radius: 50%;
  }
}
</style>
