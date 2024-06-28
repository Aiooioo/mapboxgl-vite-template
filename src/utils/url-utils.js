import { config } from "./api/initConfig.ts";

export function toAbsoluteUrl(relativePath) {
  return (
    window.location.protocol +
    "//" +
    window.location.host +
    config.baseUrl +
    relativePath.substring(1)
  );
}
