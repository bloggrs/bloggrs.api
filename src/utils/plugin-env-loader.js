const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

/**
 * Load environment variables from a plugin's .env file
 * @param {string} pluginId - The plugin ID
 * @returns {Object} The loaded environment variables
 */
function loadPluginEnv(pluginId) {
  const pluginEnvPath = path.join(__dirname, '..', 'bloggrs', pluginId, '.env');
  
  try {
    // Check if the plugin has an .env file
    if (fs.existsSync(pluginEnvPath)) {
      // Parse the plugin's .env file
      const pluginEnv = dotenv.parse(fs.readFileSync(pluginEnvPath));
      
      // Add these variables to the current process.env
      // This is important for any code that directly accesses process.env
      Object.keys(pluginEnv).forEach(key => {
        process.env[key] = pluginEnv[key];
      });
      
      return pluginEnv;
    }
    
    console.log(`No .env file found for plugin ${pluginId}`);
    return {};
  } catch (error) {
    console.error(`Error loading .env for plugin ${pluginId}:`, error);
    return {};
  }
}

module.exports = {
  loadPluginEnv
}; 