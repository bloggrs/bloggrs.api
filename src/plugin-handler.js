/**
 * Plugin Handler - Stripped down version focused on the influencer-platform
 */
const express = require('express');
const path = require('path');
const fs = require('fs');
const { createSSRApp } = require('vue');
const { renderToString } = require('@vue/server-renderer');

// Setup plugin route handler for the Express app
function setupPluginRouteHandler(app) {
  app.use(async (req, res, next) => {
    // Skip API requests and static files
    if (req.path.startsWith('/api/') || req.path.startsWith('/static/') || req.path.includes('.')) {
      return next();
    }
    
    try {
      // If no active plugins, serve welcome page
      if (!global.activePlugins || global.activePlugins.length === 0) {
        return serveWelcomePage(req, res);
      }
      
      // Find a matching route in active plugins
      let matchedRoute = null;
      let matchedPlugin = null;
      
      for (const plugin of global.activePlugins) {
        if (!plugin.routes) continue;
        
        // Skip disabled plugins
        if (!isPluginEnabled(plugin.id)) continue;
        
        // Check each route
        for (const route of plugin.routes) {
          const routePath = typeof route === 'object' ? route.path : route;
          if (routeMatches(routePath, req.path)) {
          matchedRoute = route;
          matchedPlugin = plugin;
          break;
          }
        }
        
        if (matchedRoute) break;
      }
      
      // If no route matched, serve welcome page
      if (!matchedRoute || !matchedPlugin) {
        return serveWelcomePage(req, res);
      }
      
      // Extract parameters from route path
      const routePath = typeof matchedRoute === 'object' ? matchedRoute.path : matchedRoute;
      const params = extractParams(routePath, req.path);
      req.params = { ...req.params, ...params };
      
      // Get data from provider if one exists
      let data = {};
      if (matchedRoute.dataProvider && 
          matchedPlugin.dataProviders && 
          typeof matchedPlugin.dataProviders[matchedRoute.dataProvider] === 'function') {
        try {
          data = await matchedPlugin.dataProviders[matchedRoute.dataProvider](req.params);
        } catch (error) {
          console.error(`Error getting data from provider:`, error);
        }
      }
      
      // Try server.js first (for influencer-platform)
      const serverJsPath = path.join(__dirname, 'bloggrs', matchedPlugin.id, 'server.js');
      if (fs.existsSync(serverJsPath)) {
        try {
          const serverModule = require(serverJsPath);
          if (typeof serverModule.render === 'function') {
            // Attach data and route info to the request
            req.pluginData = data;
            req.pluginRoute = matchedRoute;
            req.plugin = matchedPlugin;
            return serverModule.render(req, res, next);
          }
        } catch (error) {
          console.error(`Error using server.js render:`, error);
        }
      }
      
      // Fall back to rendering the component
      await renderComponent(req, res, matchedPlugin, matchedRoute, data);
      
    } catch (error) {
      console.error(`Error handling route:`, error);
      next(error);
    }
  });
}

// Render a Vue component
async function renderComponent(req, res, plugin, route, data = {}) {
  try {
    // Get component path
    const componentPath = typeof route === 'object' ? route.component : null;
    if (!componentPath) {
      throw new Error('Component path not specified');
    }
    
    // Get full component path and check if it exists
    const fullComponentPath = path.join(__dirname, 'bloggrs', plugin.id, componentPath);
    if (!fs.existsSync(fullComponentPath)) {
      throw new Error(`Component file not found: ${componentPath}`);
    }
    
    // Read component content
    const componentContent = fs.readFileSync(fullComponentPath, 'utf8');
    
    // Create SSR app with component content and data
    // Check if server.js exists and has a render function
    const serverJsPath = path.join(__dirname, 'bloggrs', plugin.id, 'server.js');
    if (fs.existsSync(serverJsPath)) {
      try {
        const serverModule = require(serverJsPath);
        if (typeof serverModule.render === 'function') {
          // Pass request data to server.js render function
          req.pluginRoute = route;
          req.pluginData = data;
          return serverModule.render(req, res, () => {
            console.log(`[Plugin Handler] No response from server.js render, using fallback`);
            renderFallbackComponent(req, res, plugin, route, data);
          });
        }
      } catch (error) {
        console.error(`[Plugin Handler] Error using server.js render:`, error);
      }
    }
    
    // Fallback: Render the component directly
    return renderFallbackComponent(req, res, plugin, route, data);
    
  } catch (error) {
    console.error(`[Plugin Handler] Error rendering component:`, error);
    res.status(500).send(`Error rendering component: ${error.message}`);
  }
}

/**
 * Fallback component renderer
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 * @param {Object} plugin - Plugin object
 * @param {Object} route - Route object
 * @param {Object} data - Component data
 */
async function renderFallbackComponent(req, res, plugin, route, data) {
  try {
    // Get component path and content
    const componentPath = typeof route === 'object' ? route.component : null;
    const fullComponentPath = path.join(__dirname, 'bloggrs', plugin.id, componentPath);
    const componentContent = fs.readFileSync(fullComponentPath, 'utf8');
    
    // Create Vue app for SSR
    const app = createSSRApp({
      template: componentContent,
      data() {
        return { ...data };
      }
    });
    
    // Render component to string
    const html = await renderToString(app);
    
    // Get head tags from plugin
    const headTags = plugin.headTags || [];
    
    // Create script to pass data to client
    const dataScript = `
      <script>
        window.INITIAL_DATA = ${JSON.stringify(data)};
        window.PLUGIN_ID = "${plugin.id}";
        window.ROUTE_PATH = "${req.path}";
      </script>
    `;
    
    // Generate complete HTML
    const result = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${plugin.displayName || plugin.name || 'Plugin Page'}</title>
          ${headTags.join('\n          ')}
          ${dataScript}
        </head>
        <body>
          <div id="app">${html}</div>
          
          <script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>
          
          <!-- Load client.js if it exists -->
          <script>
            // Add plugin client script
            const clientScript = document.createElement('script');
            clientScript.src = '/plugins/${plugin.id}/client.js';
            clientScript.onerror = () => console.error('Failed to load client script');
            document.body.appendChild(clientScript);
          </script>
        </body>
      </html>
    `;
    
    res.send(result);
  } catch (error) {
    console.error(`[Plugin Handler] Error in fallback renderer:`, error);
    res.status(500).send(`Error rendering component: ${error.message}`);
  }
}

/**
 * Serve a welcome page
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 * @param {string} errorMessage - Optional error message
 */
function serveWelcomePage(req, res, errorMessage = null) {
  // Generate the welcome page HTML
  const welcomeHtml = generateWelcomePage(errorMessage);
  res.send(welcomeHtml);
}

/**
 * Generate welcome page with proper plugin status checks
 * @param {string} errorMessage - Optional error message
 * @returns {string} HTML content
 */
function generateWelcomePage(errorMessage = null) {
  // Get plugins from plugin manager instead of global
  const pluginManager = require('./utils/plugin-manager');
  const activePlugins = pluginManager.getAllPlugins(true) || [];

  // Rest of the template remains the same, but we'll modify the helper functions:
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Bloggrs Platform</title>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
      <style>
        .hero.welcome { background: linear-gradient(135deg, #3273dc, #209cee); }
        .hero.welcome .title, .hero.welcome .subtitle { color: white; }
        .feature-icon { font-size: 2rem; color: #3273dc; margin-bottom: 1rem; }
        .status-badge { display: inline-block; width: 12px; height: 12px; border-radius: 50%; margin-right: 5px; }
        .status-enabled { background-color: #48c774; }
        .status-disabled { background-color: #f14668; }
        .plugin-card { transition: all 0.3s; }
        .plugin-card:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0,0,0,0.1); }
        code { background-color: #f5f5f5; padding: 2px 4px; border-radius: 3px; }
        .code-block { background-color: #f5f5f5; padding: 1.5rem; border-radius: 6px; overflow-x: auto; }
        .step-number { display: inline-flex; align-items: center; justify-content: center; width: 30px; height: 30px; background-color: #3273dc; color: white; border-radius: 50%; margin-right: 10px; }
        .feature-box { 
          padding: 2rem;
          margin-bottom: 2rem;
          border-radius: 8px;
          background: #f8f9fa;
        }
        .security-notice {
          background-color: #fff3cd;
          border-left: 4px solid #ffc107;
          padding: 1rem;
          margin: 1rem 0;
        }
      </style>
    </head>
    <body>
      <!-- Hero section -->
      <section class="hero welcome is-medium">
        <div class="hero-body">
          <div class="container">
            <h1 class="title is-1">
              <i class="fas fa-server mr-3"></i>Bloggrs Platform
            </h1>
            <h2 class="subtitle is-3">The Modern WordPress Alternative</h2>
            <p class="subtitle mt-3">A secure, extensible content management platform built for developers</p>
          </div>
        </div>
      </section>
      
      ${errorMessage ? `
        <section class="section">
          <div class="container">
            <div class="notification is-danger">
              <button class="delete" onclick="this.parentElement.style.display='none'"></button>
              <strong>Security Notice:</strong> ${errorMessage}
            </div>
          </div>
        </section>
      ` : ''}

      <!-- New Plugin List Section -->
      <section class="section">
        <div class="container">
          <h2 class="title is-3">
            <span class="icon-text">
              <span class="icon has-text-info">
                <i class="fas fa-puzzle-piece"></i>
              </span>
              <span>Installed Plugins</span>
            </span>
          </h2>
          ${getPluginList()}
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="columns">
            <div class="column is-8">
              <div class="content">
                <div class="feature-box">
                  <h2 class="title is-4">Why Choose Bloggrs?</h2>
                  <div class="columns is-multiline">
                    <div class="column is-6">
                      <p><i class="fas fa-shield-alt has-text-primary mr-2"></i> <strong>Secure by Design</strong></p>
                      <p class="is-size-7">Built with modern security practices and regular updates</p>
                    </div>
                    <div class="column is-6">
                      <p><i class="fas fa-puzzle-piece has-text-info mr-2"></i> <strong>Plugin Architecture</strong></p>
                      <p class="is-size-7">Extensible plugin system for custom functionality</p>
                    </div>
                    <div class="column is-6">
                      <p><i class="fas fa-tachometer-alt has-text-success mr-2"></i> <strong>High Performance</strong></p>
                      <p class="is-size-7">Optimized for speed and scalability</p>
                    </div>
                    <div class="column is-6">
                      <p><i class="fas fa-code has-text-danger mr-2"></i> <strong>Developer Friendly</strong></p>
                      <p class="is-size-7">Modern tech stack with great developer experience</p>
                    </div>
                  </div>
                </div>

                <div class="security-notice">
                  <p><strong>Security Notice:</strong> Please ensure you enable at least one authentication plugin before exposing this server to the public.</p>
                </div>

                <!-- Existing Getting Started section -->
                <h2 class="title is-3">Getting Started with Plugins</h2>
                
                <div class="box">
                  <h3 class="title is-4">
                    <span class="step-number">1</span>Create a Plugin
                  </h3>
                  <p>Plugins are located in the <code>src/bloggrs</code> directory. Each plugin has its own folder.</p>
                  <div class="code-block">
                    <code>
                      src/bloggrs/my-plugin/<br>
                      ├── index.js          # Main plugin file<br>
                      ├── plugin.json       # Plugin configuration<br>
                      ├── data-providers.js # Data providers<br>
                      └── views/            # Vue components
                    </code>
                  </div>
                </div>
                
                <div class="box">
                  <h3 class="title is-4">
                    <span class="step-number">2</span>Configure Your Plugin
                  </h3>
                  <p>Create a <code>plugin.json</code> file with the following configuration:</p>
                  <div class="code-block">
                    <pre><code>{
  "name": "My Plugin",
  "version": "1.0.0",
  "description": "My amazing plugin",
  "enabled": true,
  "scripts": [
    "/js/my-plugin.js"
  ],
  "styles": [
    "/css/my-plugin.css"
  ]
}</code></pre>
                  </div>
                  <p class="help mt-2">Set <code>"enabled": true</code> to activate your plugin.</p>
                </div>
                
                <div class="box">
                  <h3 class="title is-4">
                    <span class="step-number">3</span>Implement Your Plugin
                  </h3>
                  <p>Create an <code>index.js</code> file with routes and initialization:</p>
                  <div class="code-block">
                    <pre><code>const express = require('express');
const path = require('path');

// Import data providers
const { getDataForMyComponent } = require('./data-providers');

// Define plugin routes
const routes = [
  {
    path: '/my-plugin',
    component: 'views/MyComponent.vue',
    dataProvider: getDataForMyComponent
  }
];

// Initialize function
async function initialize(pluginSystem, expressApp) {
  // Register with plugin system
  await pluginSystem.registerPlugin({
    id: 'my-plugin',
    name: 'My Plugin',
    routes: routes
  });
  
  // Register API routes if needed
  const router = express.Router();
  router.get('/data', (req, res) => {
    res.json({ success: true, data: 'Hello from my plugin!' });
  });
  
  expressApp.use('/api/plugins/my-plugin', router);
}

module.exports = {
  initialize,
  routes
};</code></pre>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="column is-4">
              <!-- Plugin Stats -->
              <div class="box">
                <h3 class="title is-4">
                  <span class="icon has-text-primary">
                    <i class="fas fa-puzzle-piece"></i>
                  </span>
                  System Status
                </h3>
                <div id="plugin-stats">
                  ${getPluginStats()}
                </div>
              </div>
              
              <!-- Security Status -->
              <div class="box">
                <h3 class="title is-4">
                  <span class="icon has-text-warning">
                    <i class="fas fa-shield-alt"></i>
                  </span>
                  Security Status
                </h3>
                <div class="content">
                  <ul>
                    <li><strong>Authentication:</strong> ${isAuthEnabled() ? '<span class="tag is-success">Enabled</span>' : '<span class="tag is-danger">Disabled</span>'}</li>
                    <li><strong>Active Plugins:</strong> ${getActivePluginCount()}</li>
                    <li><strong>API Security:</strong> ${isApiSecured() ? '<span class="tag is-success">Secured</span>' : '<span class="tag is-warning">Review Required</span>'}</li>
                  </ul>
                </div>
              </div>
              
              <!-- Quick links -->
              <div class="box">
                <h3 class="title is-4">
                  <span class="icon has-text-success">
                    <i class="fas fa-link"></i>
                  </span>
                  Quick Links
                </h3>
                <div class="buttons are-medium">
                  <a href="/" class="button is-fullwidth is-link">
                    <span class="icon"><i class="fas fa-home"></i></span>
                    <span>Home</span>
                  </a>
                  <a href="/api/status" class="button is-fullwidth is-info">
                    <span class="icon"><i class="fas fa-server"></i></span>
                    <span>API Status</span>
                  </a>
                  <a href="/api/plugins" class="button is-fullwidth is-primary">
                    <span class="icon"><i class="fas fa-puzzle-piece"></i></span>
                    <span>Plugin List</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <footer class="footer">
        <div class="content has-text-centered">
          <p>
            <strong>Bloggrs Platform</strong> - An extensible content management system.
          </p>
        </div>
      </footer>
    </body>
    </html>
  `;
}

/**
 * Check if authentication is properly enabled
 * @returns {boolean}
 */
function isAuthEnabled() {
  try {
    const pluginManager = require('./utils/plugin-manager');
    const plugins = pluginManager.getAllPlugins(true) || [];
    
    const authPlugins = plugins.filter(plugin => 
      plugin.capabilities && 
      (plugin.capabilities.includes('auth') || plugin.capabilities.includes('authentication'))
    );
    
    return authPlugins.length > 0;
  } catch (error) {
    console.error('[Plugin Handler] Error checking auth status:', error);
    return false;
  }
}

/**
 * Get count of active plugins
 * @returns {number}
 */
function getActivePluginCount() {
  try {
    const pluginManager = require('./utils/plugin-manager');
    const plugins = pluginManager.getAllPlugins(true) || [];
    return plugins.length;
  } catch (error) {
    console.error('[Plugin Handler] Error getting plugin count:', error);
    return 0;
  }
}

/**
 * Get formatted plugin statistics
 * @returns {string} HTML content
 */
function getPluginStats() {
  try {
    const pluginManager = require('./utils/plugin-manager');
    const activePlugins = pluginManager.getAllPlugins(true) || [];
    const allPlugins = pluginManager.getAllPlugins(false) || [];
    
    return `
      <div class="content">
        <ul>
          <li><strong>Total Plugins:</strong> ${allPlugins.length}</li>
          <li><strong>Active Plugins:</strong> ${activePlugins.length}</li>
          <li><strong>System Status:</strong> 
            ${activePlugins.length > 0 ? 
              '<span class="tag is-success">Active</span>' : 
              '<span class="tag is-warning">No Active Plugins</span>'}
          </li>
        </ul>
      </div>
    `;
  } catch (error) {
    console.error('[Plugin Handler] Error generating plugin stats:', error);
    return '<div class="notification is-danger">Error loading plugin statistics</div>';
  }
}

/**
 * Check if API endpoints are secured
 * @returns {boolean}
 */
function isApiSecured() {
  try {
    const pluginManager = require('./utils/plugin-manager');
    const plugins = pluginManager.getAllPlugins(true) || [];
    
    // Check if authentication middleware is present
    const hasAuthMiddleware = plugins.some(p => 
      p.middleware && p.middleware.some(m => m.type === 'auth')
    );
    
    // Check if CORS is properly configured
    const config = require('./config'); // Make sure this path is correct
    const hasSecureCors = config && 
      config.apiCors && 
      config.apiCors.origins && 
      !config.apiCors.origins.includes('*');
    
    return hasAuthMiddleware && hasSecureCors;
  } catch (error) {
    console.error('[Plugin Handler] Error checking API security:', error);
    return false;
  }
}

/**
 * Check if a plugin is enabled
 * @param {string} id - Plugin ID
 * @returns {boolean} Whether the plugin is enabled
 */
function isPluginEnabled(id) {
  if (!id) return false;
  
  try {
    // First check for explicit registration in global.activePlugins
    if (global.activePlugins) {
      const isActive = global.activePlugins.some(p => p.id === id);
      if (isActive) {
        return true;
      }
    }
    
    // Then check the plugin.json
    const pluginDir = path.join(__dirname, 'bloggrs', id);
    const configPath = path.join(pluginDir, 'plugin.json');
    
    if (!fs.existsSync(configPath)) {
      console.log(`[Plugin Handler] No plugin.json found for ${id}, considering disabled`);
      return false;
    }
    
    const config = require(configPath);
    
    // Check if explicitly disabled
    if (config.enabled === false) {
      console.log(`[Plugin Handler] Plugin ${id} is explicitly disabled in plugin.json`);
      return false;
    }
    
    console.log(`[Plugin Handler] Plugin ${id} is enabled in plugin.json`);
    return true;
  } catch (error) {
    console.error(`[Plugin Handler] Error checking if plugin ${id} is enabled:`, error);
    return false;
  }
}

/**
 * Check if a route matches a pattern
 * @param {string} pattern - Route pattern with parameters
 * @param {string} path - Actual path
 * @returns {boolean} Whether the path matches the pattern
 */
function routeMatches(pattern, path) {
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
}

/**
 * Extract parameters from a path based on a pattern
 * @param {string} pattern - Route pattern with parameters
 * @param {string} path - Actual path
 * @returns {Object} Parameter key-value pairs
 */
function extractParams(pattern, path) {
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
}

// Add this new helper function
function getPluginList() {
  try {
    const pluginManager = require('./utils/plugin-manager');
    const allPlugins = pluginManager.getAllPlugins(false) || [];
    
    if (allPlugins.length === 0) {
      return `
        <div class="notification is-warning">
          <p>No plugins found in the system.</p>
        </div>
      `;
    }

    return `
      <div class="table-container">
        <table class="table is-fullwidth">
          <thead>
            <tr>
              <th>Plugin Name</th>
              <th>Status</th>
              <th>Version</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            ${allPlugins.map(plugin => `
              <tr>
                <td>
                  <strong>${plugin.displayName || plugin.name}</strong>
                  ${plugin.id ? `<div class="tag is-light is-small">${plugin.id}</div>` : ''}
                </td>
                <td>
                  ${plugin.enabled ? 
                    '<span class="tag is-success">Enabled</span>' : 
                    '<span class="tag is-danger">Disabled</span>'}
                </td>
                <td>${plugin.version || 'N/A'}</td>
                <td>${plugin.description || 'No description available'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  } catch (error) {
    console.error('[Plugin Handler] Error generating plugin list:', error);
    return '<div class="notification is-danger">Error loading plugin list</div>';
  }
}

// Export functions
module.exports = {
  setupPluginRouteHandler,
  serveWelcomePage,
  isPluginEnabled,
  routeMatches,
  extractParams
}; 