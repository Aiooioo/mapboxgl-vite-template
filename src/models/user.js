import { defineStore } from "pinia";

const useUser = defineStore("user", {
  state() {
    return {
      accounts: null,

      user: null,
    };
  },

  actions: {
    userContextInit() {
      return new Promise((resolve, reject) => {
        resolve();
      });
    },

    sessionClear() {
      this.accounts = undefined;
      this.user = undefined;

      return Promise.resolve();
    },
  },
});

export { useUser };
