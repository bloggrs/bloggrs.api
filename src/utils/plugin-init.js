const fs = require('fs');
const path = require('path');
const { initPluginDatabase, checkForSchemaChanges } = require('./plugin-db-manager');

/**
 * Initialize all plugins
 * @returns {Promise<void>}
 */
async function initializePlugins() {
  try {
    console.log('Initializing plugins...');
    
    const pluginsDir = path.join(__dirname, '..', 'bloggrs');
    
    // Skip if plugins directory doesn't exist
    if (!fs.existsSync(pluginsDir)) {
      console.log('No plugins directory found.');
      return;
    }
    
    const items = fs.readdirSync(pluginsDir, { withFileTypes: true });
    const pluginDirs = items.filter(item => 
      item.isDirectory() && item.name !== 'node_modules' && !item.name.startsWith('.')
    );
    
    console.log(`Found ${pluginDirs.length} potential plugins: ${pluginDirs.map(d => d.name).join(', ')}`);
    
    // Load and initialize each plugin
    for (const dir of pluginDirs) {
      const pluginId = dir.name;
      const pluginDir = path.join(pluginsDir, pluginId);
      const pluginJsonPath = path.join(pluginDir, 'plugin.json');
      
      // Skip if plugin.json doesn't exist
      if (!fs.existsSync(pluginJsonPath)) {
        console.log(`Skipping ${pluginId} - No plugin.json found`);
        continue;
      }
      
      try {
        // Read plugin.json
        const pluginConfig = JSON.parse(fs.readFileSync(pluginJsonPath, 'utf8'));
        
        // Skip disabled plugins
        if (pluginConfig.enabled === false) {
          console.log(`Plugin ${pluginConfig.name || pluginId} is disabled, skipping`);
          continue;
        }
        
        // Initialize plugin's database
        if (pluginConfig.database) {
          console.log(`Initializing database for plugin ${pluginId}...`);
          await initPluginDatabase(pluginId);
          
          // Check for schema changes after initialization
          // This is a double-check to ensure we haven't missed anything
          const needsMigration = await checkForSchemaChanges(pluginId);
          if (needsMigration) {
            console.warn(`Warning: Schema changes still needed for ${pluginId} after initialization`);
          }
        }
        
        console.log(`Plugin ${pluginConfig.name || pluginId} initialized`);
      } catch (error) {
        console.error(`Error initializing plugin ${pluginId}:`, error);
      }
    }
    
    console.log('All plugins initialized');
  } catch (error) {
    console.error('Error initializing plugins:', error);
  }
}

module.exports = {
  initializePlugins
}; 