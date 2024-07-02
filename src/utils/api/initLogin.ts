import jsCookie from "js-cookie";
import { config } from "./initConfig";
import { $login, $info } from "@/utils/api/survey-admin/admin";

/**
 * 验证token是否有效
 */
export async function verifyToken() {
  // 应改走后端接口
  return $info()
    .then(({ code, data }) => (code === 200 ? data : false))
    .catch(() => false);
}

export async function getToken(): Promise<{
  token: string;
  user: Awaited<ReturnType<typeof $info>>["data"];
}> {
  const user = await verifyToken();
  const token = jsCookie.get("Authorization")!;
  if (typeof user === "object") {
    return { token, user };
  }

  const { username, password } = config.login;
  const { data } = await $login(
    {
      username,
      password,
    },
    {
      content: "获取开发模式token",
    },
  );
  jsCookie.set("tk", data.token);
  return getToken();
}
export const { token, user } = await getToken();
