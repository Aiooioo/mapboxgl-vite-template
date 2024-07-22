import { request } from '@/utils/api/request.ts'

class Layer {
  #data;
  #state;

  loaded = false;

  #loadingPromise;

  constructor(props) {
    const { id, webmapId, type, properties, data } = props;
    if (id == null) {
      throw new Error("必须为每个图层Layer指定一个唯一ID");
    }

    this.#data = {
      id,
      webmapId,
      type,
      properties: properties || {},
      data: data || {},
    };

    this.#state = {};
  }

  async #loadInternal() {
    try {
      const res = await request({
        url: '/map/project/layer/searchList',
        method: 'POST',
        params: {
          projectId: this.webmapId,
        }
      });
      if (res && res.code === 200) {
        const { data } = res;

        this.loaded = true;

        this.data = data;

        this.#loadingPromise = null;
      }
    }catch(e) {
      throw new Error(`图层 ${this.id} 的数据加载出现错误`);
    }
  }

  async loadData() {
    if (!this.#loadingPromise) {
      this.#loadingPromise = this.#loadInternal();
    }

    return this.#loadingPromise;
  }

  get id() {
    return this.#data.id;
  }

  get webmapId() {
    return this.#data.webmapId;
  }

  get type() {
    return this.#data.type;
  }

  get properties() {
    return this.#data.properties;
  }

  set properties(props) {
    this.#data.properties = props;
  }

  get data() {
    return this.#data.data;
  }

  set data(data) {
    this.#data.data = data;
  }

  save = async () => {

  }

  export() {

  }
}

export { Layer };
