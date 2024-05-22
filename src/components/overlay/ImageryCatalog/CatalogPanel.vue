<template>
  <div class="imagery-catalog__panel">
    <div class="imagery-catalog__panel-search">
      <span class="imagery-catalog__panel-search-icon">
        <MagnifyingGlassIcon />
      </span>
    </div>
    <div class="imagery-catalog__panel-content"></div>
    <div class="imagery-catalog__panel-footer">
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
    justify-content: flex-end;
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
