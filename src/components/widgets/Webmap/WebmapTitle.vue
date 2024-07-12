<template>
  <div class="mapbox-viewer__webmap-title">
    <template v-if="state === 'normal'">
      <span class="mapbox-viewer__webmap-title-edit" @click="editWebmapTitle">
        <i-mdi-lead-pencil style="color: #60a5fa" />
      </span>
      <span class="mapbox-viewer__webmap-title-text" :title="webmapStore.name"
        ><n-badge dot v-if="webmapStore.dirty"></n-badge>
        <span class="mapbox-viewer__webmap-title-text-inner">{{
          webmapStore.name
        }}</span>
      </span>
    </template>
    <span v-else class="mapbox-viewer__webmap-title-input">
      <n-input
        size="small"
        style="width: 120px"
        v-model:value.trim="inputText"
        @keyup="handleInputKeyboard"
      ></n-input>
    </span>
    <n-popselect
      trigger="hover"
      placement="bottom-end"
      :options="mock"
      size="small"
      scrollable
    >
      <span>
        <i-mdi-keyboard-arrow-down />
      </span>
    </n-popselect>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { NPopselect, NBadge, NInput } from "naive-ui";
import { useWebmap } from "@/models/webmap.js";

const webmapStore = useWebmap();

const state = ref("normal");
const inputText = ref("");

const mock = ref([
  {
    type: "group",
    label: "保存的工程",
    value: "saved",
    children: [
      {
        label: "工程1",
        value: "project1",
      },
    ],
  },
]);

function editWebmapTitle() {
  inputText.value = webmapStore.name;

  state.value = "edit";
}

function handleInputKeyboard(evt) {
  if (evt.keyCode === 27) {
    state.value = "normal";
  } else if (evt.keyCode === 13) {
    if (inputText.value) {
      webmapStore.name = inputText.value;
    }
    state.value = "normal";
  }
}
</script>

<style scoped lang="scss">
.mapbox-viewer__webmap-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: $primary_text_color;

  &:hover &-edit {
    display: flex;
  }

  &-edit {
    flex: none;
    display: none;
    width: 20px;
    cursor: pointer;
  }

  &-text {
    max-width: 200px;
    display: flex;
    align-items: center;
    gap: 6px;

    &-inner {
      flex: 1;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
}
</style>
