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
const pluginSystem = require('./bloggrs');

// Initialize plugins
const activePlugins = pluginSystem.initPlugins();
console.log(`Loaded ${activePlugins.size} active plugins`);

// API routes
app.use(authenticateUser);
app.use(addPermissionContext);

const PATHNAME_PREFIX = "/api/v1";
docs_collector.generateSwaggerDocument();
app.use(PATHNAME_PREFIX, api_docs);
app.use(PATHNAME_PREFIX, auth_api);
app.use(PATHNAME_PREFIX, users_api);
app.use(PATHNAME_PREFIX, blogs_api);
app.use(PATHNAME_PREFIX, blogcontacts_api);
app.use(PATHNAME_PREFIX, blogthemes_api);
app.use(PATHNAME_PREFIX, blogcategories_api);
app.use(PATHNAME_PREFIX, categories_api);
app.use(PATHNAME_PREFIX, pages_api);
app.use(PATHNAME_PREFIX, posts_api);
app.use(PATHNAME_PREFIX, postcategories_api);
app.use(PATHNAME_PREFIX, postcomments_api);
app.use(PATHNAME_PREFIX, postlikes_api);
app.use(PATHNAME_PREFIX, referral_api);
app.use(PATHNAME_PREFIX, teammembers_api);
app.use(PATHNAME_PREFIX, secretkeys_api);
app.use(PATHNAME_PREFIX, publickeys_api);
app.use(PATHNAME_PREFIX, blogpostcategories_api);
app.use(PATHNAME_PREFIX, files_api);
app.use(PATHNAME_PREFIX, pageviews_api);
app.use(PATHNAME_PREFIX, sitesessions_api);
app.use(PATHNAME_PREFIX, roles_api);
app.use(PATHNAME_PREFIX, blogpermissions_api);
app.use(PATHNAME_PREFIX, permissions_api);
app.use(PATHNAME_PREFIX, teammemberspermissions_api);
app.use(PATHNAME_PREFIX, resourcepolicies_api);
app.use(PATHNAME_PREFIX, console_api);

// Plugin API routes
app.get('/api/plugins', (req, res) => {
  const plugins = pluginSystem.getActivePlugins().map(plugin => ({
    id: plugin.id,
    name: plugin.name,
    version: plugin.version,
    description: plugin.description,
    enabled: plugin.enabled,
    routes: Object.keys(plugin.routes || {})
  }));
  
  res.json(plugins);
});

// SSR middleware with plugin support
app.use(async (req, res, next) => {
  // Skip API routes
  if (req.path.startsWith('/api/')) {
    return next();
  }
  
  try {
    // Read the HTML template
    const templatePath = path.join(__dirname, 'views/index.html');
    if (!fs.existsSync(templatePath)) {
      throw new Error(`Template file not found: ${templatePath}`);
    }
    const template = fs.readFileSync(templatePath, 'utf-8');
    
    // Check if a plugin handles this route
    const pluginMatch = pluginSystem.getPluginForRoute(req.path);
    
    // Determine which render function to use
    let appHtml = '';
    let cssHtml = '';
    let pluginInUse = null;
    
    if (pluginMatch && pluginMatch.plugin.override) {
      // Use the plugin's component
      try {
        console.log(`Using plugin ${pluginMatch.plugin.id} for route ${req.path}`);
        
        // Load Vue SSR modules
        const { createSSRApp } = require('vue');
        const { renderToString } = require('vue/server-renderer');
        
        // Ensure component is properly loaded
        const component = pluginMatch.component;
        if (!component) {
          throw new Error('Plugin component not found or invalid');
        }
        
        // Create app with the plugin's component
        const app = createSSRApp(component);
        
        // Render to string
        appHtml = await renderToString(app);
        cssHtml = pluginMatch.styles || '';
        
        pluginInUse = pluginMatch.plugin.id;
        console.log('Plugin SSR completed successfully');
      } catch (err) {
        console.error(`Failed to render plugin component for ${req.path}:`, err);
        // Fall back to default renderer
      }
    }
    
    // If no plugin component was rendered, use the default renderer
    if (!appHtml) {
      try {
        const serverEntry = require('./vue/entry-server.js');
        const result = await serverEntry.render(req.originalUrl);
        appHtml = result.appHtml;
        cssHtml = result.cssHtml;
      } catch (err) {
        console.error('Failed to load default Vue SSR renderer:', err);
        throw new Error('Vue SSR renderer failed to load');
      }
    }
    
    // Add plugin info to the HTML
    let pluginInfo = '';
    if (pluginInUse) {
      pluginInfo = `<script>window.__activePlugin = "${pluginInUse}";</script>`;
    }
    
    // Inject rendered content into the template
    const html = template
      .replace('<!--ssr-outlet-->', appHtml)
      .replace('<!--css-outlet-->', cssHtml ? `<style>${cssHtml}</style>` : '')
      .replace('<!--plugin-info-->', pluginInfo);
    
    // Send the response
    return res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
  } catch (error) {
    console.error('SSR Error:', error);
    return res.status(500).send(`
      <h1>Server Error</h1>
      <p>${error.message}</p>
      <pre>${error.stack}</pre>
    `);
  }
});

// Update your route handler
app.get('/', async (req, res) => {
  try {
    const nativeUiPlugin = await PluginManager.getPlugin('nativeui-blog');
    
    if (nativeUiPlugin && nativeUiPlugin.component) {
      // Use the Naive UI SSR utility to render
      const { html, cssString } = await renderComponentWithNaiveUI(nativeUiPlugin.component);
      
      // Send the response with the collected CSS
      return res.send(`
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>Blog - Naive UI</title>
          <style>${cssString}</style>
        </head>
        <body>
          <div id="app">${html}</div>
          <script src="/js/app.js"></script>
        </body>
        </html>
      `);
    }
    
    // Fallback to standard rendering if plugin not found
    // ... your existing fallback code ...
  } catch (error) {
    console.error('Error rendering plugin:', error);
    res.status(500).send('Error rendering the page');
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

// Define port
const PORT = process.env.PORT || 3000;

// Start server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`- Web UI: http://localhost:${PORT}/`);
  console.log(`- API: http://localhost:${PORT}/api/v1/`);
  console.log(`- Plugins API: http://localhost:${PORT}/api/plugins`);
});

module.exports = app;
