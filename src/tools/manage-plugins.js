/**
 * Plugin Management Tool
 * Simple script to enable/disable plugins
 * 
 * Usage:
 *   node src/tools/manage-plugins.js list
 *   node src/tools/manage-plugins.js enable <plugin-id>
 *   node src/tools/manage-plugins.js disable <plugin-id>
 */

const fs = require('fs');
const path = require('path');

const BLOGGRS_DIR = path.join(__dirname, '..', 'bloggrs');

function listPlugins() {
  const dirs = fs.readdirSync(BLOGGRS_DIR);
  
  const plugins = [];
  for (const dir of dirs) {
    if (dir === 'index.js') continue;
    
    const fullPath = path.join(BLOGGRS_DIR, dir);
    const stats = fs.statSync(fullPath);
    
    if (stats.isDirectory()) {
      const configPath = path.join(fullPath, 'plugin.json');
      if (fs.existsSync(configPath)) {
        const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
        plugins.push({
          id: config.id,
          name: config.name,
          version: config.version,
          enabled: config.enabled,
          path: fullPath
        });
      }
    }
  }
  
  return plugins;
}

function togglePlugin(pluginId, enable) {
  const plugins = listPlugins();
  const plugin = plugins.find(p => p.id === pluginId);
  
  if (!plugin) {
    console.error(`Plugin '${pluginId}' not found.`);
    return false;
  }
  
  const configPath = path.join(plugin.path, 'plugin.json');
  const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  
  config.enabled = enable;
  
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  console.log(`Plugin '${config.name}' (${pluginId}) ${enable ? 'enabled' : 'disabled'}.`);
  return true;
}

function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  
  if (!command) {
    console.log('Usage:');
    console.log('  node src/tools/manage-plugins.js list');
    console.log('  node src/tools/manage-plugins.js enable <plugin-id>');
    console.log('  node src/tools/manage-plugins.js disable <plugin-id>');
    return;
  }
  
  if (command === 'list') {
    const plugins = listPlugins();
    console.log('\nAvailable Plugins:');
    console.log('------------------');
    for (const plugin of plugins) {
      console.log(`${plugin.id} (${plugin.version}) - ${plugin.name} [${plugin.enabled ? 'ENABLED' : 'DISABLED'}]`);
    }
    console.log('');
    return;
  }
  
  if (command === 'enable' || command === 'disable') {
    const pluginId = args[1];
    if (!pluginId) {
      console.error(`Error: Missing plugin ID.`);
      return;
    }
    
    togglePlugin(pluginId, command === 'enable');
    return;
  }
  
  console.error(`Unknown command: ${command}`);
}

main(); 