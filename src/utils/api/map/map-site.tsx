import { request } from "@/utils/api/request";

//场地列表
export function $siteList(data) {
  return request({
    url: "/map/site/searchList",
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
export function $deleteSite(data) {
  return request({
    url: "/map/site/delete",
    method: "post",
    params: data,
  });
}
