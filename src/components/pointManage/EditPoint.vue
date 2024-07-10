<script setup lang="tsx">
import { reactive, ref, watch } from "vue";
import { NModal, NForm, NFormItem, NInput, NSelect } from "naive-ui";
import {
  $dataList,
  $createItem,
  $updateItem,
  $deleteItem,
} from "@/utils/api/map/map-data";
import { $siteList } from "@/utils/api/map/map-site";
const isShow = defineModel(false);
const props = defineProps(["data"]);
const emit = defineEmits(["update"]);
const formModel = reactive({
  name: null,
  geom: null,
});
const initFormModel = JSON.parse(JSON.stringify(formModel));
const formRef = ref();
const formRules = reactive({
  /*  name: {
    required: true,
    message: "请输入",
  },*/
  geom: {
    required: true,
    message: "请输入",
  },
});

function clickEditor(row) {
  isShow.value = true;
  Object.assign(formModel, {
    id: row.id,
    geom: row.geom,
    name: row.name,
    site_id: row.site_id,
  });
}

function submit() {
  return formRef.value.validate((errors) => {
    if (errors) return false;
    if (formModel.id !== undefined) {
      const params = {
        tableName: "point",
        attributes: [
          {
            id: formModel.id,
            name: formModel.name,
            geom: formModel.geom,
            site_id: formModel.site_id,
          },
        ],
      };
      return $updateItem(params).then((res) => {
        if (res.code === 200) {
          emit("update");
          window.$message.success("保存成功");
        }
      });
    }
  });
}

const siteList = ref([]);
function getSiteList() {
  const params = {
    pageSize: 9999,
    pageNum: 0,
  };
  $siteList(params).then((res) => {
    siteList.value = res.data.records;
  });
}
watch(isShow, () => {
  if (isShow.value) {
    const row = props.data;
    Object.assign(formModel, props.data);
    console.log(formModel, "--formModel");
  } else {
    Object.assign(formModel, initFormModel);
  }
});

getSiteList();
</script>

<template>
  <n-modal
    v-model:show="isShow"
    preset="dialog"
    :title="formModel.id !== undefined ? '编辑' : '新增'"
    positive-text="确认"
    negative-text="取消"
    :mask-closable="false"
    :show-icon="false"
    @positive-click="submit"
  >
    <n-form
      ref="formRef"
      :model="formModel"
      :rules="formRules"
      label-placement="left"
      label-width="100"
    >
      <n-form-item label="名称" path="name"
        ><n-input
          v-model:value="formModel.name"
          maxlength="50"
          show-count
          clearable
        ></n-input
      ></n-form-item>
      <n-form-item label="经纬度" path="geom"
        ><n-input
          v-model:value="formModel.geom"
          maxlength="50"
          show-count
          clearable
        ></n-input
      ></n-form-item>
      <n-form-item label="关联场地" path="site_id"
        ><n-select
          :options="siteList"
          v-model:value="formModel.site_id"
          clearable
          value-field="id"
          label-field="name"
        ></n-select
      ></n-form-item>
    </n-form>
  </n-modal>
</template>
<style scoped lang="scss">
.content {
  padding: 0 15px 15px;
}
.head {
  margin-bottom: 15px;
}
</style>
