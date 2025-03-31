const path = require('path');
const fs = require('fs');
const { createSSRApp } = require('vue');
const { renderToString } = require('@vue/server-renderer');
const dotenv = require('dotenv');
const ensureComponentData = require('./ensure-component-data');

/**
 * Plugin System
 * 
 * Manages the discovery, loading, and execution of plugins
 */
class PluginSystem {
  /**
   * Create a new plugin system
   * @param {Object} options - Plugin system options
   */
  constructor(options = {}) {
    this.options = {
      pluginsDir: path.join(__dirname, '../bloggrs'),
      baseUrl: '/',
      ...options
    };
    
    this.plugins = [];
    this.initialized = false;
  }
  
  /**
   * Initialize the plugin system
   * @param {Object} app - Express app
   */
  async init(app) {
    if (this.initialized) {
      console.log('[Plugin System] Already initialized');
      return;
    }
    
    console.log(`[Plugin System] Initializing with plugins directory: ${this.options.pluginsDir}`);
    
    try {
      // Load plugins
      await this.loadPlugins();
      
      // Initialize each plugin
      for (const plugin of this.plugins) {
        try {
          console.log(`[Plugin System] Initializing plugin: ${plugin.id}`);
          if (plugin.initialize) {
            await plugin.initialize(app, {}, this);
          }
        } catch (error) {
          console.error(`[Plugin System] Error initializing plugin ${plugin.id}:`, error);
        }
      }
      
      this.initialized = true;
      console.log(`[Plugin System] Initialization complete. Loaded ${this.plugins.length} plugins.`);
    } catch (error) {
      console.error('[Plugin System] Initialization failed:', error);
      throw error;
    }
  }
  
  /**
   * Backward compatibility method - redirects to init
   * @param {Object} app - Express app
   * @param {Object} options - Options
   */
  async initPlugins(app, options = {}) {
    console.log('[Plugin System] initPlugins called (backward compatibility method)');
    return this.init(app);
  }
  
  /**
   * Load all plugins from the plugins directory
   */
  async loadPlugins() {
    try {
      // Check if plugins directory exists
      if (!fs.existsSync(this.options.pluginsDir)) {
        console.error(`[Plugin System] Plugins directory does not exist: ${this.options.pluginsDir}`);
        return;
      }
      
      // Get all directories in the plugins directory
      const pluginDirs = await fs.promises.readdir(this.options.pluginsDir, { withFileTypes: true })
        .then(files => files.filter(file => file.isDirectory()));
      
      // Load each plugin
      for (const dir of pluginDirs) {
        try {
          const pluginId = dir.name;
          const pluginDir = path.join(this.options.pluginsDir, pluginId);
          
          // Check if plugin has an index.js file
          const indexPath = path.join(pluginDir, 'index.js');
          if (!fs.existsSync(indexPath)) {
            console.warn(`[Plugin System] Plugin ${pluginId} has no index.js file, skipping`);
            continue;
          }
          
          // Check if plugin has a plugin.json file
          const configPath = path.join(pluginDir, 'plugin.json');
          if (!fs.existsSync(configPath)) {
            console.warn(`[Plugin System] Plugin ${pluginId} has no plugin.json file, skipping`);
            continue;
          }
          
          // Load the plugin
          const plugin = require(indexPath);
          
          // Check if plugin is enabled
          const config = require(configPath);
          if (config.enabled === false) {
            console.warn(`[Plugin System] Plugin ${pluginId} is disabled, skipping`);
            continue;
          }
          
          // Add plugin to the list
          plugin.directory = pluginDir;
          this.plugins.push(plugin);
          console.log(`[Plugin System] Loaded plugin: ${plugin.id || pluginId}`);
        } catch (error) {
          console.error(`[Plugin System] Error loading plugin ${dir.name}:`, error);
        }
      }
      
      // Sort plugins by priority
      this.plugins.sort((a, b) => {
        const priorityA = a.priority || 0;
        const priorityB = b.priority || 0;
        return priorityB - priorityA;
      });
    } catch (error) {
      console.error('[Plugin System] Error loading plugins:', error);
      throw error;
    }
  }
  
  /**
   * Find plugin for a route
   * @param {string} url - URL path
   * @returns {Object} Plugin and route
   */
  findPluginForRoute(url) {
    for (const plugin of this.plugins) {
      if (!plugin.routes || typeof plugin.routes !== 'function') {
        continue;
      }
      
      const routes = plugin.routes();
      if (!Array.isArray(routes)) {
        continue;
      }
      
      for (const route of routes) {
        if (this.matchRoute(route.path, url)) {
          return { plugin, route };
        }
      }
    }
    
    return { plugin: null, route: null };
  }
  
  /**
   * Match a route path to a URL
   * @param {string} routePath - Route path with parameters
   * @param {string} url - Actual URL
   * @returns {boolean} Whether the route matches
   */
  matchRoute(routePath, url) {
    // Clean up the URL and route path
    const cleanUrl = url.replace(/\/$/, ''); // Remove trailing slash
    const cleanRoutePath = routePath.replace(/\/$/, ''); // Remove trailing slash
    
    // Exact match for simple routes
    if (cleanRoutePath === cleanUrl) {
      console.log(`[Plugin System] Exact match for route: ${routePath} with URL: ${url}`);
      return true;
    }
    
    // For parameterized routes, use regex matching
    if (cleanRoutePath.includes(':')) {
      // Convert route path to regex
      const pattern = cleanRoutePath
        .replace(/:[^/]+/g, '([^/]+)')
        .replace(/\//g, '\\/');
      
      const regex = new RegExp(`^${pattern}$`);
      const isMatch = regex.test(cleanUrl);
      
      if (isMatch) {
        console.log(`[Plugin System] Regex match for route: ${routePath} with URL: ${url}`);
      }
      
      return isMatch;
    }
    
    // Special case for root path
    if (routePath === '/' && (url === '/' || url === '')) {
      console.log(`[Plugin System] Root path match for URL: ${url}`);
      return true;
    }
    
    return false;
  }
  
  /**
   * Extract route parameters
   * @param {string} routePath - Route path with parameters
   * @param {string} url - Actual URL
   * @returns {Object} Route parameters
   */
  extractRouteParams(routePath, url) {
    const routeParts = routePath.split('/');
    const urlParts = url.split('/');
    const params = {};
    
    for (let i = 0; i < routeParts.length; i++) {
      if (routeParts[i].startsWith(':')) {
        const paramName = routeParts[i].substring(1);
        params[paramName] = urlParts[i] || '';
      }
    }
    
    return params;
  }
  
  /**
   * Render a route
   * @param {Object} req - Express request
   * @param {Object} res - Express response
   * @param {Function} next - Express next function
   * @returns {boolean} Whether the route was handled
   */
  async renderRoute(req, res, next) {
    try {
      const reqPath = req.path;
      console.log(`[Plugin System] Attempting to render route: ${reqPath}`);
      
      // Debug available routes
      let availableRoutes = [];
      this.plugins.forEach(plugin => {
        if (plugin.routes && typeof plugin.routes === 'function') {
          const routes = plugin.routes();
          if (Array.isArray(routes)) {
            availableRoutes = availableRoutes.concat(
              routes.map(r => ({ plugin: plugin.id, path: r.path, component: r.component }))
            );
          }
        }
      });
      
      console.log(`[Plugin System] Available routes:`, availableRoutes.map(r => `${r.plugin}:${r.path}`));
      
      // Find matching plugin and route
      const { plugin, route } = this.findPluginForRoute(reqPath);
      
      if (!plugin || !route) {
        console.log(`[Plugin System] No plugin/route found for path: ${reqPath}`);
        return false;
      }
      
      console.log(`[Plugin System] Found route ${route.path} for plugin ${plugin.id}`);
      
      // Extract route params
      const routeParams = this.extractRouteParams(route.path, reqPath);
      req.params = { ...req.params, ...routeParams };
      
      // Get component path - IMPORTANT: Use Node.js path module for file paths, not URLs
      const componentPath = path.join(plugin.directory, route.component);
      
      if (!fs.existsSync(componentPath)) {
        console.error(`[Plugin System] Component not found: ${componentPath}`);
        this.renderFallback(req, res, `Component not found: ${route.component}`);
        return true;
      }
      
      // Fetch initial data using data provider if available
      let initialData = {};
      if (route.dataProvider && typeof plugin.getDataProvider === 'function') {
        const dataProvider = plugin.getDataProvider(route.dataProvider);
        
        if (dataProvider && typeof dataProvider === 'function') {
          console.log(`[Plugin System] Fetching data using provider: ${route.dataProvider}`);
          
          try {
            initialData = await dataProvider(req);
            console.log(`[Plugin System] Data fetched successfully for ${route.path}`);
          } catch (dataError) {
            console.error(`[Plugin System] Error fetching data with provider ${route.dataProvider}:`, dataError);
            initialData = { error: dataError.message };
          }
        } else {
          console.warn(`[Plugin System] Data provider ${route.dataProvider} not found or not a function`);
        }
      }
      
      // Render the component
      await this.renderComponent(req, res, next, {
        pluginId: plugin.id,
        component: componentPath,
        initialData,
        routeParams,
        plugin,
        route
      });
      
      return true;
    } catch (error) {
      console.error(`[Plugin System] Error rendering route ${req.path}:`, error);
      this.renderFallback(req, res, `Error rendering route: ${error.message}`);
      return true;
    }
  }
  
  /**
   * Render a component
   * @param {Object} req - Express request
   * @param {Object} res - Express response
   * @param {Function} next - Express next function
   * @param {Object} options - Render options
   */
  async renderComponent(req, res, next, options) {
    try {
      const { pluginId, component, initialData, routeParams, plugin, route } = options;
      
      console.log(`[Plugin System] Rendering component: ${component}`);
      console.log(`[Plugin System] Initial data keys:`, Object.keys(initialData || {}));
      
      // Read the component file
      const componentContent = fs.readFileSync(component, 'utf8');
      
      // Extract template and script sections
      const templateMatch = componentContent.match(/<template>([\s\S]*?)<\/template>/i);
      const scriptMatch = componentContent.match(/<script>([\s\S]*?)<\/script>/i);
      
      if (!templateMatch) {
        console.error(`[Plugin System] No template found in component: ${component}`);
        return this.renderFallback(req, res, `No template found in component: ${route.component}`);
      }
      
      // Compile the Vue component
      const compiledComponent = {
        template: templateMatch[1],
        data() {
          return {
            ...initialData,
            routeParams
          };
        },
        methods: {},
        computed: {},
        mounted() {}
      };
      
      // Add methods, computed, etc. if available in script
      if (scriptMatch) {
        const script = scriptMatch[1];
        try {
          // Extract export default { ... } content
          const exportMatch = script.match(/export\s+default\s*(\{[\s\S]*\})/);
          if (exportMatch) {
            let scriptObj = exportMatch[1];
            
            // Simple transformation for evaluation
            scriptObj = scriptObj
              .replace(/data\(\)\s*\{/g, '"data": function() {')
              .replace(/methods\s*:/g, '"methods":')
              .replace(/computed\s*:/g, '"computed":')
              .replace(/mounted\s*\(\)\s*\{/g, '"mounted": function() {');
            
            try {
              // Evaluate the script object
              const componentObj = eval(`(${scriptObj})`);
              
              // Merge with compiled component - don't override data
              Object.keys(componentObj).forEach(key => {
                if (key !== 'data') {
                  compiledComponent[key] = componentObj[key];
                }
              });
              
              console.log(`[Plugin System] Extracted from component:`, {
                methods: Object.keys(compiledComponent.methods || {}),
                computed: Object.keys(compiledComponent.computed || {})
              });
            } catch (scriptError) {
              console.error(`[Plugin System] Error parsing component script: ${scriptError.message}`);
              // Continue with the compilation even if script parsing fails
            }
          }
        } catch (scriptError) {
          console.error(`[Plugin System] Error parsing component script: ${scriptError.message}`);
          // Continue with the compilation even if script parsing fails
        }
      }
      
      // Create a Vue SSR app
      const app = createSSRApp(compiledComponent);
      
      // Render to HTML
      const html = await renderToString(app);
      
      // Serialize data for client hydration - CRITICAL: Ensure component data is provided
      const componentData = {
        template: compiledComponent.template,
        methods: compiledComponent.methods || {},
        computed: compiledComponent.computed || {}
      };
      
      console.log(`[Plugin System] Component data created, template length: ${componentData.template.length}`);
      console.log(`[Plugin System] Component methods: ${Object.keys(componentData.methods)}`);
      
      const serializedData = `
        <script>
          window.COMPONENT_DATA = ${JSON.stringify(componentData)};
          window.INITIAL_DATA = ${JSON.stringify(initialData || {})};
          window.ROUTE_PARAMS = ${JSON.stringify(routeParams || {})};
          window.CURRENT_ROUTE = "${route.path}";
          window.PLUGIN_ID = "${pluginId}";
        </script>
      `;
      
      // Get head tags from plugin
      const headTags = plugin.headTags ? 
        (typeof plugin.headTags === 'function' ? plugin.headTags() : plugin.headTags) : 
        '';
      
      // Read the HTML template
      const templatePath = path.join(__dirname, '../views/index.html');
      if (!fs.existsSync(templatePath)) {
        console.error(`[Plugin System] Template file not found: ${templatePath}`);
        return this.renderFallback(req, res, 'Template file not found');
      }
      
      let template = fs.readFileSync(templatePath, 'utf8');
      
      // Replace placeholders
      template = template
        .replace('<!-- APP_HTML -->', html)
        .replace('<!-- HEAD_TAGS -->', headTags)
        .replace('<!-- SERIALIZED_DATA -->', serializedData)
        .replace('<!-- CLIENT_BOOTSTRAP -->', `
          <script src="/js/vue-client.js"></script>
          <script src="/js/debug-panel.js"></script>
        `);
      
      // Validate that required data is present before sending
      if (!template.includes('window.COMPONENT_DATA')) {
        console.error('[Plugin System] Component data missing from template');
        console.error('[Plugin System] Template fragment:', template.substring(0, 500)); // Show part of the template
        return this.renderFallback(req, res, 'Component data missing from template');
      }
      
      // Send the response
      res.send(template);
    } catch (error) {
      console.error('[Plugin System] Error in renderComponent:', error);
      this.renderFallback(req, res, `Error rendering component: ${error.message}`);
    }
  }
  
  /**
   * Render a fallback page when component rendering fails
   * @param {Object} req - Express request
   * @param {Object} res - Express response
   * @param {string} errorMessage - Error message
   */
  renderFallback(req, res, errorMessage) {
    console.log(`[Plugin System] Rendering fallback for ${req.path}: ${errorMessage}`);
    
    // Create a simple error page
    const fallbackHTML = `
      <div class="section">
        <div class="container">
          <div class="notification is-warning">
            <h3 class="title is-4">Component Rendering Error</h3>
            <p>${errorMessage}</p>
            <p>Path: ${req.path}</p>
            <div class="buttons mt-3">
              <button onclick="window.location.reload()" class="button is-primary">Reload Page</button>
              <a href="/" class="button is-info">Go to Home</a>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Prepare serialized data for fallback
    const serializedData = `
      <script>
        window.COMPONENT_DATA = {
          template: \`${fallbackHTML.replace(/`/g, '\\`')}\`,
          data: {
            error: ${JSON.stringify(errorMessage)},
            path: ${JSON.stringify(req.path)}
          }
        };
      </script>
    `;
  }
}

module.exports = { PluginSystem };
