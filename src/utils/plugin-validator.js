const fs = require('fs');
const path = require('path');
const { compileVueFile } = require('./vue-compiler');

/**
 * Validates all Vue components in a plugin
 * @param {string} pluginId - The plugin ID
 * @returns {Promise<boolean>} Success status
 */
async function validatePluginComponents(pluginId) {
  try {
    const pluginDir = path.join(__dirname, '..', 'bloggrs', pluginId);
    const pluginJsonPath = path.join(pluginDir, 'plugin.json');
    
    if (!fs.existsSync(pluginJsonPath)) {
      console.log(`No plugin.json found for ${pluginId}. Skipping validation.`);
      return false;
    }
    
    const pluginConfig = require(pluginJsonPath);
    const routes = pluginConfig.routes || {};
    
    // Collect all .vue files from routes
    const vueFiles = [
      'App.vue', // Always check the main App.vue
      ...Object.values(routes)
    ];
    
    // Validate each Vue file
    for (const relativeFilePath of vueFiles) {
      const filePath = path.join(pluginDir, relativeFilePath);
      
      if (!fs.existsSync(filePath)) {
        console.warn(`Warning: Vue file not found: ${filePath}`);
        continue;
      }
      
      try {
        console.log(`Validating ${relativeFilePath}...`);
        compileVueFile(filePath);
        console.log(`✅ ${relativeFilePath} is valid`);
      } catch (error) {
        console.error(`❌ Error in Vue file ${relativeFilePath}:`, error.message);
        throw error;
      }
    }
    
    console.log(`All Vue components validated for plugin ${pluginId}`);
    return true;
  } catch (error) {
    console.error(`Error validating plugin ${pluginId} components:`, error);
    return false;
  }
}

module.exports = {
  validatePluginComponents
}; 