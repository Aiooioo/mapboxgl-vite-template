<script setup lang="tsx">
import {
  $dataList,
  $createItem,
  $updateItem,
  $deleteItem,
} from "@/utils/api/map/map-data";
import TooltipCustom from "@/components/TooltipCustom.vue";
import { $siteList } from "@/utils/api/map/map-site";
const isShow = ref(false);
function openModal() {
  isShow.value = true;
}
const formModel = reactive({
  name: null,
  geom: null,
});
const initFormModel = JSON.parse(JSON.stringify(formModel));
const formRef = ref();
const formRules = reactive({
  name: {
    required: true,
    message: "请输入",
  },
  geom: {
    required: true,
    message: "请输入",
  },
});
const isUpload = ref(false);

const columns = [
  {
    type: "selection",
  },
  {
    title: "点位名称",
    key: "name",
  },
  {
    title: "所属场地",
    key: "difficulty",
  },
  {
    title: "随机字密",
    key: "type",
  },
  {
    title: "经纬度",
    key: "geom",
  },
  {
    title: "创建时间",
    key: "create_time",
  },
  {
    title: "操作",
    render(row) {
      return (
        <NFlex>
          <TooltipCustom
            type="编辑"
            onClick={() => clickEditor(row)}
          ></TooltipCustom>
          <TooltipCustom
            type="删除"
            onConfirm={() => deleteSite(row)}
          ></TooltipCustom>
          {/*
            <TooltipCustom
              type="预览"
              onClick={() => btnClick(row)}
            ></TooltipCustom>
          */}
        </NFlex>
      );
    },
  },
];
function btnClick(row) {
  console.log(row, "--row");
}
function clickEditor(row) {
  isShow.value = true;
  Object.assign(formModel, {
    id: row.id,
    geom: row.geom,
    name: row.name,
    site_id: row.site_id,
  });
}
const tableData = ref([]);
const searchParams = reactive({
  name: "",
  tableName: "point",
  site_id: null,
});
const pagination = reactive({
  page: 1,
  pageSizes: [10, 20],
  showQuickJumper: true,
  showSizePicker: true,
  itemCount: 0,
  pageSize: 10,
  onChange: (page) => {
    pagination.page = page;
    getDataList();
  },
  onUpdatePageSize: (pageSize) => {
    pagination.pageSize = pageSize;
    pagination.page = 1;
    getDataList();
  },
});
function getDataList() {
  const params = {
    pageSize: pagination.pageSize,
    pageNum: pagination.page,
    ...searchParams,
  };
  if (params.name) {
    params.where = `name in('${params.name}')`;
  }
  delete params.name;
  if (params.site_id) {
    params.where = `site_id in('${params.site_id}')`;
  }
  delete params.site_id;
  $dataList(params).then((res) => {
    tableData.value = res.data.records;
    pagination.itemCount = res.data.total;
    console.log(pagination, "--pagination");
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
          getDataList();
          window.$message.success("保存成功");
        }
      });
    }
    /* return $createItem({ pid: 0, ...formModel }).then((res) => {
      if (res.code === 200) {
        getDataList();
        window.$message.success("保存成功");
      }
    });*/
  });
}
function cancel() {}
function deleteSite(row) {
  const formData = new FormData();
  formData.append("where", `in(${row.id})`);
  formData.append("tableName", `point`);
  $deleteItem(formData).then((res) => {
    if (res.code === 200) {
      getDataList();
      window.$message.success("删除成功");
    }
  });
}

function searchData() {
  pagination.page = 1;
  getDataList();
}
function updateSite(val) {
  importFormModel.siteId = val;
  searchData();
}
function resetData() {
  pagination.page = 1;
  Object.assign(searchParams, {
    name: null,
    site_id: null,
  });
  getDataList();
}
function fileChange({ file, fileList, event }) {
  console.log(file, fileList, event);
  if (fileList?.length) {
    importFormModel.file = file.file;
  } else {
    importFormModel.file = null;
  }
}
const importFileTypes = [
  { label: "shp压缩包", value: "shp" },
  { label: "geojson", value: "geojson" },
];
const importFormModel = reactive({ siteId: null, fileType: null, file: null });
const importFormRef = ref();
const importFormRules = reactive({
  fileType: { required: true, message: "请选择文件类型" },
  file: { required: true, message: "请上传文件" },
  siteId: { required: true, message: "请选择" },
});
function confirmImport() {
  return importFormRef.value.validate((errors) => {
    if (errors) return false;
    const formData = new FormData();
    formData.append("file", importFormModel.file);
    formData.append("tableName", "point");
    formData.append("fileType", importFormModel.fileType);
    formData.append("siteId", importFormModel.siteId);

    return $createItem(formData).then((res) => {
      $message.success("导入成功");
      getDataList();
    });
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
  if (!isShow.value) {
    Object.assign(formModel, initFormModel);
  }
});
getDataList();
getSiteList();
</script>

<template>
  <!--  <VCard title="点位库管理">
    <div class="content">
      <header class="head">
        <div class="flex pd-4 justify-space-between">
          <div class="flex gap-2 items-center">
            <span class="flex-none">场地:</span>
            <n-select
              :options="siteList"
              value-field="id"
              label-field="name"
              v-model:value="searchParams.site_id"
              clearable
              style="width: 180px"
              @update:value="updateSite"
            ></n-select>
            <div class="flex-none">名称:</div>
            <n-input
              style="width: 180px"
              clearable
              placeholder="请输入关键字"
              v-model:value="searchParams.name"
              @keydown.enter="searchData"
            />
            <n-button type="primary" @click="searchData">搜索</n-button>
            <n-button @click="resetData">重置</n-button>
          </div>
          <div class="flex gap-2 items-center">
            &lt;!&ndash;            <n-button @click="openModal" type="primary">新增</n-button>&ndash;&gt;
            <n-button @click="isUpload = true">批量导入</n-button>
          </div>
        </div>
      </header>
      <n-data-table
        :columns="columns"
        :data="tableData"
        :remote="true"
        :pagination="pagination"
        :row-key="(row) => row.id"
        striped
      />
    </div>
  </VCard>-->
  <n-modal
    v-model:show="isShow"
    preset="dialog"
    :title="formModel.id !== undefined ? '编辑' : '新增'"
    positive-text="确认"
    negative-text="取消"
    :mask-closable="false"
    :show-icon="false"
    @positive-click="submit"
    @negative-click="cancel"
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
  <n-modal
    :mask-closable="false"
    v-model:show="isUpload"
    preset="dialog"
    :show-icon="false"
    title="批量导入"
    positive-text="确认"
    negative-text="取消"
    @positive-click="confirmImport"
  >
    <n-form
      ref="importFormRef"
      :model="importFormModel"
      :rules="importFormRules"
      label-placement="left"
      label-width="100"
    >
      <n-form-item label="关联场地" path="siteId"
        ><n-select
          :options="siteList"
          v-model:value="importFormModel.siteId"
          label-field="name"
          value-field="id"
          clearable
        ></n-select
      ></n-form-item>
      <n-form-item label="上传文件" required path="file">
        <n-upload :default-upload="false" :max="1" @change="fileChange">
          <n-upload-dragger>
            <n-text style="font-size: 16px">
              点击或者拖动文件到该区域来上传，支持shp(压缩包)、geojson
            </n-text>
          </n-upload-dragger>
        </n-upload>
      </n-form-item>
      <n-form-item label="文件类型" path="fileType" required
        ><n-select
          :options="importFileTypes"
          v-model:value="importFormModel.fileType"
          clearable
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
