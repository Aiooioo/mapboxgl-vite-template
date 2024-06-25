import {
  LoadingBarProviderProps,
  MessageProviderProps,
  MessageReactive,
} from "naive-ui";
import axios, { AxiosRequestConfig } from "axios";
import jsCookie from "js-cookie";
import { VNodeChild } from "vue";
import { config } from "./initConfig";
import { useSpinBar, useMessage } from "./DiscreteApi";

interface SpinBarInst {
  start(t?: string): void;
  finish(t?: string): void;
  error(t?: string): void;
}
export interface ILoadingOptions {
  spinBar?: LoadingBarProviderProps;
  message?: MessageProviderProps;
  content?: string | (() => VNodeChild);
  finishContent?: string | (() => VNodeChild);
  errorContent?: string | (() => VNodeChild);
  level?: Array<"error" | "spin" | "success">;
  use?: Array<"spinBar" | "message">;
}

function showStatus({
  spinBar,
  message,
  use = ["spinBar", "message"],
  content,
  finishContent,
  errorContent,
  level = config.message.level,
}: ILoadingOptions = {}) {
  const status: SpinBarInst[] = [];
  if (use?.includes("spinBar")) {
    status.push(useSpinBar(spinBar));
  }
  if (use?.includes("message")) {
    const msg = useMessage(message);
    let msgInstance: MessageReactive | undefined;
    status.push({
      start: () => {
        if (level.includes("spin")) {
          msgInstance = msg.loading(content ?? "加载中...", {
            duration: 0,
          });
        }
      },
      finish: (t) => {
        if (level.includes("success")) {
          if (msgInstance) {
            msgInstance.content = finishContent ?? t ?? "成功";
            msgInstance.type = "success";
            setTimeout(() => {
              msgInstance?.destroy();
            }, 3000);
          } else {
            msg.success(finishContent ?? t ?? "成功", {
              duration: 3000,
            });
          }
        } else {
          msgInstance?.destroy();
        }
      },
      error: (t) => {
        if (level.includes("error")) {
          if (msgInstance) {
            msgInstance.content = errorContent ?? t ?? "失败";
            msgInstance.type = "error";
            setTimeout(() => {
              msgInstance?.destroy();
            }, 3000);
          } else {
            msg.error(errorContent ?? t ?? "失败", {
              duration: 3000,
            });
          }
        } else {
          msgInstance?.destroy();
        }
      },
    });
  }
  return status;
}

export interface IBaseResponse {
  code: number;
  data: object;
  message: string;
}

/**
 * 可视化 `Promise` 状态
 * @param promise 待可视化的 promise
 * @param options 默认值`{ use: ['spinBar', 'message' }`
 * @returns Promise
 */
export function loading<T extends IBaseResponse>(
  promise: Promise<T>,
  options?: ILoadingOptions,
) {
  const status = showStatus(options);
  status.forEach((s) => s.start());
  return new Promise<T>((res, rej) => {
    promise
      .then((t) => {
        if (t.code !== 200) {
          throw t;
        } else {
          status.forEach((s) => s.finish(t?.message));
          res(t);
        }
      })
      .catch((e) => {
        status.forEach((s) => s.error(e.message));
        rej(e);
      });
  });
}
// 为了使用方便自定义了一个request请求方法

const instance = axios.create({
  baseURL: `${config.apiUrl}`,
  timeout: 60000,
});
// 2.1.请求拦截的作用
instance.interceptors.request.use(
  (configData) => {
    const token = jsCookie.get("tk");
    // console.log(token)
    // const token = JSON.parse(jsCookie.get('geoh-auth'))
    if (token) {
      // console.log(tokenJson)
      configData.headers = {
        Authorization: `Bearer ${token}`,
        ...configData.headers,
      };
    }
    return configData;
  },
  (err) => {
    console.error(err);
  },
);
// 2.2.响应拦截
instance.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (err) => {
    throw err;
  },
);
export { instance };
/**
 * 可视化网络请求
 * @param conf
 * @param options
 */
export function request<T extends IBaseResponse>(
  conf: AxiosRequestConfig,
  options?: ILoadingOptions,
) {
  // 1.创建axios的实例

  return loading<T>(instance(conf), options);
}

export type ICode = 200 | 201 | 401 | 403 | 404;

export interface IPaginationBase {
  /** pageNum */
  pageNum?: number;
  /** pageSize,示例值(5) */
  pageSize?: number;
}

type IDefaultParam<T extends IPaginationBase> = T;
interface IQuery<P extends IPaginationBase, R extends IBaseResponse> {
  (data: IDefaultParam<P>, options?: ILoadingOptions): Promise<R>;
}
