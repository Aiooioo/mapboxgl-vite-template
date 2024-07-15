import jsCookie from "js-cookie";
import { config } from "./initConfig";
import { $login, $info } from "./survey-admin/admin.ts";

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
  return $login(
    {
      username,
      password,
    },
    {
      content: "获取开发模式token",
    },
  ).then(({ data }) => {
    jsCookie.set("tk", data.token);
    return getToken();
  });

  return Promise.resolve();
}
// export const { token, user } = await getToken();
