import {
  IBaseResponse,
  ILoadingOptions,
  IPaginationBaseResponse,
  request,
} from "@/utils/api/request";

export interface ILogin {
  /** 密码 */
  password: string;
  /** 用户名 */
  username: string;
}
export interface ILoginResponse extends IBaseResponse {
  data: {
    /** 有效时间（秒） */
    expiresIn: number;
    /** 刷令牌 */
    refreshToken: string;
    /** 访问令牌 */
    token: string;
    /** 访问令牌头前缀 */
    tokenHead: string;
  };
}
export function $login(
  data: ILogin,
  options: ILoadingOptions = { content: "登录中..." },
) {
  return request<ILoginResponse>(
    {
      url: "/auth/login",
      method: "post",
      data,
    },
    options,
  );
}

export interface IInfoResponse extends IBaseResponse {
  data: {
    /** 所属部门名称 */
    deptNames: string[];
    /** 所属部门ids */
    depts: number[];
    /** 用户头像 */
    icon: string;
    /** 权限菜单ids */
    menus: number[];
    /** 所属角色ids */
    roles: number[];
    /** 用户id */
    userId: number;
    /** 用户名称 */
    username: string;
  };
}
export function $info(options: ILoadingOptions = { content: "登录中..." }) {
  return request<IInfoResponse>(
    {
      url: "/auth/info",
      method: "get",
    },
    options,
  );
}

export function $logout(options: ILoadingOptions = { content: "正在注销..." }) {
  return request<IInfoResponse>(
    {
      url: "/survey-admin/admin/logout",
      method: "post",
    },
    options,
  );
}

export function $updatePassword(data) {
  return request({
    url: "/survey-admin/admin/updateMyPassword",
    method: "post",
    data,
  });
}

export function $adminList(data) {
  return request({
    url: "/ums/admin/list",
    method: "get",
    params: data,
  });
}

export function $register(data) {
  return request({
    url: "/ums/admin/register",
    method: "post",
    data,
  });
}

export function $updateUser(data, id) {
  return request({
    url: `/ums/admin/update/${id}`,
    method: "POST",
    data,
  });
}

export function $setUserMem(data) {
  return request({
    url: "/survey-admin/admin/setUserMem",
    method: "post",
    params: data,
  });
}

export function $deleteUserInfo(id) {
  return request({
    url: `/ums/admin/delete/${id}`,
    method: "POST",
  });
}

export function $addDeptToUser(data) {
  return request({
    url: `/survey-admin/admin/dept/update`,
    method: "POST",
    params: data,
  });
}

export type IListResponse = IPaginationBaseResponse<IInfo>;

/** 条件获取用户列表 */
export function $list(
  data: IList,
  options: ILoadingOptions = { content: "正在获取用户列表..." },
) {
  return request<IListResponse>(
    {
      url: "/survey-admin/admin/list",
      method: "get",
      params: data,
    },
    options,
  );
}

/** 获取全部内存 */
export function $totalMem(options: ILoadingOptions = {}) {
  return request(
    {
      url: `/survey-store/store/capacity/totalMem`,
      method: "get",
    },
    options,
  );
}

/** 获取已使用内存 */
export function $usedMem(options: ILoadingOptions = {}) {
  return request(
    {
      url: `/survey-store/store/capacity/usedMem`,
      method: "get",
    },
    options,
  );
}
