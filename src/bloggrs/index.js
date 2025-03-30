/**
 * Bloggrs Plugin System with Vue SFC support
 */
const fs = require('fs');
const path = require('path');
const { compileVueFile } = require('../utils/vue-compiler');

// Store active plugins
const activePlugins = new Map();
// Cache for compiled Vue components
const componentCache = new Map();

// Load a plugin configuration
function loadPluginConfig(pluginDir) {
  try {
    const configPath = path.join(__dirname, pluginDir, 'plugin.json');
    if (fs.existsSync(configPath)) {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
      return {
        ...config,
        dir: pluginDir,
        path: path.join(__dirname, pluginDir)
      };
    }
  } catch (err) {
    console.error(`Error loading plugin config for ${pluginDir}:`, err);
  }
  return null;
}

// Load all available plugins
function discoverPlugins() {
  const plugins = [];
  try {
    // Read the bloggrs directory
    const dirs = fs.readdirSync(__dirname);
    
    // Look for plugin directories (containing plugin.json)
    for (const dir of dirs) {
      if (dir === 'index.js') continue;
      
      const fullPath = path.join(__dirname, dir);
      const stats = fs.statSync(fullPath);
      
      if (stats.isDirectory()) {
        const config = loadPluginConfig(dir);
        if (config) {
          plugins.push(config);
        }
      }
    }
  } catch (err) {
    console.error('Error discovering plugins:', err);
  }
  
  return plugins;
}

// Initialize all active plugins
function initPlugins() {
  const availablePlugins = discoverPlugins();
  
  for (const plugin of availablePlugins) {
    if (plugin.enabled) {
      try {
        // Try to load the plugin's server module if it exists
        const serverModulePath = path.join(__dirname, plugin.dir, 'server.js');
        if (fs.existsSync(serverModulePath)) {
          const serverModule = require(serverModulePath);
          if (typeof serverModule.init === 'function') {
            serverModule.init();
          }
        }
        
        activePlugins.set(plugin.id, plugin);
        console.log(`Loaded plugin: ${plugin.name} (${plugin.id})`);
      } catch (err) {
        console.error(`Error initializing plugin ${plugin.name}:`, err);
      }
    } else {
      console.log(`Plugin disabled: ${plugin.name} (${plugin.id})`);
    }
  }
  
  return activePlugins;
}

// Get a plugin by ID
function getPlugin(id) {
  return activePlugins.get(id);
}

// Get all active plugins
function getActivePlugins() {
  return Array.from(activePlugins.values());
}

// Load a Vue component from a plugin
function loadPluginComponent(plugin, componentPath) {
  // Check if it's a .vue file
  if (componentPath.endsWith('.vue')) {
    const fullPath = path.join(plugin.path, componentPath);
    
    // Check if we've already compiled this component
    if (componentCache.has(fullPath)) {
      return componentCache.get(fullPath);
    }
    
    // Compile the Vue file
    const { component, styles } = compileVueFile(fullPath);
    
    // Cache the result
    componentCache.set(fullPath, { component, styles });
    return { component, styles };
  }
  
  // If it's a regular JS file, require it
  const fullPath = path.join(plugin.path, componentPath);
  try {
    const module = require(fullPath);
    return {
      component: module.default || module,
      styles: ''
    };
  } catch (error) {
    console.error(`Error loading plugin component ${componentPath}:`, error);
    return {
      component: { template: `<div>Error loading component: ${error.message}</div>` },
      styles: ''
    };
  }
}

// Get plugin component for a specific route
function getPluginForRoute(route) {
  for (const plugin of activePlugins.values()) {
    if (plugin.routes && plugin.routes[route]) {
      try {
        const componentPath = plugin.routes[route];
        const fullPath = path.join(plugin.path, componentPath);
        
        // For .vue files, use the compiler
        if (componentPath.endsWith('.vue')) {
          console.log(`Loading Vue component from ${fullPath}`);
          const { component, styles } = compileVueFile(fullPath);
          
          // Safeguard against undefined components
          if (!component) {
            console.error(`Component from ${fullPath} is undefined`);
            return null;
          }
          
          return {
            plugin,
            component,
            styles
          };
        }
        
        // For JS files, just require them
        const component = require(fullPath);
        return {
          plugin,
          component: component.default || component,
          styles: ''
        };
      } catch (error) {
        console.error(`Error loading component for route ${route}:`, error);
      }
    }
  }
  return null;
}

// Register the influencer platform plugin

module.exports = {
  initPlugins,
  getPlugin,
  getActivePlugins,
  getPluginForRoute
}; 