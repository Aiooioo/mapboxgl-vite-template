<template>
  <div class="route-planning__point-select">
    <span
      v-if="state === 'not-select'"
      :class="['route-planning__point-select-btn']"
      @click="handleSelect"
    >
      <img alt="" :src="'./imgs/icons/pick.png'" height="16" width="16" />
      地图选点
    </span>
    <span
      v-if="state === 'selected'"
      :class="['route-planning__point-select-btn']"
      @click="handleSelect"
    >
      <img alt="" :src="'./imgs/icons/repick.png'" height="16" width="16" />
      重新选点
    </span>
    <span
      v-if="state === 'selected'"
      :class="['route-planning__point-select-btn']"
      @click="handleClear"
    >
      <img alt="" :src="'./imgs/icons/clear.png'" height="16" width="16" />
      清除
    </span>
  </div>
</template>

<script setup>
import { ref, watch, defineEmits, defineProps, toValue } from "vue";

const props = defineProps(["point"]);
const emits = defineEmits(["select", "clear"]);

const state = ref("not-select");

function handleSelect() {
  emits("select");
}

function handleClear() {
  emits("clear");
}

watch(
  () => toValue(props.point),
  (value) => {
    if (value) {
      state.value = "selected";
    } else {
      state.value = "not-select";
    }
  },
);
</script>

<style scoped lang="scss">
.route-planning__point-select {
  display: flex;
  align-items: center;
  gap: 16px;

  &-btn {
    flex: 1;
    height: 32px;
    border-radius: 20px;
    color: $primary_text_color;
    font-size: 12px;
    background: $minor_bg_color;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
      background: $secondary_bg_color;
    }

    > img {
      margin-right: 8px;
    }
  }
}
</style>
