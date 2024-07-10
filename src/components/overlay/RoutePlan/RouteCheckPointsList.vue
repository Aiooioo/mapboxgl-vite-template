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
      <RouteCheckPointRow
        :display-index="1"
        :point="points[0]"
        @remove="removeRow"
      />
    </div>
    <div class="route-planning__points-list-row">
      <RouteCheckPointRow
        :display-index="2"
        :point="points[1]"
        @remove="removeRow"
      />
    </div>
    <div class="route-planning__points-list-row">
      <RouteCheckPointRow
        :display-index="3"
        :point="points[2]"
        @remove="removeRow"
      />
    </div>
    <div class="route-planning__points-list-row">
      <RouteCheckPointRow
        :display-index="4"
        :point="points[3]"
        @remove="removeRow"
      />
    </div>
    <div class="route-planning__points-list-row">
      <RouteCheckPointRow
        :display-index="5"
        :point="points[4]"
        @remove="removeRow"
      />
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
import { defineProps, defineEmits, computed } from "vue";
import RouteCheckPointRow from "./support/RouteCheckPointRow.vue";
import { useMap } from "@/models/map.js";

const props = defineProps(["routeName", "points"]);
const emit = defineEmits(["removePoint"]);
const mapStore = useMap();

function removeRow(rowIndex) {
  emit("removePoint", rowIndex);
}
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

    span {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    span:nth-child(1) {
      flex: none;
      width: 32px;
      border-right: 1px solid $secondary_text_color;
    }

    &:not(:last-child) {
      border-bottom: 1px solid $secondary_text_color;
    }
  }
}
</style>
