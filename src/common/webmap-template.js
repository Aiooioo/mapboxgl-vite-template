export const DefaultWebmapTemplate = {
  id: "0123456789ABCDEF",
  name: "新的工程",
  layers: [],
};

export const DefaultWebmapLayerTemplates = {};

export const getLayerTemplate = (templateStr) => {
  return DefaultWebmapLayerTemplates[templateStr];
};
