export const hoursToMs = (h) => minToMs(60 * h);
export const minToMs = (m) => secToMs(60 * m);
export const msToSec = (s) => s / 1000;
export const secToMs = (s) => s * 1000;
