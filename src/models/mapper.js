import { defineStore } from "pinia";
import { request } from "@/utils/api/request.ts";

const useMapper = defineStore("mapper", {
  state: () => {
    return {
      loadingLines: false,

      currentView: "list",

      selectedLine: "1",

      lines: [],
      lineListPage: 1,
      lineListTotal: 0,

      lineInEdit: null,
    };
  },

  actions: {
    async loadPagedLineList(pageNum, pageSize = 10) {
      try {
        const res = await request({
          method: "POST",
          url: "/map/route/list",
          params: {
            pageSize,
            pageNum,
          },
        });

        if (res.code === 200) {
          this.lines = res.data.list;

          this.lineListTotal = res.data.total;
          this.lineListPage = res.data.pageNum;
        }
      } catch (e) {
        console.log(e);
      }
    },
    goToAddNewLine() {
      this.lineInEdit = null;
      this.currentView = "editor";
    },
    cancelEditLine() {
      this.lineInEdit = null;

      this.currentView = "list";
    },
    saveCurrentLine() {
      this.lineInEdit = null;

      this.currentView = "list";
    },
  },
});

export { useMapper };
