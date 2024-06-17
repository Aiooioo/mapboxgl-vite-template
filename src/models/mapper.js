import { defineStore } from "pinia";

const useMapper = defineStore("mapper", {
  state: () => {
    return {
      currentView: "list",

      selectedLine: "1",

      lines: ["1", "2", "3"],

      lineInEdit: null,
    };
  },

  actions: {
    goToAddNewLine() {
      this.lineInEdit = null;
      this.currentView = "editor";
    },
  },
});

export { useMapper };
