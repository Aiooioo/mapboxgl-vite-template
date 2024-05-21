<template>
  <Select v-model="objectType">
    <SelectTrigger>
      <SelectValue placeholder="请选择对象分类" />
    </SelectTrigger>

    <SelectContent>
      <SelectGroup>
        <SelectItem
          v-for="(item, index) in options"
          :key="item.value"
          :value="item.value"
        >
          {{ item.label }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>

<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const objectType = ref();

const options = [
  {
    label: "飞机",
    value: "airplane",
  },
  {
    label: "轮船",
    value: "ship",
  },
];
</script>
