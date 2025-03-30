#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { program } = require('commander');
const { 
  initPluginDatabase, 
  checkForSchemaChanges, 
  runDbPush, 
  runMigrations, 
  generatePrismaClient, 
  checkIfNeedsSeeding,
  runSeed
} = require('../utils/plugin-db-manager');

program
  .name('manage-plugin-db')
  .description('Manage plugin databases')
  .version('1.0.0');

program
  .command('init <pluginId>')
  .description('Initialize database for a plugin')
  .action(async (pluginId) => {
    try {
      console.log(`Initializing database for plugin ${pluginId}...`);
      await initPluginDatabase(pluginId);
      console.log('Done');
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  });

program
  .command('check-changes <pluginId>')
  .description('Check if there are schema changes for a plugin')
  .action(async (pluginId) => {
    try {
      const needsMigration = await checkForSchemaChanges(pluginId);
      console.log(needsMigration 
        ? `Schema changes detected for plugin ${pluginId}` 
        : `No schema changes detected for plugin ${pluginId}`);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  });

program
  .command('apply-changes <pluginId>')
  .description('Apply schema changes for a plugin')
  .option('--push', 'Use db push instead of migrations')
  .action(async (pluginId, options) => {
    try {
      const needsMigration = await checkForSchemaChanges(pluginId);
      
      if (!needsMigration) {
        console.log(`No schema changes detected for plugin ${pluginId}`);
        return;
      }
      
      console.log(`Applying schema changes for plugin ${pluginId}...`);
      
      if (options.push) {
        await runDbPush(pluginId);
      } else {
        await runMigrations(pluginId);
      }
      
      console.log('Schema changes applied');
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  });

program
  .command('generate-client <pluginId>')
  .description('Generate Prisma client for a plugin')
  .action(async (pluginId) => {
    try {
      console.log(`Generating Prisma client for plugin ${pluginId}...`);
      await generatePrismaClient(pluginId);
      console.log('Prisma client generated');
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  });

program
  .command('seed <pluginId>')
  .description('Seed database for a plugin')
  .option('--force', 'Force seeding even if database already has data')
  .action(async (pluginId, options) => {
    try {
      if (!options.force) {
        const needsSeeding = await checkIfNeedsSeeding(pluginId);
        
        if (!needsSeeding) {
          console.log(`Database for plugin ${pluginId} already has data, skipping seeding`);
          return;
        }
      }
      
      console.log(`Seeding database for plugin ${pluginId}...`);
      await runSeed(pluginId);
      console.log('Database seeded');
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  });

program
  .command('all <pluginId>')
  .description('Run all database operations for a plugin')
  .option('--push', 'Use db push instead of migrations')
  .option('--force-seed', 'Force seeding even if database already has data')
  .action(async (pluginId, options) => {
    try {
      console.log(`Running all database operations for plugin ${pluginId}...`);
      
      // Initialize database
      await initPluginDatabase(pluginId);
      
      // Check for schema changes
      const needsMigration = await checkForSchemaChanges(pluginId);
      
      if (needsMigration) {
        console.log(`Applying schema changes...`);
        
        if (options.push) {
          await runDbPush(pluginId);
        } else {
          await runMigrations(pluginId);
        }
      }
      
      // Generate Prisma client
      await generatePrismaClient(pluginId);
      
      // Seed database if needed or forced
      if (options.forceSeed || await checkIfNeedsSeeding(pluginId)) {
        console.log(`Seeding database...`);
        await runSeed(pluginId);
      }
      
      console.log('All database operations completed');
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  });

program.parse(); 