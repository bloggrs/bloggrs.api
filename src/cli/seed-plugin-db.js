#!/usr/bin/env node

const path = require('path');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

// Get plugin ID from command line arguments
const pluginId = process.argv[2];

if (!pluginId) {
  console.error('Please provide a plugin ID');
  process.exit(1);
}

async function runSeed() {
  try {
    const pluginDir = path.join(__dirname, '..', 'bloggrs', pluginId);
    const seedPath = path.join(pluginDir, 'prisma', 'seed.js');
    
    console.log(`Running seed script for plugin ${pluginId}...`);
    
    // Execute the seed script
    const { stdout, stderr } = await execPromise(`node ${seedPath}`);
    
    if (stderr) {
      console.error(`Error output: ${stderr}`);
    }
    
    console.log(stdout);
    console.log(`Seed completed for plugin ${pluginId}`);
  } catch (error) {
    console.error('Error running seed:', error);
    process.exit(1);
  }
}

runSeed(); 