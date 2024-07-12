import {
  ref,
  reactive,
  computed,
  watchEffect,
  toRaw,
  toValue,
  onMounted,
} from "vue";
import _ from "lodash";
import { useMapper } from "@/models/mapper.js";
import { useZone } from "@/models/zone.js";
import { generateLineSchema } from "../utils/random-generate.js";
import { request } from "@/utils/api/request.ts";
import { timeout } from "@/utils/promise-utils.js";
import RouteSchemaApplyUsers from "../data/RouteSchemaApplyUsers.js";

function createRouteApply(zoneId, examId, subId, userId) {
  return request({
    url: "/map/routeApply/create",
    method: "POST",
    data: {
      siteId: zoneId,
      examId,
      subId: `${subId}`,
      applyStudent: userId,
      routeIds: [],
      difficulty: 0,
    },
  });
}

function deleteRouteApply(applyId) {
  return request({
    url: `/map/routeApply/delete/${applyId}`,
    method: 'POST'
  })
}

function getRouteApplyListByZone(zoneId) {
  return request({
    url: "/map/routeApply/list",
    method: "GET",
    params: {
      siteId: zoneId,
      pageNum: 1,
      pageSize: 999,
    },
  });
}

function updateRouteExamPointList(examId, pointList) {
  return request({
    url: "/exam/route/update",
    method: "POST",
    data: {
      id: examId,
      pointList,
    },
  });
}

function convertExam2Schemas(exam) {
  if (exam.pointList) {
    const valid = _.slice(exam.pointList, 1, exam.pointList.length - 1).filter(
      (i) => i.split(",").length === 5,
    );

    return valid.map((d, i) => {
      return {
        id: i,
        pointList: d.split(","),
        applyUsers: new RouteSchemaApplyUsers(exam.id, i),
        isUsersDirty: false,
      };
    });
  }

  return [];
}

function convertCheckPoints2Schemas(exam, checkPoints, groupIndex) {
  return {
    id: groupIndex,
    pointList: checkPoints.map((p) => p.id),
    applyUsers: new RouteSchemaApplyUsers(exam.id, groupIndex),
    isUsersDirty: true,
  };
}

const useRouteApply = (allZonePoints) => {
  const isGeneratingSchema = ref(false);
  const isDirtySchema = ref(false);
  const schema = ref(null);
  const schemas = ref([]);

  const mapperStore = useMapper();
  const pagination = reactive({
    total: 0,
    pageSize: 10,
    pageNum: 1,
  });
  const zoneStore = useZone();

  const hasSchema = computed(() => {
    const line = mapperStore.lineInEdit;

    if (line) {
      if (line.byHand) {
        return true;
      } else {
        const checkPoints = _.slice(
          line.pointList,
          1,
          line.pointList.length - 1,
        );
        if (checkPoints.length > 0) {
          return checkPoints[0].indexOf(",") > -1;
        }
      }
    }

    return false;
  });

  function generateRouteSchemas() {
    isGeneratingSchema.value = true;

    const exceptedSchemasCount =
      mapperStore.lineInEdit.pointList[1].indexOf(",") > -1
        ? mapperStore.lineInEdit.pointList.length - 2
        : +mapperStore.lineInEdit.pointList[1];

    Promise.all([
      generateLineSchema(allZonePoints, exceptedSchemasCount),
      timeout(1500),
    ])
      .then(([randomPoints]) => {
        schemas.value = _.map(randomPoints, (checkPoints, index) => {
          return convertCheckPoints2Schemas(
            mapperStore.lineInEdit,
            checkPoints,
            index,
          );
        });

        mapperStore.lineInEdit.originPointList =
          mapperStore.lineInEdit.pointList;
        mapperStore.lineInEdit.pointList = [
          mapperStore.lineInEdit.originPointList[0],
          ...schemas.value.map((s) => {
            return s.pointList.join(",");
          }),
          mapperStore.lineInEdit.originPointList[2],
        ];

        schema.value = 0;

        isDirtySchema.value = true;
      })
      .finally(() => {
        isGeneratingSchema.value = false;
      });
  }

  async function updateRoutePlanSchemas() {
    try {
      const res = await updateRouteExamPointList(
        mapperStore.lineInEdit.id,
        toRaw(mapperStore.lineInEdit.pointList),
      );
      if (res && res.code === 200) {
        delete mapperStore.lineInEdit.originPointList;
        isDirtySchema.value = false;
      }
    } catch (e) {
      console.log(e);
    }
  }

  function flushApplyUsers(schemaInst) {
    const promises = [];

    _.each(schemaInst.applyUsers.addedUsers, (add) => {
      promises.push(
        createRouteApply(
          zoneStore.currentId,
          mapperStore.lineInEdit.id,
          schemaInst.id,
          add,
        ).then(() => {
          schemaInst.applyUsers.addedUsers.splice(
            schemaInst.applyUsers.addedUsers.indexOf(add),
            1,
          );
        }),
      );
    });

    _.each(schemaInst.applyUsers.removeUsers, (remove) => {


      promises.push(
          deleteRouteApply()
      )
    });

    return promises;
  }

  function fulfillSchemasWithApplyUsers(applyData) {
    const schemaData = _.groupBy(
      _.filter(toValue(applyData), (d) => !!d.subId),
      (d) => d.subId,
    );
    _.each(_.keys(schemaData), (k) => {
      const idx = parseInt(k);

      const uniqueUsers = _.groupBy(schemaData[k], (d) => d.applyStudent);
      _.each(_.keys(uniqueUsers), (u) =>
        schemas.value[idx].applyUsers.pushSavedUsers(parseInt(u)),
      );
    });
  }

  // watchEffect(async () => {
  //   try {
  //     const res = await getRouteApplyListByZone(zoneStore.currentId);
  //     if (res && res.code === 200) {
  //       schemas.value = res.data.list;
  //       pagination.total = res.data.total;
  //
  //       // reset page to first
  //       pagination.pageNum = 1;
  //
  //       if (res.data.list.length > 0) {
  //         schema.value = res.data.list[0].id;
  //       }
  //     }
  //   } catch (e) {
  //     console.error(e);
  //   }
  // });

  onMounted(() => {
    schemas.value = convertExam2Schemas(mapperStore.lineInEdit);
    if (schemas.value.length > 0) {
      schema.value = 0;
    }
  });

  return {
    schema,
    schemas,
    hasSchema,
    pagination,
    isDirtySchema,
    isGeneratingSchema,
    generateRouteSchemas,
    updateRoutePlanSchemas,
    flushApplyUsers,
    fulfillSchemasWithApplyUsers,
  };
};

export { useRouteApply };
