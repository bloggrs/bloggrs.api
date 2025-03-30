const dotenv = require('dotenv');
if (!process.env.DONT_USE_DOTENV) dotenv.config();

require('randomuuid') // crypto polyfill
require("express-async-errors");

// const models = require("./models");

// models.sequelize.sync({ force: false });

const http = require("http");
const cors = require("cors");
const express = require("express");
const compression = require("compression");
const bodyParser = require("body-parser");
const logger = require("morgan")("dev");
const path = require("path");
const { fileURLToPath } = require('url');
const DocsCollector = require("docs-collector");
const { createSSRApp } = require('vue')
const { renderToString } = require('@vue/server-renderer')
const fs = require('fs');
const { dirname, resolve } = require('path');
const { createServer } = require('vite');
const { renderComponentWithNaiveUI } = require('./utils/naive-ui-ssr');
const { PluginManager } = require('./utils/plugin-manager');
const resourceManager = require('./utils/resource-manager');
const { initializePlugins } = require('./utils/plugin-init');
const { setupVueRequireHook } = require('./utils/vue-require-hook');
const { PluginSystem } = require('./utils/plugin-system');

const docs_collector = new DocsCollector(
  __dirname + "/libs/api-docs/swagger-input.json",
  __dirname + "/libs/api-docs/swagger.json"
);

const { errorHandler, allowCrossDomain } = require("./middlewares");
const { addPermissionContext } = require("./middlewares/permissions");
const { authenticateUser } = require("./middlewares/auth");

const users_api = require("./libs/users-api");
const auth_api = require("./libs/auth-api");
const api_docs = require("./libs/api-docs");
const blogs_api = require("./libs/blogs-api");
const blogcategories_api = require("./libs/blogcategories-api");
const categories_api = require("./libs/categories-api");
const pages_api = require("./libs/pages-api");
const posts_api = require("./libs/posts-api");
const postcategories_api = require("./libs/postcategories-api");
const postcomments_api = require("./libs/postcomments-api");
const postlikes_api = require("./libs/postlikes-api");
const referral_api = require("./libs/referral-api");
const teammembers_api = require("./libs/teammembers-api");
const secretkeys_api = require("./libs/secretkeys-api");
const publickeys_api = require("./libs/publickeys-api");
const blogpostcategories_api = require("./libs/blogpostcategories-api");
const blogcontacts_api = require("./libs/blogcontacts-api");
const files_api = require("./libs/files-api");
const pageviews_api = require("./libs/pageviews-api");
const sitesessions_api = require("./libs/sitesessions-api");
const blogthemes_api = require("./libs/blogthemes-api");
const roles_api = require("./libs/roles-api");
const blogpermissions_api = require("./libs/blogpermissions-api");
const permissions_api = require("./libs/permissions-api");
const teammemberspermissions_api = require("./libs/teammemberspermissions-api");
const resourcepolicies_api = require("./libs/resourcepolicies-api");
const console_api = require("./console-api");

const app = express();
const server = http.createServer(app);
// __dirname is already defined since this is a CommonJS module

// Basic middleware
app.use(cors())
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(logger);
app.use(allowCrossDomain);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Import the plugin system

// Add this function near the top of app.js
function loadAllPluginEnvironments() {
  const pluginsDir = path.join(__dirname, 'bloggrs');
  if (!fs.existsSync(pluginsDir)) return;
  
  const items = fs.readdirSync(pluginsDir, { withFileTypes: true });
  const pluginDirs = items.filter(item => 
    item.isDirectory() && item.name !== 'node_modules' && !item.name.startsWith('.')
  );
  
  for (const dir of pluginDirs) {
    const pluginId = dir.name;
    const envPath = path.join(pluginsDir, pluginId, '.env');
    
    if (fs.existsSync(envPath)) {
      console.log(`Loading environment from ${pluginId}/.env`);
      const envContent = fs.readFileSync(envPath, 'utf8');
      const pluginEnv = dotenv.parse(envContent);
      
      // Add to process.env
      Object.entries(pluginEnv).forEach(([key, value]) => {
        process.env[key] = value;
      });
    }
  }
}

// Call this function before initializing plugins
loadAllPluginEnvironments();

// Function to load a plugin's .env file if it exists
function loadPluginEnv(pluginId) {
  const pluginEnvPath = path.join(__dirname, 'bloggrs', pluginId, '.env');
  
  if (fs.existsSync(pluginEnvPath)) {
    console.log(`Loading environment variables from ${pluginId}/.env`);
    const pluginEnv = dotenv.parse(fs.readFileSync(pluginEnvPath));
    
    // Add these variables to the current process.env
    Object.keys(pluginEnv).forEach(key => {
      process.env[key] = pluginEnv[key];
    });
  }
}

// Where you initialize plugins (likely before calling initializePlugins)
// Load environment variables for all plugins BEFORE initialization
const pluginsDir = path.join(__dirname, 'bloggrs');
if (fs.existsSync(pluginsDir)) {
  const items = fs.readdirSync(pluginsDir, { withFileTypes: true });
  const pluginDirs = items.filter(item => 
    item.isDirectory() && item.name !== 'node_modules' && !item.name.startsWith('.')
  );
  
  // Load .env for each plugin
  pluginDirs.forEach(dir => {
    loadPluginEnv(dir.name);
  });
}

// Create plugin system instance - make sure this is done correctly
const pluginSystem = new PluginSystem({
  pluginsDir: path.join(__dirname, 'bloggrs'),
  baseUrl: '/'
});

// Initialize plugin system
(async () => {
  try {
    console.log('Initializing plugin system...');
    
    // Check that the plugin system was created correctly
    if (!pluginSystem) {
      throw new Error('Plugin system not created');
    }
    
    // Verify that the methods exist
    console.log('Available methods:', Object.keys(pluginSystem));
    
    // Try to initialize
    await pluginSystem.init(app);
    
    console.log('Plugin system initialized successfully');
    
    // Log available plugins
    console.log('Available plugins:');
    pluginSystem.plugins.forEach(plugin => {
      console.log(`- ${plugin.id} (${plugin.name})`);
    });
  } catch (error) {
    console.error('Error initializing plugin system:', error);
  }
})();

// Add this middleware before plugin route handling:
app.use((req, res, next) => {
  // Attach plugin system to request for plugins to use
  req._pluginSystem = pluginSystem;
  next();
});

// Handle plugin routes
app.use('/', async (req, res, next) => {
  // Skip API requests
  if (req.path.startsWith('/api/')) {
    return next();
  }
  
  // Skip static files
  const ext = path.extname(req.path);
  if (ext && ext.length > 0) {
    return next();
  }
  
  console.log(`[App] Handling route: ${req.path}`);
  
  try {
    // Check if the plugin system is initialized
    if (!pluginSystem.initialized) {
      console.warn('[App] Plugin system not fully initialized, trying to render anyway');
    }
    
    // Use the plugin system to render the route
    const rendered = await pluginSystem.renderRoute(req, res, next);
    
    if (!rendered) {
      console.log(`[App] No plugin handled route: ${req.path}`);
      next();
    }
  } catch (error) {
    console.error(`[App] Error handling route ${req.path}:`, error);
    // Handle emergency rendering
    handleEmergencyRoute(req, res, next);
  }
});

// Explicitly register important plugin routes as a fallback
// These routes will be checked if the main plugin router doesn't handle them
const importantRoutes = [
  '/',
  '/influencers',
  '/influencers/:id',
  '/brands',
  '/brands/:id',
  '/campaigns',
  '/campaigns/:id',
  '/settings'
];

importantRoutes.forEach(route => {
  app.get(route, handlePluginRoute);
});

// Handle plugin routes function (original implementation kept for backward compatibility)
function handlePluginRoute(req, res, next) {
  try {
    console.log(`[App.js] Handling route via explicit registration: ${req.path}`);
    
    // Look for a plugin to handle the route
    const plugins = Array.isArray(activePlugins) ? activePlugins : [];
    
    if (plugins.length === 0) {
      console.warn('[App.js] No active plugins found');
      return next();
    }
    
    for (const plugin of plugins) {
      if (plugin.id === 'influencer-platform') {
        console.log(`[App.js] Found influencer-platform plugin, calling render for ${req.path}`);
        
        if (plugin.render) {
          return plugin.render(req, res, next);
        } else if (plugin.server && typeof plugin.server.render === 'function') {
          return plugin.server.render(req, res, next);
        }
      }
    }
    
    console.warn(`[App.js] No plugin found to handle route: ${req.path}`);
    next();
  } catch (error) {
    console.error('[App.js] Error handling plugin route:', error);
    next(error);
  }
}

// THEN register API routes after the plugin routes
// API routes

// Register all API routes under /api/v1 prefix

const apiRoutes = [
  users_api,
  auth_api,
  api_docs,
  ,blogs_api
  ,blogcategories_api
  ,categories_api
  ,pages_api
  ,posts_api
  ,postcategories_api
  ,postcomments_api
  ,postlikes_api
  ,referral_api
  ,users_api
  ,auth_api
  ,api_docs
  ,blogs_api
  ,blogcategories_api
  ,categories_api
  ,pages_api
  ,posts_api
  ,postcategories_api
  ,postcomments_api
  ,postlikes_api
  ,referral_api
  ,categories_api
  ,pages_api
  ,posts_api
  ,postcategories_api
  ,postcomments_api
  ,postlikes_api
  ,referral_api
  ,referral_api
  ,teammembers_api
  ,secretkeys_api
  ,publickeys_api
  ,blogpostcategories_api
  ,blogcontacts_api
  ,files_api
  ,pageviews_api
  ,sitesessions_api
  ,blogthemes_api
  ,roles_api
  ,blogpermissions_api
  ,permissions_api
  ,teammemberspermissions_api
  ,resourcepolicies_api
  ,console_api
]

const apiRoutesWithPrefix = apiRoutes.map(route => {
  if (!route) return null;
  const router = express.Router();
  router.use('/api/v1', route);
  return router;
}).filter(Boolean);

app.use('/', apiRoutesWithPrefix);

// Catch-all for unhandled API requests - should be AFTER the plugin route handler
app.use('/api/*', (req, res) => {
  res.status(404).json({
    code: 404,
    message: "API Endpoint not found, if this is unexpected please contact the developer."
  });
});

// Static files (must be AFTER all API routes)
app.use(express.static(path.join(__dirname, 'public')));

// Finally, catch-all for unhandled non-API requests - should serve index.html for SPA or show 404
app.use('*', (req, res) => {
  // Only get here if no plugin handled the route
  res.status(404).send(`
    <html>
      <head>
        <title>Page Not Found</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 50px; text-align: center; }
          h1 { font-size: 24px; margin-bottom: 20px; }
        </style>
      </head>
      <body>
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <p><a href="/">Go back to homepage</a></p>
      </body>
    </html>
  `);
});

// Add this after setting up all your routes but before the error handler
app.use((req, res, next) => {
  console.log(`Unhandled route: ${req.method} ${req.path}`);
  next();
});

// After initializing all plugins, log the registered routes
console.log('\nRegistered Express routes:');
app._router.stack.forEach(middleware => {
  if (middleware.route) { // It's a route
    console.log(`${Object.keys(middleware.route.methods).join(', ').toUpperCase()} ${middleware.route.path}`);
  } else if (middleware.name === 'router') { // It's a router
    middleware.handle.stack.forEach(handler => {
      if (handler.route) {
        console.log(`${Object.keys(handler.route.methods).join(', ').toUpperCase()} ${middleware.regexp} ${handler.route.path}`);
      }
    });
  }
});

// Move the catch-all route to the end
app.get("*", (req, res) =>
  res.status(404).json({
    code: 404,
    message:
      "API Endpoint not found, if this is unexpected please contact the developer.",
  })
);

// Error handler
app.use(errorHandler);

// Add a diagnostic route to check plugin routes
app.get('/debug/plugins/routes', (req, res) => {
  const plugins = pluginSystem.plugins;
  const routeInfo = {};
  
  for (const [pluginId, plugin] of Object.entries(plugins)) {
    if (plugin.routes) {
      routeInfo[pluginId] = {
        routes: typeof plugin.routes === 'function' ? plugin.routes() : plugin.routes,
        serverAvailable: !!plugin.server,
        componentAvailable: !!plugin.component,
        dataProviders: plugin.dataProviders ? Object.keys(plugin.dataProviders) : []
      };
    }
  }
  
  res.json({
    plugins: Object.keys(plugins),
    routes: routeInfo,
    currentUrl: req.protocol + '://' + req.get('host') + req.originalUrl,
    expressRoutes: app._router.stack
      .filter(r => r.route)
      .map(r => ({
        path: r.route.path,
        methods: Object.keys(r.route.methods)
      }))
  });
});

// Debug endpoint for data providers
app.get('/debug/plugins/data', (req, res) => {
  const plugins = pluginSystem.plugins;
  const dataInfo = {};
  
  for (const [pluginId, plugin] of Object.entries(plugins)) {
    if (plugin.dataProviders) {
      dataInfo[pluginId] = {
        providers: Object.keys(plugin.dataProviders),
        sampleData: {} // Don't execute providers here to avoid side effects
      };
    }
  }
  
  res.json({
    pluginsWithData: Object.keys(dataInfo),
    dataProviders: dataInfo
  });
});

// Debug endpoint for head tags
app.get('/debug/plugins/head-tags', (req, res) => {
  const plugins = pluginSystem.plugins;
  const headTagsInfo = {};
  
  for (const [pluginId, plugin] of Object.entries(plugins)) {
    headTagsInfo[pluginId] = {
      headTags: plugin.headTags ? (typeof plugin.headTags === 'function' ? plugin.headTags() : plugin.headTags) : [],
      resources: plugin.resources || {}
    };
  }
  
  res.json(headTagsInfo);
});

// Add this debug endpoint after initializing the plugin system
app.get('/debug/plugin-data/:pluginId/:provider', async (req, res) => {
  const { pluginId, provider } = req.params;
  
  try {
    // Find the plugin
    const plugin = pluginSystem.plugins.find(p => p.id === pluginId);
    
    if (!plugin) {
      return res.status(404).json({
        status: 'error',
        message: `Plugin '${pluginId}' not found`
      });
    }
    
    // Try to get the data provider
    if (!plugin.getDataProvider || typeof plugin.getDataProvider !== 'function') {
      return res.status(404).json({
        status: 'error',
        message: `Plugin '${pluginId}' does not have getDataProvider method`
      });
    }
    
    const dataProvider = plugin.getDataProvider(provider);
    
    if (!dataProvider || typeof dataProvider !== 'function') {
      return res.status(404).json({
        status: 'error',
        message: `Data provider '${provider}' not found in plugin '${pluginId}'`
      });
    }
    
    // Execute the data provider
    const data = await dataProvider(req);
    
    res.json({
      status: 'success',
      pluginId,
      provider,
      data
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: `Error fetching data: ${error.message}`
    });
  }
});

// Define port
const PORT = process.env.PORT || 3000;

// Start server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`- Web UI: http://localhost:${PORT}/`);
  console.log(`- API: http://localhost:${PORT}/api/v1/`);
  console.log(`- Plugins API: http://localhost:${PORT}/api/plugins`);
  console.log(`- Debug UI: http://localhost:${PORT}/debug/plugins/routes`);
  console.log(`Debug route list available at: http://localhost:${PORT}/debug/routes`);
  console.log(`Router debug page available at: http://localhost:${PORT}/debug/router`);
});

// Handle server errors
server.on('error', (error) => {
  console.error('Server error:', error);
});

// Export app for testing
module.exports = app;

setupVueRequireHook();

// Add this to your app.js file - before the final catch-all route handler

// Emergency route handler - catches all routes if the plugin system fails
app.use('/', (req, res, next) => {
  // Skip if it's an API request or static file
  if (req.path.startsWith('/api/') || req.path.startsWith('/js/') || 
      req.path.startsWith('/css/') || req.path.startsWith('/images/')) {
    return next();
  }
  
  // Get the template path
  const templatePath = path.join(__dirname, 'views/index.html');
  
  // Check if we already sent a response
  if (res.headersSent) {
    console.log('Headers already sent, skipping emergency handler');
    return next();
  }
  
  console.log(`[Emergency Handler] Handling route: ${req.path}`);
  
  // Read the template
  fs.readFile(templatePath, 'utf8', (err, template) => {
    if (err) {
      console.error('Error reading template:', err);
      return next(err);
    }
    
    // Prepare emergency app data based on the route
    let pageTitle = 'Influencer Platform';
    let initialData = {};
    
    // Set specific data based on route
    if (req.path === '/influencers') {
      pageTitle = 'Influencers | Influencer Platform';
      initialData = { page: 'influencers' };
    } else if (req.path === '/brands') {
      pageTitle = 'Brands | Influencer Platform';
      initialData = { page: 'brands' };
    } else if (req.path.startsWith('/influencers/')) {
      const id = req.path.split('/').pop();
      pageTitle = 'Influencer Details | Influencer Platform';
      initialData = { page: 'influencer-detail', id };
    } else if (req.path.startsWith('/brands/')) {
      const id = req.path.split('/').pop();
      pageTitle = 'Brand Details | Influencer Platform';
      initialData = { page: 'brand-detail', id };
    }
    
    // Create emergency serialized data
    const serializedData = `
      <script>
        window.EMERGENCY_RENDER = true;
        window.INITIAL_DATA = ${JSON.stringify(initialData)};
        window.ROUTE_PATH = "${req.path}";
      </script>
    `;
    
    // Add emergency scripts
    const emergencyScripts = `
      <script src="/js/emergency-nav.js"></script>
    `;
    
    // Update the template
    const updatedTemplate = template
      .replace('<title>Influencer Platform</title>', `<title>${pageTitle}</title>`)
      .replace('<!-- SERIALIZED_DATA -->', serializedData)
      .replace('<!-- CLIENT_BOOTSTRAP -->', `${emergencyScripts}
        <!-- CLIENT_BOOTSTRAP -->`);
    
    // Send the response
    res.send(updatedTemplate);
  });
});

// Emergency route handler (continued)
function handleEmergencyRoute(req, res, next) {
  try {
    console.log(`[App] Using emergency handler for route: ${req.path}`);
    
    // Read the HTML template
    const templatePath = path.join(__dirname, 'views/index.html');
    if (!fs.existsSync(templatePath)) {
      return res.status(500).send('Template file not found');
    }
    
    let template = fs.readFileSync(templatePath, 'utf8');
    
    // Prepare emergency HTML
    const emergencyHtml = `
      <div class="section">
        <div class="container">
          <div class="notification is-warning">
            <h3 class="title is-4">Application Error</h3>
            <p>The application encountered an error while rendering this page.</p>
            <p>Current path: ${req.path}</p>
            <div class="buttons mt-3">
              <button onclick="window.location.reload()" class="button is-primary">Reload Page</button>
              <a href="/" class="button is-info">Go to Home</a>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Prepare emergency data
    const routeData = {};
    
    // Customize emergency data based on route
    if (req.path.startsWith('/influencers')) {
      routeData.pageTitle = 'Influencers';
      if (req.path.includes('/influencers/')) {
        routeData.id = req.path.split('/').pop();
      }
    } else if (req.path.startsWith('/brands')) {
      routeData.pageTitle = 'Brands';
      if (req.path.includes('/brands/')) {
        routeData.id = req.path.split('/').pop();
      }
    } else if (req.path.startsWith('/campaigns')) {
      routeData.pageTitle = 'Campaigns';
      if (req.path.includes('/campaigns/')) {
        routeData.id = req.path.split('/').pop();
      }
    } else {
      routeData.pageTitle = 'Home';
    }
    
    // Prepare serialized data for emergency mode
    const serializedData = `
      <script>
        window.COMPONENT_DATA = {
          template: \`${emergencyHtml.replace(/`/g, '\\`')}\`,
          methods: {},
          computed: {}
        };
        window.INITIAL_DATA = ${JSON.stringify(routeData)};
        window.ROUTE_PARAMS = {};
        window.CURRENT_ROUTE = "${req.path}";
        window.PLUGIN_ID = "system";
        window.EMERGENCY_MODE = true;
      </script>
    `;
    
    // Replace placeholders in template
    template = template
      .replace('<!-- APP_HTML -->', emergencyHtml)
      .replace('<!-- HEAD_TAGS -->', '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">')
      .replace('<!-- SERIALIZED_DATA -->', serializedData)
      .replace('<!-- CLIENT_BOOTSTRAP -->', `
        <script src="/js/vue-client.js"></script>
        <script src="/js/debug-panel.js"></script>
        <script src="/js/emergency-nav.js"></script>
      `);
    
    // Send the response
    res.send(template);
  } catch (error) {
    console.error(`[App] Error in emergency handler:`, error);
    res.status(500).send('Critical error in application');
  }
}

// API 404 handler for unmatched API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: `API endpoint not found: ${req.originalUrl}`
  });
});

// 404 handler for unmatched routes
app.use((req, res) => {
  res.status(404).send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>404 - Page Not Found</title>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
    </head>
    <body>
      <section class="hero is-fullheight is-light">
        <div class="hero-body">
          <div class="container has-text-centered">
            <h1 class="title is-1">404</h1>
            <h2 class="subtitle">Page Not Found</h2>
            <p>The page you requested does not exist.</p>
            <div class="buttons is-centered mt-5">
              <a href="/" class="button is-primary">Go to Home</a>
              <button onclick="window.history.back()" class="button is-info">Go Back</button>
            </div>
          </div>
        </div>
      </section>
    </body>
    </html>
  `);
});

// Add this before your route handling middleware
app.get('/debug/routes', (req, res) => {
  if (!pluginSystem.initialized) {
    return res.json({
      status: 'error',
      message: 'Plugin system not initialized yet',
      plugins: []
    });
  }
  
  const pluginRoutes = [];
  
  pluginSystem.plugins.forEach(plugin => {
    if (!plugin.routes || typeof plugin.routes !== 'function') {
      return;
    }
    
    const routes = plugin.routes();
    if (!Array.isArray(routes)) {
      return;
    }
    
    pluginRoutes.push({
      plugin: plugin.id,
      enabled: true,
      routes: routes.map(r => ({
        path: r.path,
        component: r.component,
        dataProvider: r.dataProvider
      }))
    });
  });
  
  res.json({
    status: 'success',
    pluginCount: pluginSystem.plugins.length,
    plugins: pluginRoutes
  });
});

// Add this near the top of your app.js file after importing modules
console.log('App starting...');
console.log('__dirname:', __dirname);
console.log('Plugin system path:', require.resolve('./utils/plugin-system'));

// After creating the plugin system instance
console.log('Plugin system instance created:', !!pluginSystem);
console.log('Plugin system methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(pluginSystem)));

// Add this after initializing the plugin system

// Ensure required directories exist
(async () => {
  const dirs = [
    path.join(__dirname, 'views'),
    path.join(__dirname, 'public', 'js'),
    path.join(__dirname, 'bloggrs', 'influencer-platform', 'mock-data')
  ];
  
  for (const dir of dirs) {
    if (!fs.existsSync(dir)) {
      console.log(`Creating directory: ${dir}`);
      fs.mkdirSync(dir, { recursive: true });
    }
  }
})();
