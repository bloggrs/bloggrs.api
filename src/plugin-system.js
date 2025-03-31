/**
 * Plugin System for Express.js
 * Handles loading and running influencer-platform and other plugins
 */
const express = require('express');
const path = require('path');
const fs = require('fs');

// Store global functions and variables in a single object
const pluginSystem = {
  initialized: false,
  activePlugins: []
};

/**
 * Initialize the plugin system and load all plugins
 * @param {Object} app - Express app instance
 * @returns {Promise<Array>} Initialized plugins
 */
pluginSystem.initialize = async function(app) {
  if (this.initialized) {
    console.log('[Plugin System] Already initialized');
    return this.activePlugins;
  }
  
  console.log('[Plugin System] Initializing');
  
  // Initialize activePlugins array
  this.activePlugins = [];
  
  // Make it available globally for backward compatibility
  global.activePlugins = this.activePlugins;
  
  // Scan plugins directory
  const pluginsDir = path.join(__dirname, 'bloggrs');
  if (!fs.existsSync(pluginsDir)) {
    console.warn('[Plugin System] Plugins directory not found');
    return [];
  }
  
  const pluginDirs = fs.readdirSync(pluginsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  
  console.log(`[Plugin System] Found ${pluginDirs.length} potential plugins: ${pluginDirs.join(', ')}`);
  
  // Process each plugin directory
  for (const pluginId of pluginDirs) {
    await this.loadPlugin(app, pluginId);
  }
  
  console.log(`[Plugin System] Loaded ${this.activePlugins.length} plugins: ${this.activePlugins.map(p => p.id).join(', ')}`);
  
  this.initialized = true;
  return this.activePlugins;
};

/**
 * Load a single plugin
 * @param {Object} app - Express app instance
 * @param {string} pluginId - Plugin ID
 * @returns {Promise<boolean>} Success status
 */
pluginSystem.loadPlugin = async function(app, pluginId) {
  try {
    const pluginDir = path.join(__dirname, 'bloggrs', pluginId);
    const configPath = path.join(pluginDir, 'plugin.json');
    const indexPath = path.join(pluginDir, 'index.js');
    
    if (!fs.existsSync(configPath)) {
      console.log(`[Plugin System] No plugin.json found for ${pluginId}, skipping`);
      return false;
    }
    
    if (!fs.existsSync(indexPath)) {
      console.log(`[Plugin System] No index.js found for ${pluginId}, skipping`);
      return false;
    }
    
    // Load plugin config
    const config = require(configPath);
    
    // Skip if explicitly disabled
    if (config.enabled === false || config.disabled === true) {
      console.log(`[Plugin System] Plugin ${pluginId} is disabled in config, skipping`);
      return false;
    }
    
    // Load data providers if available
    let dataProviders = {};
    const dataProvidersPath = path.join(pluginDir, 'data-providers.js');
    if (fs.existsSync(dataProvidersPath)) {
      try {
        dataProviders = require(dataProvidersPath);
        console.log(`[Plugin System] Loaded data providers for ${pluginId}: ${Object.keys(dataProviders).join(', ')}`);
      } catch (error) {
        console.error(`[Plugin System] Error loading data providers for ${pluginId}:`, error);
      }
    }
    
    // Create plugin info object
    const pluginInfo = {
      id: pluginId,
      name: config.name || pluginId,
      displayName: config.displayName || config.name || pluginId,
      description: config.description || '',
      version: config.version || '1.0.0',
      routes: config.routes || [],
      dataProviders: dataProviders,
      headTags: config.headTags || [],
      resources: config.resources || {},
      config: config,
      directory: pluginDir,
      enabled: true
    };
    
    // Load plugin module
    const plugin = require(indexPath);
    
    // Store plugin instance
    if (typeof plugin === 'object') {
      pluginInfo.instance = plugin;
    }
    
    // Check if already registered
    const existingIndex = this.activePlugins.findIndex(p => p.id === pluginId);
    
    // Update or add to active plugins
    if (existingIndex >= 0) {
      this.activePlugins[existingIndex] = pluginInfo;
      console.log(`[Plugin System] Updated plugin ${pluginId}`);
    } else {
      this.activePlugins.push(pluginInfo);
      console.log(`[Plugin System] Added plugin ${pluginId}`);
    }
    
    // Register API routes if available
    await this.registerPluginApi(app, pluginId);
    
    console.log(`[Plugin System] Successfully loaded plugin ${pluginId}`);
    return true;
  } catch (error) {
    console.error(`[Plugin System] Error loading plugin ${pluginId}:`, error);
    return false;
  }
};

/**
 * Check if a plugin is enabled
 * @param {string} id - Plugin ID
 * @returns {boolean} Whether the plugin is enabled
 */
pluginSystem.isPluginEnabled = function(id) {
  if (!id) return false;
  
  try {
    // First check in activePlugins
    const plugin = this.activePlugins.find(p => p.id === id);
    if (plugin) {
      return plugin.enabled !== false;
    }
    
    // Then check the plugin.json
    const pluginDir = path.join(__dirname, 'bloggrs', id);
    const configPath = path.join(pluginDir, 'plugin.json');
    
    if (!fs.existsSync(configPath)) {
      console.log(`[Plugin System] No plugin.json found for ${id}, considering disabled`);
      return false;
    }
    
    const config = require(configPath);
    
    // Check if explicitly disabled
    if (config.enabled === false || config.disabled === true) {
      console.log(`[Plugin System] Plugin ${id} is explicitly disabled in plugin.json`);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error(`[Plugin System] Error checking if plugin ${id} is enabled:`, error);
    return false;
  }
};

/**
 * Register a plugin's API router
 * @param {Object} app - Express app instance
 * @param {string} pluginId - Plugin ID
 * @returns {Promise<boolean>} Success status
 */
pluginSystem.registerPluginApi = async function(app, pluginId) {
  try {
    const apiPath = path.join(__dirname, 'bloggrs', pluginId, 'api.js');
    
    if (!fs.existsSync(apiPath)) {
      console.log(`[Plugin System] No API file found for plugin ${pluginId}`);
      return false;
    }
    
    // Clear require cache to ensure we get fresh code
    delete require.cache[require.resolve(apiPath)];
    
    // Load the API module
    const api = require(apiPath);
    
    // If it exports a router directly
    if (typeof api === 'function' && api.name === 'router') {
      app.use(`/api/plugins/${pluginId}`, api);
      console.log(`[Plugin System] Registered API router for ${pluginId} at /api/plugins/${pluginId}`);
      return true;
    }
    
    // If it exports route handlers
    if (typeof api === 'object') {
      const router = express.Router();
      
      // Register each handler
      Object.entries(api).forEach(([key, handler]) => {
        // Skip non-function properties
        if (typeof handler !== 'function') return;
        
        // Try to parse route definition from key (e.g., "GET /users")
        const match = key.match(/^(GET|POST|PUT|DELETE|PATCH)\s+(.+)$/i);
        
        if (match) {
          const [_, method, route] = match;
          router[method.toLowerCase()](route, handler);
          console.log(`[Plugin System] Registered API route: ${method} /api/plugins/${pluginId}${route}`);
        } else if (key.startsWith('/')) {
          // Default to GET if only path is specified
          router.get(key, handler);
          console.log(`[Plugin System] Registered API route: GET /api/plugins/${pluginId}${key}`);
        }
      });
      
      app.use(`/api/plugins/${pluginId}`, router);
      return true;
    }
    
    console.log(`[Plugin System] Unable to register API for plugin ${pluginId}: Unexpected format`);
    return false;
  } catch (error) {
    console.error(`[Plugin System] Error registering API for plugin ${pluginId}:`, error);
    return false;
  }
};

/**
 * Check if a route matches a pattern
 * @param {string} pattern - Route pattern with parameters
 * @param {string} path - Actual path
 * @returns {boolean} Whether the path matches the pattern
 */
pluginSystem.routeMatches = function(pattern, path) {
  // Handle exact match
  if (pattern === path) return true;
  
  // If pattern has parameters
  if (pattern.includes(':')) {
    // Convert route pattern to regex
    const regexPattern = pattern
      .replace(/:[^/]+/g, '([^/]+)')
      .replace(/\//g, '\\/');
      
    const regex = new RegExp(`^${regexPattern}$`);
    return regex.test(path);
  }
  
  return false;
};

/**
 * Extract parameters from a path based on a pattern
 * @param {string} pattern - Route pattern with parameters
 * @param {string} path - Actual path
 * @returns {Object} Parameter key-value pairs
 */
pluginSystem.extractParams = function(pattern, path) {
  const params = {};
  
  if (!pattern.includes(':')) return params;
  
  const patternParts = pattern.split('/');
  const pathParts = path.split('/');
  
  patternParts.forEach((part, index) => {
    if (part.startsWith(':')) {
      const paramName = part.slice(1);
      params[paramName] = pathParts[index];
    }
  });
  
  return params;
};

/**
 * Serve Welcome page as a fallback
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 */
pluginSystem.serveWelcomePage = function(req, res) {
  const content = `
  <div style="max-width: 800px; margin: 0 auto; padding: 20px;">
    <h1 style="color: #333;">Welcome to Bloggrs Platform</h1>
    <p>The platform is running, but no plugin routes match your request.</p>
    
    <div style="margin-top: 30px;">
      <h2>Available Plugins</h2>
      <ul>
        ${this.activePlugins.length > 0 ? this.activePlugins.map(p => 
          `<li><strong>${p.displayName || p.name}</strong> (${p.id}) - ${p.description || ''}</li>`
        ).join('\n') : '<li>No active plugins found</li>'}
      </ul>
    </div>
    
    <div style="margin-top: 30px;">
      <h2>Requested Path</h2>
      <code>${req.path}</code>
    </div>
  </div>
  `;
  
  res.send(this.generateHtml('Welcome to Bloggrs Platform', content));
};

/**
 * Generate HTML with plugin head tags
 * @param {string} title - Page title
 * @param {string} content - Page content
 * @param {Array} headTags - Additional head tags
 * @returns {string} Complete HTML document
 */
pluginSystem.generateHtml = function(title, content, headTags = []) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  ${headTags.join('\n  ')}
</head>
<body>
  ${content}
  
  <script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>
  <script>
    // Client-side initialization
    document.addEventListener('DOMContentLoaded', function() {
      console.log('Page loaded, initializing Vue');
      
      if (window.initializeVueApp) {
        window.initializeVueApp();
      }
    });
  </script>
</body>
</html>`;
};

/**
 * Set up route handler for plugins
 * @param {Object} app - Express app instance
 */
pluginSystem.setupRouteHandler = function(app) {
  const self = this; // Store reference to pluginSystem for use in middleware
  
  app.use(async (req, res, next) => {
    // Skip API requests and static files
    if (req.path.startsWith('/api/') || req.path.startsWith('/static/') || req.path.includes('.')) {
      return next();
    }
    
    try {
      console.log('[Plugin System] Processing route:', req.path);
      
      // Check if any plugins are active
      if (self.activePlugins.length === 0) {
        console.log('[Plugin System] No active plugins found, serving welcome page');
        return self.serveWelcomePage(req, res);
      }
      
      // Find matching plugin route
      let matchedRoute = null;
      let matchedPlugin = null;
      
      for (const plugin of self.activePlugins) {
        // Skip if plugin doesn't have routes
        if (!plugin.routes) continue;
        
        // Check if the plugin is enabled
        if (!self.isPluginEnabled(plugin.id)) {
          console.log(`[Plugin System] Plugin ${plugin.id} is disabled, skipping routes`);
          continue;
        }
        
        // Check each route
        for (const route of plugin.routes) {
          // Get route path
          const routePath = typeof route === 'object' ? route.path : route;
          
          // Skip if plugin route doesn't match the requested path pattern
          if (!self.routeMatches(routePath, req.path)) continue;
          
          matchedRoute = route;
          matchedPlugin = plugin;
          break;
        }
        
        if (matchedRoute) break;
      }
      
      if (!matchedRoute || !matchedPlugin) {
        // No matching route found
        console.log('[Plugin System] No matching route found, serving welcome page');
        return self.serveWelcomePage(req, res);
      }
      
      console.log(`[Plugin System] Found matching route in plugin: ${matchedPlugin.id}`);
      
      // Extract path parameters
      const routePath = typeof matchedRoute === 'object' ? matchedRoute.path : matchedRoute;
      const params = self.extractParams(routePath, req.path);
      req.params = { ...req.params, ...params };
      
      // Get data for the route
      const data = await self.getRouteData(req, matchedPlugin, matchedRoute);
      
      // Try to use the plugin's server.js render function if available
      const serverJsPath = path.join(matchedPlugin.directory, 'server.js');
      if (fs.existsSync(serverJsPath)) {
        try {
          const serverModule = require(serverJsPath);
          if (typeof serverModule.render === 'function') {
            // Attach data to request for server.js to use
            req.pluginData = data;
            req.plugin = matchedPlugin;
            req.matchedRoute = matchedRoute;
            
            return serverModule.render(req, res, next);
          }
        } catch (error) {
          console.error(`[Plugin System] Error using server.js render for ${matchedPlugin.id}:`, error);
        }
      }
      
      // Fall back to simple component rendering
      self.renderComponent(req, res, matchedPlugin, matchedRoute, data);
      
    } catch (error) {
      console.error('[Plugin System] Error processing route:', error);
      next(error);
    }
  });
};

/**
 * Get data for a route using its data provider
 * @param {Object} req - Express request
 * @param {Object} plugin - Plugin object
 * @param {Object} route - Route object
 * @returns {Promise<Object>} Data for the route
 */
pluginSystem.getRouteData = async function(req, plugin, route) {
  try {
    // If route has no data provider, return empty object
    if (!route.dataProvider || typeof route.dataProvider !== 'string') {
      return {};
    }
    
    // Get data provider
    const dataProviderName = route.dataProvider;
    const dataProvider = plugin.dataProviders ? plugin.dataProviders[dataProviderName] : null;
    
    // If data provider doesn't exist, return empty object
    if (typeof dataProvider !== 'function') {
      console.warn(`[Plugin System] Data provider ${dataProviderName} not found for plugin ${plugin.id}`);
      return {};
    }
    
    // Call data provider
    const data = await dataProvider(req.params);
    return data || {};
  } catch (error) {
    console.error(`[Plugin System] Error getting data for route:`, error);
    return {};
  }
};

/**
 * Render a component
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 * @param {Object} plugin - Plugin object
 * @param {Object} route - Route object
 * @param {Object} data - Component data
 */
pluginSystem.renderComponent = function(req, res, plugin, route, data) {
  try {
    // Get component path and data
    const componentPath = typeof route === 'object' ? route.component : null;
    if (!componentPath) {
      throw new Error('Component path not specified in route');
    }
    
    // For now, just render a placeholder
    const headTags = plugin.headTags || [];
    
    const content = `
    <div id="app">
      <h1>${plugin.displayName || plugin.name}</h1>
      <p>Rendering component: ${componentPath}</p>
      <pre>${JSON.stringify(data, null, 2)}</pre>
    </div>
    `;
    
    res.send(this.generateHtml(
      `${plugin.displayName || plugin.name}`,
      content,
      headTags
    ));
  } catch (error) {
    console.error(`[Plugin System] Error rendering component:`, error);
    res.status(500).send(`Error rendering component: ${error.message}`);
  }
};

// Export the plugin system
module.exports = pluginSystem; 