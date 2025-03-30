/**
 * Load plugins from the plugins directory
 * @returns {Array} Array of loaded plugins
 */
function loadPlugins() {
  const pluginsDir = path.join(__dirname, '../bloggrs');
  console.log(`Scanning plugin directory: ${pluginsDir}`);
  
  if (!fs.existsSync(pluginsDir)) {
    console.error(`Plugins directory not found: ${pluginsDir}`);
    return [];
  }
  
  // Get all directories in plugins directory
  const pluginDirs = fs.readdirSync(pluginsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
    
  console.log(`Found ${pluginDirs.length} potential plugin directories: ${pluginDirs.join(', ')}`);
  
  const plugins = [];
  
  // Load each plugin
  for (const pluginDir of pluginDirs) {
    try {
      // Check if directory has an index.js file (plugin entry point)
      const pluginPath = path.join(pluginsDir, pluginDir);
      const indexPath = path.join(pluginPath, 'index.js');
      
      if (!fs.existsSync(indexPath)) {
        console.log(`Skipping ${pluginDir}: No index.js found`);
        continue;
      }
      
      // Check if plugin is enabled
      const configPath = path.join(pluginPath, 'plugin.json');
      if (fs.existsSync(configPath)) {
        const config = require(configPath);
        if (config.disabled) {
          console.log(`Plugin ${config.name || pluginDir} is disabled, skipping`);
          continue;
        }
      }
      
      // Try to require the plugin
      console.log(`Loading plugin: ${pluginDir}`);
      try {
        // First try clearing the require cache for this plugin
        // to ensure we get fresh code if it was modified
        delete require.cache[require.resolve(indexPath)];
        
        const plugin = require(indexPath);
        console.log(`Loading ${pluginDir} API routes`);
        
        // Validate that it's a proper plugin
        if (!plugin.id || !plugin.initialize) {
          console.error(`Invalid plugin format for ${pluginDir}: missing id or initialize method`);
          continue;
        }
        
        plugins.push(plugin);
      } catch (error) {
        console.error(`Error requiring plugin ${pluginDir}:`, error);
        // Try to log the problematic file
        if (error.stack) {
          const match = error.stack.match(/\(([^)]+)\)/);
          if (match && match[1]) {
            const file = match[1].split(':')[0];
            if (fs.existsSync(file)) {
              console.log(`Problematic file: ${file}`);
              const lines = fs.readFileSync(file, 'utf8').split('\n');
              if (error.lineNumber) {
                const lineNumber = parseInt(error.lineNumber);
                console.log(`Line ${lineNumber}: ${lines[lineNumber - 1]}`);
              } else {
                // Try to show a few lines of the file
                console.log("First few lines of the file:");
                console.log(lines.slice(0, 10).join('\n'));
              }
            }
          }
        }
      }
    } catch (error) {
      console.error(`Error loading plugin ${pluginDir}:`, error);
    }
  }
  
  return plugins;
} 