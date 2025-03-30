const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load main .env
dotenv.config();

// Load all plugin .env files
const pluginsDir = path.join(__dirname, 'src', 'bloggrs');
if (fs.existsSync(pluginsDir)) {
  const items = fs.readdirSync(pluginsDir, { withFileTypes: true });
  const pluginDirs = items.filter(item => 
    item.isDirectory() && item.name !== 'node_modules' && !item.name.startsWith('.')
  );
  
  pluginDirs.forEach(dir => {
    const pluginId = dir.name;
    const pluginEnvPath = path.join(pluginsDir, pluginId, '.env');
    
    if (fs.existsSync(pluginEnvPath)) {
      console.log(`Pre-loading environment variables from ${pluginId}/.env`);
      const pluginEnv = dotenv.parse(fs.readFileSync(pluginEnvPath));
      
      Object.keys(pluginEnv).forEach(key => {
        process.env[key] = pluginEnv[key];
      });
    }
  });
}

// Run the actual app
require('./src/app.js'); 