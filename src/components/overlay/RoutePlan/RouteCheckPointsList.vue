<template>
  <div class="route-planning__points-list">
    <div class="route-planning__points-list-title">{{ props.routeName }}</div>
    <div class="route-planning__points-list-row">
      <span>
        <img
          alt=""
          :src="'./imgs/icons/route-start.svg'"
          height="16"
          width="16"
        />
      </span>
    </div>
    <div class="route-planning__points-list-row">
      <span>1</span>
      <span></span>
      <span></span>
      <span></span>
      <span>
        <i-mdi-close />
      </span>
    </div>
    <div class="route-planning__points-list-row">
      <span>2</span>
      <span></span>
      <span></span>
      <span></span>
      <span>
        <i-mdi-close />
      </span>
    </div>
    <div class="route-planning__points-list-row">
      <span>3</span>
      <span></span>
      <span></span>
      <span></span>
      <span>
        <i-mdi-close />
      </span>
    </div>
    <div class="route-planning__points-list-row">
      <span>4</span>
      <span></span>
      <span></span>
      <span></span>
      <span>
        <i-mdi-close />
      </span>
    </div>
    <div class="route-planning__points-list-row">
      <span>5</span>
      <span></span>
      <span></span>
      <span></span>
      <span>
        <i-mdi-close />
      </span>
    </div>
    <div class="route-planning__points-list-row">
      <span>
        <img
          alt=""
          :src="'./imgs/icons/route-end.svg'"
          height="16"
          width="16"
        />
      </span>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { useMap } from "@/models/map.js";

const props = defineProps(["routeName"]);
const mapStore = useMap();
</script>

<style scoped lang="scss">
.route-planning__points-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid $secondary_text_color;
  font-size: 12px;
  color: $primary_text_color;

  &-title {
    width: 100%;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid $secondary_text_color;
  }

  &-row {
    width: 100%;
    height: 24px;
    display: flex;

    > span {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    > span:nth-child(1) {
      flex: none;
      width: 32px;
      border-right: 1px solid $secondary_text_color;
    }
    > span:nth-child(2),
    > span:nth-child(3) {
      flex: none;
      width: 64px;
      border-right: 1px solid $secondary_text_color;
    }
    > span:nth-child(4) {
      flex: 1;
      border-right: 1px solid $secondary_text_color;
    }
    > span:nth-child(5) {
      flex: none;
      width: 32px;
      color: #d81e06;
      cursor: pointer;
    }

    &:not(:last-child) {
      border-bottom: 1px solid $secondary_text_color;
    }
  }
}
</style>
