const { renderToString } = require('@vue/server-renderer');
const { createSSRApp } = require('vue');
const path = require('path');
const fs = require('fs');
const { compileVueFile } = require('../../utils/vue-compiler');

/**
 * Find the appropriate component for a route
 */
function findComponentForRoute(routePath, routes) {
  // Check for exact match
  const exactMatch = routes.find(route => route.path === routePath);
  if (exactMatch) {
    return {
      componentPath: exactMatch.component,
      dataProvider: exactMatch.dataProvider,
      params: {}
    };
  }
  
  // Check for dynamic routes
  for (const route of routes) {
    if (route.path.includes(':')) {
      const routeParts = route.path.split('/');
      const pathParts = routePath.split('/');
      
      if (routeParts.length === pathParts.length) {
        const params = {};
        let isMatch = true;
        
        for (let i = 0; i < routeParts.length; i++) {
          if (routeParts[i].startsWith(':')) {
            params[routeParts[i].substring(1)] = pathParts[i];
          } else if (routeParts[i] !== pathParts[i]) {
            isMatch = false;
            break;
          }
        }
        
        if (isMatch) {
          return {
            componentPath: route.component,
            dataProvider: route.dataProvider,
            params
          };
        }
      }
    }
  }
  
  return null;
}

/**
 * Render Vue component based on the route
 */
async function render(req, res, next) {
  try {
    console.log(`[SSR] Rendering route: ${req.path}`);
    
    const plugin = require('./index.js');
    const routes = plugin.routes();
    
    const routeMatch = findComponentForRoute(req.path, routes);
    if (!routeMatch) {
      console.log(`[SSR] No matching route found for ${req.path}`);
      return next();
    }
    
    const { componentPath, dataProvider, params } = routeMatch;
    
    // Find component file
    const fullComponentPath = path.join(__dirname, componentPath);
    if (!fs.existsSync(fullComponentPath)) {
      console.error(`[SSR] Component not found: ${fullComponentPath}`);
      return next();
    }
    
    // Compile component
    const compiledComponent = compileVueFile(fullComponentPath);
    if (!compiledComponent) {
      console.error(`[SSR] Failed to compile component: ${fullComponentPath}`);
      return next();
    }
    
    // Get initial data
    let initialData = {};
    if (dataProvider) {
      const provider = plugin.getDataProvider(dataProvider);
      if (provider) {
        initialData = await provider({ ...req, params });
      }
    }
    
    // Create Vue app
    const app = createSSRApp({
      template: compiledComponent.template,
      data() {
        return {
          ...compiledComponent.data ? compiledComponent.data() : {},
          ...initialData,
          routeParams: params
        };
      },
      methods: compiledComponent.methods || {},
      computed: compiledComponent.computed || {}
    });
    
    // Render to HTML
    const html = await renderToString(app);
    
    // Serialize data for client hydration
    const serializedData = `
      <script>
        window.INITIAL_DATA = ${JSON.stringify(initialData)};
        window.ROUTE_PARAMS = ${JSON.stringify(params)};
        window.CURRENT_ROUTE = ${JSON.stringify(req.path)};
      </script>
    `;
    
    // Read HTML template
    const templatePath = path.join(__dirname, '../../views/index.html');
    let template = fs.readFileSync(templatePath, 'utf8');
    
    // Replace placeholders
    template = template
      .replace('<!-- APP_HTML -->', html)
      .replace('<!-- HEAD_TAGS -->', plugin.headTags().join('\n'))
      .replace('<!-- SERIALIZED_DATA -->', serializedData);
    
    res.send(template);
  } catch (error) {
    console.error('[SSR] Error rendering component:', error);
    next(error);
  }
}

module.exports = {
  render
}; 