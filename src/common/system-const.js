import { minToMs, secToMs } from "@/utils/time-utils.js";

export const systemConst = {
  sessionTimeoutHours: 48,
};

export const appTimingConst = {
  sessionAuthPollMs: minToMs(30),
  sessionRestorePollMs: secToMs(5),
};
