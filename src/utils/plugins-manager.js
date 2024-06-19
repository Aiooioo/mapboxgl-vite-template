import _ from "lodash";
import DrawRectanglePlugin from "@/utils/plugins/mapbox/DrawRectanglePlugin.js";
import DrawTextPlugin from "@/utils/plugins/mapbox/DrawTextPlugin.js";
import DrawCirclePlugin from "@/utils/plugins/mapbox/DrawCirclePlugin.js";
import DrawEllipsePlugin from "@/utils/plugins/mapbox/DrawEllipsePlugin.js";

const PluginsList = [
  DrawRectanglePlugin,
  DrawTextPlugin,
  DrawCirclePlugin,
  DrawEllipsePlugin,
];

class PluginManager {
  constructor() {
    this.plugins = [];
  }

  addPlugin(plugin) {
    this.plugins.push(plugin);
  }

  registerAll() {
    _.each(this.plugins, (plugin) => {
      plugin.attach();
    });
  }
}

const manager = new PluginManager();

_.each(PluginsList, (Plugin) => {
  manager.addPlugin(new Plugin());
});

export default manager;
