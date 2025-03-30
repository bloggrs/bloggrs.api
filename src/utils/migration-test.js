const fs = require('fs');
const path = require('path');
const { initPluginDatabase, checkForSchemaChanges, runDbPush, runMigrations } = require('./plugin-db-manager');

/**
 * Test migration for a specific plugin
 * @param {string} pluginId - Plugin ID
 */
async function testPluginMigration(pluginId) {
  try {
    console.log(`Testing migrations for plugin: ${pluginId}`);
    
    // Check if schema changes are needed
    const needsMigration = await checkForSchemaChanges(pluginId);
    
    if (needsMigration) {
      console.log(`Schema changes detected for plugin ${pluginId}`);
      
      // Get migration strategy
      const pluginDir = path.join(__dirname, '..', 'bloggrs', pluginId);
      const pluginJsonPath = path.join(pluginDir, 'plugin.json');
      
      const useDbPush = fs.existsSync(pluginJsonPath) ? 
        JSON.parse(fs.readFileSync(pluginJsonPath)).database?.useDbPush : false;
      
      if (useDbPush) {
        console.log(`Using prisma db push for plugin ${pluginId}`);
        await runDbPush(pluginId);
      } else {
        console.log(`Using structured migrations for plugin ${pluginId}`);
        await runMigrations(pluginId);
      }
      
      console.log(`Migration completed for plugin ${pluginId}`);
    } else {
      console.log(`No schema changes detected for plugin ${pluginId}`);
    }
  } catch (error) {
    console.error(`Error testing migration for plugin ${pluginId}:`, error);
  }
}

/**
 * Test migrations for all plugins
 */
async function testAllPluginMigrations() {
  try {
    const pluginsDir = path.join(__dirname, '..', 'bloggrs');
    
    const items = fs.readdirSync(pluginsDir, { withFileTypes: true });
    const pluginDirs = items.filter(item => 
      item.isDirectory() && item.name !== 'node_modules' && !item.name.startsWith('.')
    );
    
    for (const dir of pluginDirs) {
      await testPluginMigration(dir.name);
    }
    
    console.log('All plugin migrations tested');
  } catch (error) {
    console.error('Error testing plugin migrations:', error);
  }
}

// Export functions
module.exports = {
  testPluginMigration,
  testAllPluginMigrations
};

// Run if called directly
if (require.main === module) {
  const pluginId = process.argv[2];
  
  if (pluginId) {
    testPluginMigration(pluginId);
  } else {
    testAllPluginMigrations();
  }
} 