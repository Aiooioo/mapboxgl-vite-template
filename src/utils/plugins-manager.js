import _ from "lodash";
import DrawRectanglePlugin from "@/utils/plugins/mapbox/DrawRectanglePlugin.js";

const PluginsList = [DrawRectanglePlugin];

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
