// Main entry point for the influencer platform plugin
const pluginConfig = require('./plugin.json');

// Export the plugin configuration
module.exports = {
  id: pluginConfig.id,
  name: pluginConfig.name,
  displayName: pluginConfig.displayName,
  version: pluginConfig.version,
  description: pluginConfig.description,
  enabled: pluginConfig.enabled,
  priority: pluginConfig.priority,
  routes: pluginConfig.routes,
  override: pluginConfig.override,
  component: require('./App.vue'),
  // Pass along the resources configuration
  resources: pluginConfig.resources
}; 