import { request } from "../request";

export async function $comparePlot(data: any) {
  const response = await request<any>({
    url: "/map/identify/compare",
    method: "post",
    data,
  });

  return response;
}

export async function $plotList(data: any) {
  const response = await request<any>({
    url: "/map/identify/searchList",
    method: "post",
    data,
  });

  return response;
}
