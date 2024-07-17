import { request } from "../request";

export async function $getProjectList(data: any) {
  const response = await request<any>({
    url: "/map/project/searchList",
    method: "post",
    data,
  });

  return response;
}
