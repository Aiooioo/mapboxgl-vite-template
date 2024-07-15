<template>
  <div class="viewer-tools__pane">
    <div class="viewer-tools__pane-header">
      <div class="viewer-tools__pane-header-title">{{ title }}</div>
      <div class="viewer-tools__pane-header-action" @click="handleClick">
        <i-mdi-close />
      </div>
    </div>
    <div class="viewer-tools__pane-content">
      <keep-alive>
        <component :is="component" />
      </keep-alive>
    </div>
  </div>
</template>

<script setup>
defineProps(["title", "component"]);

const emits = defineEmits(["closePanel"]);

const handleClick = () => {
  emits("closePanel");
};
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
