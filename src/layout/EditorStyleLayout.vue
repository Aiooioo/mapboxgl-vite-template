<template>
  <div class="page-layout_editor">
    <div class="page-layout_editor-bar">
      <slot name="bar"></slot>
    </div>
    <div class="page-layout_editor-main">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page-layout_editor {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  overflow: hidden;

  &-bar {
    height: 64px;
    background: $global_bg_color;
    border-bottom-width: 1px;
    border-image-source: linear-gradient(
      to right,
      transparent 0%,
      $secondary_text_color 50%,
      transparent 100%
    );
    border-image-slice: 1;
  }
  &-main {
    flex: 1;
  }
}
</style>
