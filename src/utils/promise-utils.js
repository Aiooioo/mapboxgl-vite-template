export const timeout = (time) =>
  new Promise((res) => {
    setTimeout(res, time);
  });
