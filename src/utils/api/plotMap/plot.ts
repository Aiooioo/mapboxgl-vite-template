import { request } from "../request";

export async function $addProjectPlot(data: any) {
  const response = await request<any>({
    url: "/map/project/plot/add",
    method: "post",
    data,
  });

  return response;
}
