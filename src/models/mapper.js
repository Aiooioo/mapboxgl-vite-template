import { defineStore } from "pinia";

const useMapper = defineStore("mapper", {
  state: () => {
    return {
      loadingLines: false,

      currentView: "list",

      selectedLine: "1",

      checkPoints: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],

      lines: ["1", "2", "3"],

      lineInEdit: null,
    };
  },

  actions: {
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
