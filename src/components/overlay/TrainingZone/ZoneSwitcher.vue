<template>
  <div class="app-zone__switcher">
    <div class="app-zone__switcher-header">
      <i-mdi-select-multiple-marker class="app-zone__switcher-header-icon" />
      切换训练场地
    </div>
    <div class="app-zone__switcher-content">
      <div class="app-zone__switcher-content-search">
        <!--        <span class="app-zone__switcher-content-search-icon">
          <i-mdi-search />
        </span>-->
        <n-input
          clearable
          v-model:value="keyword"
          @update:value="search"
          placeholder="搜索"
        ></n-input>
      </div>

      <div
        v-for="(item, index) in siteList"
        :key="`zone-item-${index}`"
        :class="['app-zone__switcher-item', { active: siteId === item.id }]"
        @click="siteClick(item)"
      >
        <div class="app-zone__switcher-item-icon">
          <img
            alt=""
            :src="
              item.thumbnail
                ? 'data:image/png;base64,' + item.thumbnail
                : './imgs/zone.png'
            "
          />
        </div>
        <div class="app-zone__switcher-item-content">
          <div class="app-zone__switcher-item-title">{{ item.name }}</div>
          <div class="app-zone__switcher-item-desc">
            {{ item.description }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useMap } from "@/models/map.js";
import { useZone } from "@/models/zone.js";
import { useTrainingZone } from "./useTrainingZone.js";

import { useMapper } from "@/store/useMapper.js";
const mapStore = useMap();
const zoneStore = useZone();
const { state } = useTrainingZone();
const {
  currentId: siteId,
  list: siteList,
  total,
  pageNo,
  pageSize,
} = storeToRefs(zoneStore);
const { loadZoneList: getSiteList } = zoneStore;

const mapperStore = useMapper();

const keyword = ref("");
function search() {
  let params = {
    name: keyword.value,
  };
  mapperStore.getSiteList(params);
}
function siteClick(item) {
  siteId.value = item.id;
  const { centerX, centerY, zoom } = item;
  if (centerX && centerY) {
    mapStore.map.flyTo({
      maxDuration: 1200,
      center: [centerX, centerY], // 中心点
      zoom: zoom || mapStore.map.getZoom(), // 缩放比例
    });
  }
}
getSiteList().then((res) => {
  if (siteList.value.length > 0) {
    siteClick(siteList.value[0]);
  }
});
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
      //height: 40px;
      //padding: 0 15px;
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
