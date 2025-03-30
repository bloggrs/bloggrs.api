/**
 * Plugin System Manager
 */
const fs = require('fs');
const path = require('path');
const { validatePluginComponents } = require('../utils/plugin-validator');
const dotenv = require('dotenv');
const pluginDbManager = require('../utils/plugin-db-manager');

// Store registered plugins
const plugins = {};
let expressApp = null;

/**
 * Initialize all plugins
 * @param {Object} app - Express app instance
 * @returns {Array} Array of initialized plugins
 */
async function initPlugins(app) {
  console.log('Initializing plugins...');
  
  // Get all directories in the plugins directory
  const pluginsDir = __dirname;
  const possiblePlugins = fs.readdirSync(pluginsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
    
  console.log(`Found ${possiblePlugins.length} potential plugins: ${possiblePlugins.join(', ')}`);
  
  const initializedPlugins = [];
  
  // Try to initialize each plugin
  for (const pluginId of possiblePlugins) {
    try {
      // Check if plugin has an index.js file
      const pluginPath = path.join(pluginsDir, pluginId);
      const indexPath = path.join(pluginPath, 'index.js');
      
      if (!fs.existsSync(indexPath)) {
        console.log(`${pluginId} is not a valid plugin, skipping`);
        continue;
      }
      
      // Load plugin's .env file if it exists
      const envPath = path.join(pluginPath, '.env');
      if (fs.existsSync(envPath)) {
        console.log(`Loading environment from ${pluginId}/.env`);
        dotenv.config({ path: envPath });
      }
      
      // Check plugin config
      const configPath = path.join(pluginPath, 'plugin.json');
      let pluginConfig = {};
      
      if (fs.existsSync(configPath)) {
        pluginConfig = require(configPath);
        
        // Skip disabled plugins
        if (pluginConfig.disabled) {
          console.log(`Plugin ${pluginConfig.name || pluginId} is disabled, skipping`);
          continue;
        }
      }
      
      // Initialize plugin database
      console.log(`Initializing database for plugin ${pluginId}...`);
      await pluginDbManager.initPluginDatabase(pluginId);
      
      // Load plugin module
      // Clear require cache first to ensure fresh code
      delete require.cache[require.resolve(indexPath)];
      const plugin = require(indexPath);
      
      // Check if plugin has initialize method
      if (typeof plugin.initialize !== 'function') {
        console.log(`Plugin ${pluginId} missing initialize method, skipping`);
        continue;
      }
      
      // Initialize plugin
      const result = await plugin.initialize(app, pluginConfig);
      
      if (result) {
        console.log(`Plugin ${plugin.name || pluginId} initialized successfully`);
        initializedPlugins.push(plugin);
      } else {
        console.error(`Failed to initialize plugin ${pluginId}`);
      }
    } catch (error) {
      console.error(`Error initializing plugin ${pluginId}:`, error);
    }
  }
  
  console.log(`Loaded ${initializedPlugins.length} active plugins`);
  return initializedPlugins;
}

/**
 * Set the Express app to use for registering routes
 * @param {Object} app - The Express app
 */
function setExpressApp(app) {
  expressApp = app;
  
  // If plugins are already loaded, register their routes
  if (Object.keys(plugins).length > 0) {
    registerAllPluginRoutes(app);
  }
}

/**
 * Register routes for all loaded plugins
 * @param {Object} app - The Express app
 */
function registerAllPluginRoutes(app) {
  if (!app || typeof app.use !== 'function') {
    console.error('Invalid Express app provided to registerAllPluginRoutes');
    return;
  }
  
  for (const [pluginId, plugin] of Object.entries(plugins)) {
    if (plugin.enabled !== false && typeof plugin.registerRoutes === 'function') {
      try {
        plugin.registerRoutes(app);
        console.log(`Registered API routes for plugin: ${pluginId}`);
      } catch (error) {
        console.error(`Error registering routes for plugin ${pluginId}:`, error);
      }
    } else if (plugin.enabled !== false && plugin.api) {
      // Support for the existing API handler pattern
      try {
        const basePath = `/api/plugins/${pluginId}`;
        app.use(basePath, plugin.api);
        console.log(`Registered API at ${basePath} for plugin: ${pluginId}`);
        
        // Log all registered routes for debugging
        if (plugin.api.stack) {
          plugin.api.stack.forEach(route => {
            if (route.route) {
              const methods = Object.keys(route.route.methods).join(', ').toUpperCase();
              console.log(`- ${methods}: ${basePath}${route.route.path}`);
            }
          });
        }
      } catch (error) {
        console.error(`Error registering API for plugin ${pluginId}:`, error);
      }
    }
  }
}

/**
 * Get a plugin by ID
 * @param {string} id - Plugin ID
 * @returns {Object|null} The plugin or null if not found
 */
function getPlugin(id) {
  return plugins[id] || null;
}

/**
 * Get all active plugins
 * @returns {Array} Array of active plugins
 */
function getActivePlugins() {
  return Object.values(plugins).filter(plugin => plugin.enabled !== false);
}

/**
 * Find the appropriate plugin for a given route
 * @param {string} route - The route path
 * @returns {Object|null} The matching plugin or null if none matches
 */
function getPluginForRoute(route) {
  if (!route) return null;
  
  // Normalize the route
  const normalizedRoute = route.startsWith('/') ? route : `/${route}`;
  
  console.log(`Finding plugin for route: ${normalizedRoute}`);
  
  // Find a plugin with a matching route
  for (const [pluginId, plugin] of Object.entries(plugins)) {
    if (!plugin.routes) {
      continue;
    }
    
    // Direct exact match check
    if (plugin.routes[normalizedRoute]) {
      console.log(`Found exact route match in plugin: ${pluginId}`);
      return plugin;
    }
    
    // For dynamic routes with parameters (e.g., /influencers/:id)
    for (const pluginRoute of Object.keys(plugin.routes)) {
      if (pluginRoute.includes(':')) {
        const pattern = pluginRoute.replace(/:[^\/]+/g, '([^\/]+)');
        const regex = new RegExp(`^${pattern}$`);
        
        if (regex.test(normalizedRoute)) {
          console.log(`Found dynamic route match in plugin ${pluginId}: ${pluginRoute} matches ${normalizedRoute}`);
          return plugin;
        }
      }
    }
  }
  
  console.log(`No plugin found for route: ${normalizedRoute}`);
  return null;
}

module.exports = {
  initPlugins,
  getPlugin,
  getActivePlugins,
  getPluginForRoute,
  setExpressApp,  // Export the new method
  plugins // Export the plugins object for testing/debugging
};