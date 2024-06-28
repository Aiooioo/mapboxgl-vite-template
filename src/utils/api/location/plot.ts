import { request } from "../request";

export async function $listByCode(data: any) {
  const response = await request<any>({
    url: "/ums/dict/listByCode",
    method: "get",
    params: data,
  });

  return response;
}

export async function $createPlot(data: any) {
  const response = await request<any>({
    url: "/map/plot/category/create",
    method: "post",
    data,
  });

  return response;
}

export async function $updatePlot(data: any) {
  const response = await request<any>({
    url: "/map/plot/category/update",
    method: "post",
    data,
  });

  return response;
}

export async function $deletePlot(data: any) {
  const response = await request<any>({
    url: "/map/plot/category/delete",
    method: "post",
    data,
  });

  return response;
}
