import { defineStore } from "pinia";
import { request } from "@/utils/api/request.ts";

function getZoneByPage(pageNo, pageSize) {
  return request({
    url: "/map/site/searchList",
    method: "POST",
    data: {
      pageNum: pageNo,
      pageSize: pageSize,
    },
    headers: {
      "Content-Type": "application/json",
    },
  });
}

const useZone = defineStore("zone", {
  state() {
    return {
      currentId: null,

      list: [],

      total: 0,
      pageNo: 1,
      pageSize: 6,
    };
  },

  actions: {
    async loadZoneList() {
      try {
        const res = await getZoneByPage(this.pageNo - 1, this.pageSize);

        if (res && res.code === 200) {
          this.list = res.data.records;
          this.total = res.data.total;

          if (!this.currentId) {
            this.currentId = res.data.records[0].id;
          }
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
});

export { useZone };
