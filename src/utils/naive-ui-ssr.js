/**
 * Utility to help with Naive UI SSR
 */
const { createSSRApp } = require('vue');
const { renderToString } = require('@vue/server-renderer');
const { setupDevice } = require('@css-render/vue3-ssr');
const naive = require('naive-ui');

// Create a proper SSR app with Naive UI support
async function renderNaiveUIComponentToString(component) {
  const app = createSSRApp(component);
  
  // Register global Naive UI components if needed
  app.component('NLayout', naive.NLayout);
  app.component('NButton', naive.NButton);
  app.component('NConfigProvider', naive.NConfigProvider);
  
  // Render the app to string
  return await renderToString(app);
}

/**
 * Renders a Vue component with Naive UI SSR support
 * @param {Object} component The Vue component to render
 * @param {Object} props Props to pass to the component
 * @returns {Promise<{html: string, cssString: string}>}
 */
async function renderComponentWithNaiveUI(component, props = {}) {
  const app = createSSRApp(component, props);
  
  // Setup CSS-Render for SSR (without accessing document)
  const { collect } = setupDevice();
  
  let html = '';
  let cssString = '';
  
  try {
    // Render the component
    html = await renderToString(app);
    
    // Collect the CSS (safely for SSR)
    cssString = collect();
  } catch (error) {
    console.error('Error rendering with Naive UI:', error);
  }
  
  return { html, cssString };
}

module.exports = {
  renderNaiveUIComponentToString,
  renderComponentWithNaiveUI
}; 