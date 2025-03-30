const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const dotenv = require('dotenv');
const { exec } = require('child_process');
const util = require('util');
const mysql = require('mysql2/promise');

// Load environment variables
dotenv.config();

// Promisify exec
const execPromise = util.promisify(exec);

/**
 * Initialize a plugin's database
 * @param {string} pluginId - The plugin ID
 * @returns {Promise<boolean>} Success status
 */
async function initPluginDatabase(pluginId) {
  try {
    console.log(`Initializing database for plugin: ${pluginId}`);
    
    // Check if the plugin has a Prisma schema
    const pluginDir = path.join(__dirname, '..', 'bloggrs', pluginId);
    const schemaPath = path.join(pluginDir, 'prisma', 'schema.prisma');
    
    if (!fs.existsSync(schemaPath)) {
      console.log(`No Prisma schema found for plugin ${pluginId}, skipping database initialization`);
      return false;
    }
    
    // Load .env file
    const envPath = path.join(pluginDir, '.env');
    let pluginEnv = {};
    
    if (fs.existsSync(envPath)) {
      pluginEnv = dotenv.parse(fs.readFileSync(envPath));
      
      // Add env vars to process.env for this session
      Object.entries(pluginEnv).forEach(([key, value]) => {
        process.env[key] = value;
      });
    }
    
    // Get the database URL from the plugin's .env or create it
    let databaseUrl = pluginEnv.DATABASE_URL;
    
    if (!databaseUrl) {
      // Read main database URL from root .env
      const rootEnvPath = path.join(__dirname, '..', '..', '.env');
      const rootEnv = dotenv.parse(fs.readFileSync(rootEnvPath));
      const mainDbUrl = rootEnv.DATABASE_URL;
    
    if (!mainDbUrl) {
        throw new Error('DATABASE_URL not found in root .env file');
    }
    
      // Parse database URL
    const dbUrlParts = parseDatabaseUrl(mainDbUrl);
    
      // Create plugin database name
      const pluginDbName = `bloggrs_${pluginId.replace(/[-\.]/g, '_')}`;
      
      // Check if database exists and create if needed
      const dbExists = await checkIfDatabaseExists(
        dbUrlParts.host,
        dbUrlParts.port,
        dbUrlParts.user,
        dbUrlParts.password,
        pluginDbName
      );
      
      if (!dbExists) {
        console.log(`Creating database: ${pluginDbName}`);
        await createDatabase(
          dbUrlParts.host,
          dbUrlParts.port,
          dbUrlParts.user,
          dbUrlParts.password,
          pluginDbName
        );
      }
      
      // Generate the database URL
      databaseUrl = generateDatabaseUrl(
      dbUrlParts.protocol,
      dbUrlParts.user, 
      dbUrlParts.password, 
      dbUrlParts.host,
      dbUrlParts.port,
      pluginDbName
    );
    
      // Update the plugin's .env file
      updatePluginEnvFile(pluginId, databaseUrl);
      
      // Set environment variable
      process.env.DATABASE_URL = databaseUrl;
    }
    
    // Check if we need to run migrations
    const needsMigration = await checkForSchemaChanges(pluginId);
    
    if (needsMigration) {
      console.log(`Schema changes detected for plugin ${pluginId}, applying changes...`);
      
      // Choose migration strategy: use migrations or db push
      const pluginJsonPath = path.join(pluginDir, 'plugin.json');
      const useDbPush = fs.existsSync(pluginJsonPath) ? 
        JSON.parse(fs.readFileSync(pluginJsonPath)).database?.useDbPush : false;
      
      if (useDbPush) {
        // Use prisma db push (faster for development)
        await runDbPush(pluginId);
      } else {
        // Use structured migrations (better for production)
        await runMigrations(pluginId);
      }
    }
    
    // Generate Prisma client if needed
    await generatePrismaClient(pluginId);
    
    // Check if we need to seed the database
    const needsSeeding = await checkIfNeedsSeeding(pluginId);
    
    if (needsSeeding) {
      console.log(`Seeding database for plugin ${pluginId}...`);
      await runSeed(pluginId);
    }
    
    console.log(`Database initialization complete for plugin ${pluginId}`);
    return true;
  } catch (error) {
    console.error(`Error initializing database for plugin ${pluginId}:`, error);
    throw error;
  }
}

/**
 * Check if there are schema changes that need to be applied
 * @param {string} pluginId - Plugin ID
 * @returns {Promise<boolean>} True if changes detected
 */
async function checkForSchemaChanges(pluginId) {
  try {
    const pluginDir = path.join(__dirname, '..', 'bloggrs', pluginId);
    const schemaPath = path.join(pluginDir, 'prisma', 'schema.prisma');
    
    // Check if any migration is pending
    const command = `cd ${pluginDir} && npx prisma migrate status`;
    
    const { stdout } = await execPromise(command);
    
    // Look for "Database schema is up to date!" in the output
    if (stdout.includes('Database schema is up to date!')) {
      console.log(`Database schema for plugin ${pluginId} is up to date`);
      return false;
    }
    
    // Check if output mentions pending migrations or if schema differs
    if (stdout.includes('The following migration(s) are pending') || 
        stdout.includes('The current database schema is not in sync')) {
      console.log(`Database schema changes detected for plugin ${pluginId}`);
      return true;
    }
    
    // As a fallback, check if we have any .sql files in the migrations directory
    // that haven't been applied yet
    const migrationsDir = path.join(pluginDir, 'prisma', 'migrations');
    if (fs.existsSync(migrationsDir)) {
      const migrations = fs.readdirSync(migrationsDir);
      if (migrations.length > 0) {
        // Check if the _prisma_migrations table exists and if all migrations are applied
        try {
          const dbUrl = process.env.DATABASE_URL;
          const dbUrlParts = parseDatabaseUrl(dbUrl);
          
          const connection = await mysql.createConnection({
            host: dbUrlParts.host,
            port: dbUrlParts.port,
            user: dbUrlParts.user,
            password: dbUrlParts.password,
            database: dbUrlParts.database
          });
          
          // Check if _prisma_migrations table exists
          const [tables] = await connection.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = ? AND table_name = '_prisma_migrations'
          `, [dbUrlParts.database]);
          
          if (tables.length === 0) {
            // Table doesn't exist, so we need to run migrations
            await connection.end();
            return true;
          }
          
          // Get applied migrations
          const [appliedMigrations] = await connection.query(
            'SELECT migration_name FROM _prisma_migrations'
          );
          
          await connection.end();
          
          // Check if each migration directory is in the applied migrations
          for (const migrationDir of migrations) {
            if (migrationDir === 'migration_lock.toml') continue;
            
            const migrationApplied = appliedMigrations.some(
              m => m.migration_name === migrationDir
            );
            
            if (!migrationApplied) {
              console.log(`Migration ${migrationDir} not applied yet`);
              return true;
            }
          }
        } catch (error) {
          console.warn(`Error checking migrations table: ${error.message}`);
          // If we can't check the migrations table, assume we need to migrate
          return true;
        }
      }
    }
    
    return false;
  } catch (error) {
    console.error(`Error checking for schema changes for plugin ${pluginId}:`, error);
    // If we can't check, assume we need to update to be safe
    return true;
  }
}

/**
 * Run Prisma DB push to apply schema changes
 * @param {string} pluginId - Plugin ID
 * @returns {Promise<void>}
 */
async function runDbPush(pluginId) {
  try {
    const pluginDir = path.join(__dirname, '..', 'bloggrs', pluginId);
    
    // Run prisma db push
    console.log(`Running prisma db push for plugin ${pluginId}...`);
    const command = `cd ${pluginDir} && npx prisma db push --accept-data-loss`;
    
    const { stdout, stderr } = await execPromise(command);
    
    if (stderr && !stderr.includes('warn')) {
      throw new Error(`Error running prisma db push: ${stderr}`);
    }
    
    console.log(`Prisma db push completed for plugin ${pluginId}`);
    console.log(stdout);
  } catch (error) {
    console.error(`Error running db push for plugin ${pluginId}:`, error);
    throw error;
  }
}

/**
 * Run Prisma migrations
 * @param {string} pluginId - Plugin ID
 * @returns {Promise<void>}
 */
async function runMigrations(pluginId) {
  try {
    const pluginDir = path.join(__dirname, '..', 'bloggrs', pluginId);
    
    // Check if migrations directory exists
    const migrationsDir = path.join(pluginDir, 'prisma', 'migrations');
    const hasMigrations = fs.existsSync(migrationsDir) && 
      fs.readdirSync(migrationsDir).length > 0;
    
    if (hasMigrations) {
      // Run existing migrations
      console.log(`Running migrations for plugin ${pluginId}...`);
      const command = `cd ${pluginDir} && npx prisma migrate deploy`;
      
      const { stdout, stderr } = await execPromise(command);
      
      if (stderr && !stderr.includes('warn')) {
        throw new Error(`Error running migrations: ${stderr}`);
      }
      
      console.log(`Migrations completed for plugin ${pluginId}`);
      console.log(stdout);
    } else {
      // Create and run initial migration
      console.log(`Creating initial migration for plugin ${pluginId}...`);
      const command = `cd ${pluginDir} && npx prisma migrate dev --name init`;
      
      const { stdout, stderr } = await execPromise(command);
      
      if (stderr && !stderr.includes('warn')) {
        throw new Error(`Error creating migration: ${stderr}`);
      }
      
      console.log(`Initial migration created and applied for plugin ${pluginId}`);
      console.log(stdout);
    }
  } catch (error) {
    console.error(`Error running migrations for plugin ${pluginId}:`, error);
    throw error;
  }
}

/**
 * Generate Prisma client
 * @param {string} pluginId - Plugin ID
 * @returns {Promise<void>}
 */
async function generatePrismaClient(pluginId) {
  try {
    const pluginDir = path.join(__dirname, '..', 'bloggrs', pluginId);
    const generatedClientDir = path.join(pluginDir, 'generated', 'client');
    
    // Check if client already exists
    if (fs.existsSync(generatedClientDir)) {
      // Check if schema has changed since last generation
      const schemaPath = path.join(pluginDir, 'prisma', 'schema.prisma');
      const schemaModified = fs.statSync(schemaPath).mtime;
      
      const indexPath = path.join(generatedClientDir, 'index.js');
      if (fs.existsSync(indexPath)) {
        const clientModified = fs.statSync(indexPath).mtime;
        
        // If client is newer than schema, we don't need to regenerate
        if (clientModified > schemaModified) {
          console.log(`Prisma client is up to date for plugin ${pluginId}`);
          return;
        }
      }
    }
    
    // Generate Prisma client
    console.log(`Generating Prisma client for plugin ${pluginId}...`);
    const command = `cd ${pluginDir} && npx prisma generate`;
    
    const { stdout, stderr } = await execPromise(command);
    
    if (stderr && !stderr.includes('warn')) {
      throw new Error(`Error generating Prisma client: ${stderr}`);
    }
    
    console.log(`Prisma client generated for plugin ${pluginId}`);
  } catch (error) {
    console.error(`Error generating Prisma client for plugin ${pluginId}:`, error);
    throw error;
  }
}

/**
 * Check if the database needs seeding
 * @param {string} pluginId - Plugin ID
 * @returns {Promise<boolean>} True if seeding is needed
 */
async function checkIfNeedsSeeding(pluginId) {
  try {
    const pluginDir = path.join(__dirname, '..', 'bloggrs', pluginId);
    const pluginJsonPath = path.join(pluginDir, 'plugin.json');
    
    // Check if plugin.json specifies seeding
    if (fs.existsSync(pluginJsonPath)) {
      const pluginConfig = JSON.parse(fs.readFileSync(pluginJsonPath));
      
      if (pluginConfig.database?.seed) {
        // Check if database is empty
        const dbUrl = process.env.DATABASE_URL;
        const dbUrlParts = parseDatabaseUrl(dbUrl);
        
        const connection = await mysql.createConnection({
          host: dbUrlParts.host,
          port: dbUrlParts.port,
          user: dbUrlParts.user,
          password: dbUrlParts.password,
          database: dbUrlParts.database
        });
        
        // Check if any of the main tables exist and have data
        const mainTableNames = getMainTableNames(pluginId);
        
        for (const tableName of mainTableNames) {
          try {
            const [result] = await connection.query(`
              SELECT COUNT(*) as count FROM ${tableName} LIMIT 1
            `);
            
            if (result[0].count > 0) {
              console.log(`Table ${tableName} already has data, skipping seeding`);
              await connection.end();
              return false;
            }
          } catch (error) {
            // Table might not exist yet, which is fine
            console.log(`Table ${tableName} might not exist yet: ${error.message}`);
          }
        }
        
        await connection.end();
        return true;
      }
    }
    
    return false;
  } catch (error) {
    console.error(`Error checking if database needs seeding for plugin ${pluginId}:`, error);
    return false;
  }
}

/**
 * Get main table names from Prisma schema
 * @param {string} pluginId - Plugin ID
 * @returns {Array<string>} Array of table names
 */
function getMainTableNames(pluginId) {
  try {
    const pluginDir = path.join(__dirname, '..', 'bloggrs', pluginId);
    const schemaPath = path.join(pluginDir, 'prisma', 'schema.prisma');
    
    if (!fs.existsSync(schemaPath)) {
      return [];
    }
    
    const schema = fs.readFileSync(schemaPath, 'utf-8');
    const modelRegex = /model\s+(\w+)\s+{/g;
    const tableNames = [];
    let match;
    
    while ((match = modelRegex.exec(schema)) !== null) {
      tableNames.push(match[1]);
    }
    
    return tableNames;
  } catch (error) {
    console.error(`Error getting table names for plugin ${pluginId}:`, error);
    return [];
  }
}

/**
 * Run database seed
 * @param {string} pluginId - Plugin ID
 * @returns {Promise<void>}
 */
async function runSeed(pluginId) {
  try {
    const pluginDir = path.join(__dirname, '..', 'bloggrs', pluginId);
    const seedPath = path.join(pluginDir, 'prisma', 'seed.js');
    
    if (!fs.existsSync(seedPath)) {
      console.log(`No seed.js found for plugin ${pluginId}, skipping seeding`);
      return;
    }
    
    console.log(`Running seed script for plugin ${pluginId}...`);
    const command = `cd ${pluginDir} && node prisma/seed.js`;
    
    const { stdout, stderr } = await execPromise(command);
    
    if (stderr && !stderr.includes('warn')) {
      throw new Error(`Error running seed: ${stderr}`);
    }
    
    console.log(`Database seeded for plugin ${pluginId}`);
    console.log(stdout);
  } catch (error) {
    console.error(`Error seeding database for plugin ${pluginId}:`, error);
    throw error;
  }
}

/**
 * Parse a database URL into its components
 * @param {string} url - Database URL
 * @returns {Object} Parsed URL parts
 */
function parseDatabaseUrl(url) {
  const matches = url.match(/^(mysql|postgresql):\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)$/);
  
  if (!matches) {
    throw new Error(`Invalid database URL: ${url}`);
  }
  
  return {
    protocol: matches[1],
    user: matches[2],
    password: matches[3],
    host: matches[4],
    port: parseInt(matches[5], 10),
    database: matches[6]
  };
}

/**
 * Check if a database exists
 * @param {string} host - Database host
 * @param {number} port - Database port
 * @param {string} user - Database user
 * @param {string} password - Database password
 * @param {string} dbName - Database name
 * @returns {Promise<boolean>} True if database exists
 */
async function checkIfDatabaseExists(host, port, user, password, dbName) {
  try {
    // Connect to the database server
    const connection = await mysql.createConnection({
      host,
      port,
      user,
      password
    });
    
    // Check if database exists
    const [rows] = await connection.query(
      'SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?',
      [dbName]
    );
    
    await connection.end();
    
    return rows.length > 0;
  } catch (error) {
    console.error(`Error checking if database exists: ${error.message}`);
    return false;
  }
}

/**
 * Create a database
 * @param {string} host - Database host
 * @param {number} port - Database port
 * @param {string} user - Database user
 * @param {string} password - Database password
 * @param {string} dbName - Database name
 * @returns {Promise<void>}
 */
async function createDatabase(host, port, user, password, dbName) {
  try {
    // Connect to the database server
    const connection = await mysql.createConnection({
      host,
      port,
      user,
      password
    });
    
    // Create the database
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    
    await connection.end();
  } catch (error) {
    console.error(`Error creating database: ${error.message}`);
    throw error;
  }
}

/**
 * Generate a database URL
 * @param {string} protocol - Database protocol
 * @param {string} user - Database user
 * @param {string} password - Database password
 * @param {string} host - Database host
 * @param {number} port - Database port
 * @param {string} dbName - Database name
 * @returns {string} Database URL
 */
function generateDatabaseUrl(protocol, user, password, host, port, dbName) {
  return `${protocol}://${user}:${password}@${host}:${port}/${dbName}`;
}

/**
 * Update plugin's .env file with database URL
 * @param {string} pluginId - Plugin ID
 * @param {string} databaseUrl - Database URL
 */
function updatePluginEnvFile(pluginId, databaseUrl) {
  const pluginDir = path.join(__dirname, '..', 'bloggrs', pluginId);
  const envPath = path.join(pluginDir, '.env');
  
  let envContent = '';
  
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf-8');
    
    // Update existing DATABASE_URL
    if (envContent.includes('DATABASE_URL=')) {
      envContent = envContent.replace(
        /DATABASE_URL=.*/,
        `DATABASE_URL="${databaseUrl}"`
      );
    } else {
      // Add DATABASE_URL at the end
      envContent += `\nDATABASE_URL="${databaseUrl}"\n`;
    }
  } else {
    // Create new .env file
    envContent = `DATABASE_URL="${databaseUrl}"\n`;
  }
  
  // Write to .env file
  fs.writeFileSync(envPath, envContent);
  
  console.log(`Updated .env file for plugin ${pluginId} with DATABASE_URL`);
}

module.exports = {
  initPluginDatabase,
  checkForSchemaChanges,
  runDbPush,
  runMigrations,
  generatePrismaClient,
  checkIfNeedsSeeding,
  runSeed
};