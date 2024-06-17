<template>
  <div class="app-zone__switcher">
    <div class="app-zone__switcher-header">
      <i-mdi-select-multiple-marker class="app-zone__switcher-header-icon" />
      训练场地管理
    </div>
    <div class="app-zone__switcher-content">
      <div class="app-zone__switcher-content-search">
        <span class="app-zone__switcher-content-search-icon">
          <i-mdi-search />
        </span>
      </div>
      <div
        v-for="(item, index) in zones"
        :key="`zone-item-${index}`"
        :class="['app-zone__switcher-item', { active: zone === item }]"
      >
        <div class="app-zone__switcher-item-icon">
          <img alt="" :src="'./imgs/zone.png'" />
        </div>
        <div class="app-zone__switcher-item-content">
          <div class="app-zone__switcher-item-title">{{ item }}</div>
          <div class="app-zone__switcher-item-desc">
            关于当前训练场地的详细描述
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useMap } from "@/models/map.js";

const mapStore = useMap();
const { zone } = storeToRefs(mapStore);

const zones = ref(["长沙市", "衡阳市"]);
</script>

<style scoped lang="scss">
.app-zone__switcher {
  min-height: 480px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  background: $panel_bg_color;
  color: $secondary_text_color;
  font-size: 14px;
  pointer-events: auto;

  &-header {
    flex: none;
    height: 48px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    color: $primary_text_color;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-image-source: linear-gradient(
      to right,
      transparent 0%,
      $secondary_text_color 50%,
      transparent 100%
    );
    border-image-slice: 1;
    font-size: 16px;
    font-weight: 500;

    &-icon {
      font-size: 16px;
      color: $primary_text_color;
      margin-right: 8px;
    }
  }

  &-content {
    padding: 10px;
    flex: 1;
    overflow-y: auto;

    &-search {
      height: 40px;
      padding: 0 15px;
      margin-bottom: 8px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      background: $minor_bg_color;

      &-icon {
        display: flex;
        align-items: center;
        font-size: 18px;
        color: $primary_text_color;
      }
    }
  }

  &-item {
    margin-bottom: 8px;
    padding: 8px;
    border-radius: 8px;
    display: flex;
    background: $minor_bg_color;
    border: 1px solid transparent;
    cursor: pointer;

    &.active {
      border-color: $primary_bg_color;
    }

    &-icon {
      width: 96px;
      height: 72px;

      & > img {
        height: 100%;
        width: 100%;
        object-fit: contain;
      }
    }
    &-content {
      margin-left: 12px;
      display: flex;
      flex-direction: column;
    }
    &-title {
      margin-bottom: 6px;
      font-size: 14px;
      color: $primary_text_color;
      font-weight: 500;
    }
    &-desc {
      font-size: 12px;
    }
  }
}
</style>
