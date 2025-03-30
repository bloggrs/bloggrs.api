/**
 * Utility to ensure component data is always available for every plugin
 */
const fs = require('fs');
const path = require('path');

/**
 * Ensures a plugin has the necessary structure and components
 * @param {string} pluginId - Plugin ID
 */
function ensurePluginComponentData(pluginId) {
  const pluginDir = path.join(__dirname, '../bloggrs', pluginId);
  
  if (!fs.existsSync(pluginDir)) {
    console.error(`Plugin directory not found: ${pluginDir}`);
    return;
  }
  
  // Ensure the plugin has an App.vue file
  const appVuePath = path.join(pluginDir, 'App.vue');
  if (!fs.existsSync(appVuePath)) {
    console.log(`Creating default App.vue for plugin ${pluginId}`);
    createDefaultAppVue(appVuePath, pluginId);
  }
  
  // Ensure views directory exists
  const viewsDir = path.join(pluginDir, 'views');
  if (!fs.existsSync(viewsDir)) {
    console.log(`Creating views directory for plugin ${pluginId}`);
    fs.mkdirSync(viewsDir, { recursive: true });
  }
  
  console.log(`Plugin ${pluginId} component data verified`);
}

/**
 * Creates a default App.vue file
 * @param {string} filePath - Path to create the file
 * @param {string} pluginId - Plugin ID
 */
function createDefaultAppVue(filePath, pluginId) {
  const defaultContent = `
<template>
  <div>
    <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <strong>${pluginId}</strong>
        </a>
      </div>
      
      <div class="navbar-menu">
        <div class="navbar-start">
          <a href="/" class="navbar-item">Home</a>
        </div>
      </div>
    </nav>
    
    <section class="section">
      <div class="container">
        <h1 class="title">${pluginId} Plugin</h1>
        <p class="subtitle">Welcome to the ${pluginId} plugin</p>
        
        <div class="content">
          <p>This is a default component created to ensure the plugin works correctly.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pluginId: '${pluginId}'
    };
  },
  methods: {},
  mounted() {
    console.log('${pluginId} App component mounted');
  }
};
</script>
`;

  fs.writeFileSync(filePath, defaultContent);
}

module.exports = {
  ensurePluginComponentData
}; 