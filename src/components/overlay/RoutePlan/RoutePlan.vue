<template>
  <div class="route-planning">
    <div class="route-planning__view">
      <component :is="views[mapperStore.currentView]" />
    </div>
    <div class="route-planning__actions">
      <span
        class="route-planning__action-btn route-planning__action-add"
        @click="startAddLine"
      >
        <i-mdi-add />
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useMapper } from "@/models/mapper.js";
import RouteList from "./RouteList.vue";
import RouteLineEditor from "./RouteLineEditor.vue";

const mapperStore = useMapper();

const views = {
  list: RouteList,
  editor: RouteLineEditor,
};

function startAddLine() {
  mapperStore.goToAddNewLine();
}
</script>

<style scoped lang="scss">
.route-planning {
  height: 400px;
  position: relative;
  display: flex;
  flex-direction: column;

  &__view {
    flex: 1;
  }

  &__actions {
    flex: none;
    height: 56px;
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
    justify-content: flex-end;
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
  &__action-add {
    height: 36px;
    width: 36px;
    border-radius: 50%;
  }
}
</style>
