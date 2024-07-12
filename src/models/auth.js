import { defineStore } from "pinia";
import { systemConst } from "@/common/system-const.js";
import { hoursToMs } from "@/utils/time-utils.js";

let lastAuthConfirmTime;

const useAuth = defineStore("auth", {
  state() {
    return {};
  },

  actions: {
    authConfirm(waitForConnection = false) {
      return new Promise((res, rej) => {
        if (
          !lastAuthConfirmTime ||
          Date.now() >
            lastAuthConfirmTime + hoursToMs(systemConst.sessionTimeoutHours - 1)
        ) {
          // TODO: validate session token from backend
          res(true);
        } else {
          res(true);
        }
      });
    },
  },
});

export { useAuth };
