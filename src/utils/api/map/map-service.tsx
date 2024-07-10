import { request } from "@/utils/api/request";

//地图服务列表
export function $serviceList(data) {
  return request({
    url: "/map/service/searchList",
    method: "post",
    data,
  });
}

export function $createSite(data) {
  return request({
    url: "/map/site/create",
    method: "post",
    data,
  });
}
export function $updateSite(data) {
  return request({
    url: "/map/site/update",
    method: "post",
    data,
  });
}
export function $deleteItem(data) {
  return request({
    url: `/map/service/delete/${data.id}`,
    method: "post",
  });
}
