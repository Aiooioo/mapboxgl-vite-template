import { ref, reactive, watchEffect } from "vue";
import { useZone } from "@/models/zone.js";
import { request } from "@/utils/api/request.ts";

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

const useRouteApply = () => {
  const schema = ref(null);
  const schemas = ref([]);
  const pagination = reactive({
    total: 0,
    pageSize: 10,
    pageNum: 1,
  });
  const zoneStore = useZone();

  watchEffect(async () => {
    try {
      const res = await getRouteApplyListByZone(zoneStore.currentId);
      if (res && res.code === 200) {
        res.data.list = [
          {
            createBy: 0,
            createTime: "",
            updateBy: 0,
            updateTime: "",
            createUser: "",
            updateUser: "",
            id: 0,
            name: "",
            siteId: 0,
            difficulty: 0,
            routeIds: [],
            applyStudent: 0,
          },
        ];

        schemas.value = res.data.list;
        pagination.total = res.data.total;

        // reset page to first
        pagination.pageNum = 1;

        if (res.data.list.length > 0) {
          schema.value = res.data.list[0].id;
        }
      }
    } catch (e) {
      console.error(e);
    }
  });

  return {
    schema,
    schemas,
    pagination,
  };
};

export { useRouteApply };
