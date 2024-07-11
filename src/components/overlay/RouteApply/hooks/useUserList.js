import { ref, watchEffect, onMounted } from "vue";
import _ from "lodash";
import { request } from "@/utils/api/request.ts";

function loadUserListByGrade(grade, keywords) {
  const params = {};
  if (keywords) {
    params.keyword = keywords;
  }

  return request({
    url: "/ums/admin/list",
    method: "GET",
    params,
  });
}

function getAllRouteApplyListByExam(zoneId, examId) {
  return request({
    url: "/map/routeApply/listAll",
    method: "GET",
    params: {
      siteId: zoneId,
      examId,
    },
  });
}

const useUserList = (gradeRef, searchKeywords) => {
  const users = ref([]);
  const appliedUsers = ref(null);
  const savedApplyData = ref(null);

  watchEffect(async () => {
    try {
      const res = await loadUserListByGrade(
        gradeRef.value,
        searchKeywords.value,
      );
      if (res && res.code === 200) {
        users.value = res.data.list;
      }
    } catch (e) {
      console.log(e);
    }
  });

  onMounted(() => {
    getAllRouteApplyListByExam().then((res) => {
      if (res && res.code === 200) {
        const allData = res.data;

        savedApplyData.value = allData;
        appliedUsers.value = _.keys(_.groupBy(allData, (d) => d.applyStudent));
      }
    });
  });

  return {
    users,
    appliedUsers,
    savedApplyData,
  };
};

export { useUserList };
