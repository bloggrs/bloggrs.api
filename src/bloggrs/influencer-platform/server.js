/**
 * Server-side rendering handler for the influencer platform plugin
 */
const { renderToString } = require('@vue/server-renderer');
const { createSSRApp } = require('vue');
const path = require('path');
const fs = require('fs');
const { compileVueFile } = require('../../utils/vue-compiler');

/**
 * Find the appropriate component for a route
 * @param {string} routePath - The current route path
 * @param {Object} routes - Route definitions from plugin.json
 * @returns {Object} The component path and extracted params
 */
function findComponentForRoute(routePath, routes) {
  // Check for exact match
  if (routes[routePath]) {
    return {
      componentPath: routes[routePath],
      params: {}
    };
  }
  
  // Check for dynamic routes
  for (const [route, component] of Object.entries(routes)) {
    if (route.includes(':')) {
      const paramNames = [];
      
      // Convert route pattern to regex
      const regexParts = route.split('/').map(part => {
        if (part.startsWith(':')) {
          paramNames.push(part.substring(1));
          return '([^/]+)';
        }
        return part;
      });
      
      const regexPattern = regexParts.join('/');
      const regex = new RegExp(`^${regexPattern}$`);
      const match = routePath.match(regex);
      
      if (match) {
        // Extract params
        const params = {};
        paramNames.forEach((name, index) => {
          params[name] = match[index + 1];
        });
        
        return {
          componentPath: component,
          params
        };
      }
    }
  }
  
  // Default to App.vue if no match
  return {
    componentPath: 'App.vue',
    params: {}
  };
}

/**
 * Render Vue component based on the route
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
async function render(req, res, next) {
  try {
    console.log(`[SSR] Rendering route: ${req.path}`);

    // Map routes to components - Update these paths to match your actual directory structure
    const routes = [
      { path: '/', component: 'App.vue' },
      { path: '/influencers', component: 'views/influencers/InfluencerList.vue' },
      { path: '/influencers/:id', component: 'views/influencers/InfluencerDetail.vue' },
      { path: '/brands', component: 'views/brands/BrandList.vue' },
      { path: '/brands/:id', component: 'views/brands/BrandDetail.vue' },
      { path: '/campaigns', component: 'views/campaigns/CampaignList.vue' },
      { path: '/campaigns/:id', component: 'views/campaigns/CampaignDetail.vue' },
      { path: '/settings', component: 'views/settings/Settings.vue' }
    ];

    // For debugging, log all files in the plugin directory
    console.log('[SSR] Listing directories:');
    listDirectory(__dirname);

    // Find matching route
    let matchedRoute = null;
    let routeParams = {};

    // First check for exact match
    matchedRoute = routes.find(route => route.path === req.path);
    
    // If no exact match, check for parameterized routes
    if (!matchedRoute) {
      for (const route of routes) {
        if (route.path.includes(':')) {
          const routeParts = route.path.split('/').filter(Boolean);
          const pathParts = req.path.split('/').filter(Boolean);
          
          if (routeParts.length === pathParts.length) {
            let isMatch = true;
            const params = {};
            
            for (let i = 0; i < routeParts.length; i++) {
              if (routeParts[i].startsWith(':')) {
                // This is a parameter
                const paramName = routeParts[i].substring(1);
                params[paramName] = pathParts[i];
              } else if (routeParts[i] !== pathParts[i]) {
                // Static part doesn't match
                isMatch = false;
                break;
              }
            }
            
            if (isMatch) {
              matchedRoute = route;
              routeParams = params;
              console.log(`[SSR] Matched parameterized route: ${route.path}`);
              console.log(`[SSR] Route params:`, routeParams);
              break;
            }
          }
        }
      }
    }

    if (!matchedRoute) {
      console.log(`[SSR] No matching route found for ${req.path}`);
      return next(); // Let Express handle 404
    }

    console.log(`[SSR] Matched route: ${matchedRoute.path} -> ${matchedRoute.component}`);

    // Check for available components in different locations
    const potentialPaths = [
      path.join(__dirname, matchedRoute.component),                        // Direct path
      path.join(__dirname, matchedRoute.component.replace('views/', '')),  // Without views/ prefix
    ];
    
    // Find the first existing component path
    let componentPath = null;
    for (const p of potentialPaths) {
      console.log(`[SSR] Checking for component at: ${p}`);
      if (fs.existsSync(p)) {
        componentPath = p;
        console.log(`[SSR] Found component at: ${componentPath}`);
        break;
      }
    }
    
    // If no component found, try App.vue as fallback
    if (!componentPath) {
      console.error(`[SSR] Component not found at any of the checked paths`);
      console.log(`[SSR] Trying fallback component: App.vue`);
      
      const fallbackPath = path.join(__dirname, 'App.vue');
      if (fs.existsSync(fallbackPath)) {
        componentPath = fallbackPath;
        console.log(`[SSR] Using fallback component: ${componentPath}`);
      } else {
        // Create an error component
        console.error(`[SSR] Fallback component not found, using error component`);
        return renderErrorComponent(res, `Component not found for route: ${req.path}`);
      }
    }
    
    // Compile the Vue component
    const compiledComponent = compileVueFile(componentPath);
    
    if (!compiledComponent) {
      console.error(`[SSR] Failed to compile component: ${componentPath}`);
      return renderErrorComponent(res, `Failed to compile component for route: ${req.path}`);
    }

    // Create Vue SSR app
    const app = createSSRApp({
      template: compiledComponent.template || '<div>Error: No template found</div>',
      data() {
        return {
          ...compiledComponent.data ? compiledComponent.data() : {},
          routeParams: routeParams
        };
      },
      methods: compiledComponent.methods || {},
      computed: compiledComponent.computed || {}
    });

    // Render component to HTML
    const html = await renderToString(app);
    console.log(`[SSR] Rendered HTML length: ${html.length} characters`);

    // Serialize component data for client hydration
    const serializedData = `
      <script>
        window.COMPONENT_DATA = ${JSON.stringify(compiledComponent)};
        window.ROUTE_PARAMS = ${JSON.stringify(routeParams)};
        window.CURRENT_ROUTE = ${JSON.stringify(matchedRoute.path)};
      </script>
    `;

    // Add client bootstrap script
    const clientBootstrap = '<script src="/js/vue-client.js"></script>';
    const debugPanel = '<script src="/js/debug-panel.js"></script>';

    // Read HTML template
    const templatePath = path.join(__dirname, '../../views/index.html');
    if (!fs.existsSync(templatePath)) {
      console.error(`[SSR] Template file not found: ${templatePath}`);
      return renderErrorComponent(res, `Template file not found: ${templatePath}`);
    }
    
    let template = fs.readFileSync(templatePath, 'utf8');

    // Replace placeholders in template
    template = template
      .replace('<!-- APP_HTML -->', html)
      .replace('<!-- HEAD_TAGS -->', compiledComponent.headTags || '')
      .replace('<!-- SERIALIZED_DATA -->', serializedData)
      .replace('<!-- CLIENT_BOOTSTRAP -->', clientBootstrap + debugPanel);

    // Send the complete HTML
    res.send(template);

    // In the render function, add this debugging code
    console.log('Component paths being checked:');
    console.log(`Direct path: ${path.join(__dirname, matchedRoute.component)}`);
    console.log(`Alternative path: ${path.join(__dirname, matchedRoute.component.replace('views/', ''))}`);

    // Check if the file exists before trying to compile it
    if (!fs.existsSync(path.join(__dirname, matchedRoute.component))) {
      console.error(`Component file not found: ${path.join(__dirname, matchedRoute.component)}`);
      // Try alternative paths or use a fallback
    }
  } catch (error) {
    console.error('[SSR] Error rendering Vue component:', error);
    return renderErrorComponent(res, `Server error: ${error.message}`);
  }
}

/**
 * Render an error component
 * @param {Object} res - Express response object
 * @param {string} errorMessage - Error message to display
 */
function renderErrorComponent(res, errorMessage) {
  const template = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Error - Bloggrs Platform</title>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
    </head>
    <body>
      <div class="section">
        <div class="container">
          <div class="notification is-danger">
            <h1 class="title">Error</h1>
            <p>${errorMessage}</p>
            <div class="buttons mt-4">
              <button class="button is-primary" onclick="window.location.reload()">Reload Page</button>
              <a href="/" class="button is-info">Go to Home</a>
            </div>
          </div>
        </div>
      </div>
      
      <script src="/js/debug-panel.js"></script>
    </body>
    </html>
  `;
  
  res.status(500).send(template);
}

/**
 * List directories and files for debugging
 * @param {string} dir - Directory to list
 * @param {number} depth - Current depth level
 */
function listDirectory(dir, depth = 0) {
  try {
    const files = fs.readdirSync(dir);
    const indent = ' '.repeat(depth * 2);
    
    console.log(`${indent}Directory ${dir}:`);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stats = fs.statSync(filePath);
      
      if (stats.isDirectory() && depth < 2) {
        console.log(`${indent}${file}/`);
        listDirectory(filePath, depth + 1);
      } else {
        console.log(`${indent}${file}`);
      }
    });
  } catch (err) {
    console.error(`Error listing directory ${dir}:`, err);
  }
}

/**
 * Initialize the server-side functionality
 */
function init() {
  console.log('Initializing influencer platform server-side rendering');
  
  // Any additional server-side initialization can be done here
  // For example, setting up server-side data fetching, caching, etc.
}

module.exports = {
  render,
  init
}; 