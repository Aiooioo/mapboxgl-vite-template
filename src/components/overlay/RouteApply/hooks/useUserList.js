import { ref, watchEffect } from "vue";
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

const useUserList = (gradeRef, searchKeywords) => {
  const users = ref([]);

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

  return {
    users,
  };
};

export { useUserList };
