/**
 * Server-side rendering handler for the influencer platform plugin
 */
const { renderToString } = require('@vue/server-renderer');
const { createSSRApp } = require('vue');
const fs = require('fs');
const path = require('path');

// Get plugin configuration
const pluginJsonPath = path.join(__dirname, 'plugin.json');
const pluginConfig = JSON.parse(fs.readFileSync(pluginJsonPath, 'utf8'));

/**
 * Renders the influencer platform component for server-side rendering
 */
async function render(options = {}) {
  try {
    // Get the component
    const App = require('./App.vue');
    
    // Create the Vue SSR app
    const app = createSSRApp(App);
    
    // Render to HTML string
    const html = await renderToString(app);
    
    // Get the head tags from plugin.json
    const headTags = pluginConfig.headTags || [
      '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">',
      '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">'
    ];
    
    return {
      html,
      head: headTags.join('\n')
    };
  } catch (error) {
    console.error('Error rendering influencer platform:', error);
    throw error;
  }
}

// Direct HTML template for fallback/debugging
function generateCompleteHtml() {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>${pluginConfig.displayName || 'Instagram Influencer Platform'}</title>
      ${pluginConfig.headTags.join('\n      ')}
    </head>
    <body>
      <div id="app"><!-- App HTML will be inserted here --></div>
      <script src="/js/app.js"></script>
    </body>
    </html>
  `;
}

module.exports = {
  render,
  generateCompleteHtml
}; 