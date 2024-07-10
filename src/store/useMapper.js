import { defineStore } from "pinia";
import { $siteList } from "@/utils/api/map/map-site.tsx";

const useMapper = defineStore("mapper", {
  state: () => {
    return {
      siteId: "",
      siteList: [],
    };
  },
  getters: {},
  actions: {
    getSiteList(data) {
      const params = {
        pageSize: 9999,
        pageNum: 0,
        ...data,
      };
      return $siteList(params).then((res) => {
        this.siteList = res.data.records;
        // this.siteId = res.data.records[0]?.id || null;
      });
    },
    setSiteId(id) {
      this.siteId = id;
    },
  },
});
export { useMapper };
