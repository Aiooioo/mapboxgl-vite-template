<template>
  <div class="imagery-catalog__panel">
    <div class="imagery-catalog__panel-search">
      <span class="imagery-catalog__panel-search-icon">
        <MagnifyingGlassIcon />
      </span>
    </div>
    <div class="imagery-catalog__panel-content">
      <CatalogList />
    </div>
    <div class="imagery-catalog__panel-footer">
      <div class="imagery-catalog__panel-layers">
        <div class="imagery-catalog__panel-layers-count">
          当前已添加 {{ 0 }} 个图层
        </div>
        <div class="imagery-catalog__panel-layers-action">
          <Button
            variant="link"
            class="px-0 py-0 h-2 text-[12px]"
            :style="{
              '--primary': '255, 91.7%, 76.3%',
            }"
            >全部移除</Button
          >
        </div>
      </div>
      <span class="imagery-catalog__panel-collapse">
        <ArrowLeftStartOnRectangleIcon />
      </span>
    </div>
  </div>
</template>

<script setup>
import {
  MagnifyingGlassIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/vue/16/solid";
import { Button } from "@/components/ui/button";
import CatalogList from "@/components/overlay/ImageryCatalog/CatalogList.vue";
</script>

<style scoped lang="scss">
.imagery-catalog__panel {
  padding: 16px;
  border-radius: 6px;
  background: $panel_bg_color;
  display: flex;
  flex-direction: column;
  pointer-events: auto;

  &-search {
    flex: none;
    padding: 0 10px;
    margin-bottom: 16px;
    height: 36px;
    width: 100%;
    display: flex;
    align-items: center;
    border-radius: 6px;
    background: $minor_bg_color;

    &-icon {
      flex: none;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: $secondary_text_color;
    }
  }

  &-content {
    flex: 1;
    overflow-y: auto;
  }

  &-footer {
    flex: none;
    height: 48px;
    border-top-width: 1px;
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

  &-layers {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    &-count {
      font-size: 12px;
      line-height: 12px;
      color: $secondary_text_color;
    }

    &-action {
      font-size: 12px;
      line-height: 16px;
      color: $primary_bg_color;
    }
  }

  &-collapse {
    flex: none;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $secondary_text_color;
    cursor: pointer;

    &:hover {
      color: $secondary_bg_color;
    }
  }
}
</style>
