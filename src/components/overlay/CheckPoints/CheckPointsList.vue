<template>
  <div class="head">
    <n-dropdown trigger="hover" :options="options" @select="handleSelect">
      <n-button type="primary" size="small">新增点位</n-button>
    </n-dropdown>
    <n-flex inline style="margin-left: 20px" v-if="drawPointList.length">
      <n-button size="small" type="error" @click="clearDraw">清除</n-button>
      <n-button size="small" type="info" @click="save">保存</n-button>
    </n-flex>
  </div>
  <div class="check-points__filter">
    <n-select
      placeholder="请指定点位库分组"
      :options="groups"
      v-model:value="selectedGroup"
    ></n-select>
    <n-input placeholder="根据关键词检索" size="small"></n-input>
  </div>
  <div class="check-points__list">
    <div
      v-for="(item, index) in checkPoints?.features"
      :key="`${mapStore.zone}-check-points-${index}`"
      :class="['check-points__list-item', { selected: selectedId === item.id }]"
      @click="() => highlightCheckPoint(item.id)"
    >
      <span class="check-points__list-item-icon">
        <i-mdi-circle-double />
      </span>
      <span class="check-points__list-item-name">{{ item.id }}</span>
      <div class="btn-box">
        <tooltip-custom
          :size="14"
          type="编辑"
          @click="clickEditor(item)"
        ></tooltip-custom>
        <tooltip-custom
          type="删除"
          :size="14"
          @confirm="deleteSite(item)"
        ></tooltip-custom>
      </div>
    </div>
  </div>
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
      <!--      <n-form-item label="关联场地" path="siteId"
        ><n-select
          :options="siteList"
          v-model:value="importFormModel.siteId"
          label-field="name"
          value-field="id"
          clearable
        ></n-select
      ></n-form-item>-->
      <n-form-item label="上传文件" required path="file">
        <n-upload :default-upload="false" :max="1" @change="fileChange">
          <n-upload-dragger>
            <n-text style="font-size: 16px">
              点击或者拖动文件到该区域，支持shp(压缩包)、geojson
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
  <EditPoint
    v-model="isShow"
    :data="formModel"
    @update="update"
    style="width: 600px"
  ></EditPoint>
</template>

<script setup>
import { ref, reactive, watch, watchEffect } from "vue";
import {
  NSelect,
  NInput,
  NPagination,
  NButton,
  NDropdown,
  NDialog,
  NModal,
  NUpload,
  NUploadDragger,
  NForm,
  NFormItem,
  NFlex,
  NText,
} from "naive-ui";
import { useMap } from "@/models/map.js";
import { useCheckPointService } from "./useCheckPointService.js";
import PointManage from "@/components/pointManage/PointManage.vue";
import { $siteList } from "@/utils/api/map/map-site.tsx";
import {
  $createItem,
  $createItembyMap,
  $dataList,
  $updateItem,
  $deleteItem,
} from "@/utils/api/map/map-data.tsx";
import useMapboxSketch from "@/utils/hooks/useMapboxSketch.js";
import { useSketch } from "@/models/sketch.js";
import { setupWorkflow } from "@/components/overlay/SimpleDrawing/workflow.js";
import { useFeatureProps } from "@/components/overlay/SimpleDrawing/useFeatureProps.js";
import { useFeatureStyler } from "../SymbolStyler/useFeatureStyler.js";
import { useImageryStore } from "@/models/imagery.js";
import { useMapper } from "@/store/useMapper.js";
import { storeToRefs } from "pinia";
import { useMessage } from "naive-ui";
import TooltipCustom from "@/components/TooltipCustom.vue";
import EditPoint from "@/components/pointManage/EditPoint.vue";

const $message = useMessage();
const mapperStore = useMapper();
const { siteId } = storeToRefs(mapperStore);
const imageryStore = useImageryStore();
const sketchStore = useSketch();
const { $channel: $feature } = useFeatureProps(sketchStore.context);
const { $channel: $symbol } = useFeatureStyler(sketchStore.context);
const {
  activeTool,
  $channel: $sketch,
  completeFeature,
  createText,
  createIcon,
  createRect,
  createPolyline,
  createEllipse,
  createCircle,
  createPoint,
} = useMapboxSketch();
const mapStore = useMap();
const checkPointServiceStore = useCheckPointService();
const { selectedId, checkPoints } = storeToRefs(checkPointServiceStore);
const { highlightCheckPointById, initCheckPointSourceAndLayer } =
  checkPointServiceStore;
const isUpload = ref(false);

const selectedGroup = ref("all");
const groups = ref([
  {
    label: "全部",
    value: "all",
  },
]);
const drawPointList = ref([]);
function highlightCheckPoint(itemId) {
  selectedId.value = itemId;

  highlightCheckPointById(itemId);
}
const options = [
  {
    label: "地图选点",
    key: "add",
  },
  {
    label: "批量导入",
    key: "batch",
  },
];

function handleSelect(key) {
  switch (key) {
    case "add":
      // mapperStore.addCheckPoint();
      createPoint();
      // checkCurrentStatus().then(createPoint);
      break;
    case "batch":
      // mapperStore.batchAddCheckPoint();
      isUpload.value = true;
      break;
  }
}
setupWorkflow($sketch, $feature, $symbol);
const isShow = ref(false);
watch(isShow, () => {
  if (!isShow.value) {
    Object.assign(formModel, initFormModel);
  }
});
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
function clickEditor(row) {
  const { id } = row;
  if (id) {
    const params = {
      where: `id in(${id})`,
      tableName: `point`,
      pageSize: 1,
      pageNum: 1,
    };
    $dataList(params).then((res) => {
      if (res.code === 200 && res.data.records?.length) {
        isShow.value = true;
        const item = res.data.records[0];
        Object.assign(formModel, {
          id: item.id,
          geom: item.geom,
          name: item.name,
          site_id: item.site_id,
        });
      }
    });
  }
}
function deleteSite(row) {
  const formData = new FormData();
  formData.append("where", `in(${row.id})`);
  formData.append("tableName", `point`);
  $deleteItem(formData).then((res) => {
    if (res.code === 200) {
      initCheckPointSourceAndLayer();

      $message.success("删除成功");
    }
  });
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
    formData.append("siteId", siteId.value);

    return $createItem(formData).then((res) => {
      $message.success("导入成功");
      initCheckPointSourceAndLayer();
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
getSiteList();
watch(completeFeature, (value) => {
  if (value) {
    sketchStore.onCompleteDrawFeature(value);
    drawPointList.value.push(value);
  }
});
function clearDraw() {
  for (let item of drawPointList.value) {
    const layerId = `draw-render-point-inner-${item.id}`;
    const outerLayerId = `draw-render-point-outer-${item.id}`;
    if (mapStore.map.getLayer(layerId)) {
      mapStore.map.removeLayer(layerId);
      mapStore.map.removeLayer(outerLayerId);
      // 如果没有其他图层再使用相同的源，可以删除源
      const sourceId = mapStore.map.getSource(layerId);
      const outerSourceId = mapStore.map.getSource(outerLayerId);
      if (
        sourceId &&
        !mapStore.map.querySourcesUsed([layerId]).some((id) => id !== sourceId)
      ) {
        mapStore.map.removeSource(sourceId);
        mapStore.map.removeSource(outerSourceId);
      }
    }
  }
  drawPointList.value = [];
}
function save() {
  const attributes = drawPointList.value.map((item) => {
    return {
      site_id: siteId.value,
      geom: `POINT(${item.geometry?.coordinates[0]} ${item.geometry?.coordinates[1]})`,
    };
  });
  const params = {
    tableName: "point",
    attributes,
  };
  $createItembyMap(params).then((res) => {
    if (res.code == 200) {
      $message.success("保存成功");
      clearDraw();
      initCheckPointSourceAndLayer();
    }
  });
}
function update() {
  initCheckPointSourceAndLayer();
}
</script>

<style scoped lang="scss">
.head {
  margin-bottom: 10px;
}
.check-points__filter {
  height: 34px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: stretch;

  :global(.n-select),
  :global(.n-input) {
    flex: 1;
    height: 100%;
  }
  :global(.n-select) :global(.n-base-selection) {
    height: 100% !important;
  }
}

.check-points__list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 6px;
  max-height: 320px;
  overflow-y: auto;
  &-item {
    padding-left: 4px;
    border-radius: 4px;
    height: 32px;
    display: flex;
    align-items: center;
    background: $minor_bg_color;
    color: $primary_text_color;
    font-size: 14px;
    cursor: pointer;
    .btn-box {
      display: none;
      gap: 5px;
      margin-left: auto;
    }
    &.selected {
      color: $primary_bg_color;
    }
    &:hover {
      .btn-box {
        display: inline-flex;
      }
    }
    &:not(.selected):hover {
      color: $secondary_bg_color;
    }

    &-icon {
      margin-right: 4px;
      font-size: 14px;
    }
    &-name {
      font-size: 12px;
    }
  }
}
</style>
