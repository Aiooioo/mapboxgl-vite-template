import { request } from "@/utils/api/request.ts";

class WebmapInfo {
  static createFromRemote(data) {
    const inst = new WebmapInfo(data.id, data.name);

    inst.load();

    return inst;
  }

  constructor(id, name) {
    this.id = id;
    this.name = name;

    this.layers = [];

    this.loadingPromise = null;
    this.loaded = false;
  }

  load() {
    this.loadingPromise = new Promise(async (resolve, reject) => {
      try {
        const layersRes = await request({
          url: "/map/project/layer/searchList",
          method: "POST",
          params: {
            projectId: this.id,
          },
        });

        if (layersRes && layersRes.code === 200) {
          // TODO:
        }
      } catch (e) {
        console.log("");
      }
    });

    return this.loadingPromise;
  }
}

export default WebmapInfo;
