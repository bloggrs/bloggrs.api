const { PrismaClient } = require('../generated/client');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

// Load environment variables from the plugin's .env file
const envPath = path.join(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
}

// Create Prisma client with transaction settings
const prisma = new PrismaClient({
  log: ['query', 'error', 'warn'],
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  },
  // Add transaction timeout settings
  transactionOptions: {
    maxWait: 5000, // 5s maximum wait
    timeout: 10000 // 10s transaction timeout
  }
});

// Log connection status
prisma.$connect()
  .then(() => console.log('Connected to database'))
  .catch(e => console.error('Failed to connect to database:', e));

module.exports = prisma; 