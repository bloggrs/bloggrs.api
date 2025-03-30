const plugins = [];

/**
 * Register a plugin in the system
 * @param {Object} plugin - Plugin configuration object
 * @param {string} plugin.name - Unique plugin name
 * @param {Object} plugin.component - Vue component to render 
 * @param {boolean} [plugin.enabled=true] - Whether the plugin is enabled
 * @param {Array<string>} [plugin.headTags=[]] - HTML tags to insert in the document head
 */
exports.registerPlugin = function(plugin) {
  // Ensure the plugin has all required properties
  if (!plugin.name || !plugin.component) {
    console.error('Plugin must have a name and component');
    return;
  }
  
  // Set enabled to true by default if not specified
  if (plugin.enabled === undefined) {
    plugin.enabled = true;
  }
  
  // Ensure headTags is an array if provided
  if (plugin.headTags && !Array.isArray(plugin.headTags)) {
    plugin.headTags = [plugin.headTags];
  } else if (!plugin.headTags) {
    plugin.headTags = [];
  }
  
  // Add the plugin to the registry
  plugins.push(plugin);
  console.log(`Plugin "${plugin.name}" registered successfully`);
};

/**
 * Get a plugin by name
 * @param {string} name - The name of the plugin to retrieve
 * @returns {Object|null} The plugin if found, null otherwise
 */
exports.getPlugin = async function(name) {
  const plugin = plugins.find(p => p.name === name && p.enabled !== false);
  if (!plugin) return null;
  return plugin;
};

/**
 * Get all registered plugins
 * @param {boolean} [enabledOnly=true] - Whether to return only enabled plugins
 * @returns {Array<Object>} Array of plugin objects
 */
exports.getAllPlugins = function(enabledOnly = true) {
  if (enabledOnly) {
    return plugins.filter(p => p.enabled !== false);
  }
  return [...plugins];
}; 