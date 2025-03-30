const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

// Import data access layers
const influencerData = require('./data/influencers');
const brandData = require('./data/brands');
const campaignData = require('./data/campaigns');

// Initialize Prisma client
const prisma = new PrismaClient();

// Middleware to handle errors
const asyncHandler = fn => (req, res, next) => 
  Promise.resolve(fn(req, res, next)).catch(next);

// Add this to the top of your API routes file
console.log('Loading influencer-platform API routes');

// Mock data for development
const mockInfluencers = [
  {
    id: '1',
    name: 'Alex Morgan',
    handle: 'alexstyle',
    image: 'https://via.placeholder.com/400x300?text=AlexMorgan',
    bio: 'Fashion enthusiast sharing daily outfit inspiration.',
    category: 'Fashion & Style',
    followers: 850000,
    engagementRate: 3.2,
    verified: true
  },
  {
    id: '2',
    name: 'Jamie Lee',
    handle: 'jamiebeauty',
    image: 'https://via.placeholder.com/400x300?text=JamieLee',
    bio: 'Beauty guru with a passion for skincare and makeup tips.',
    category: 'Beauty & Makeup',
    followers: 1200000,
    engagementRate: 4.5,
    verified: true
  },
  {
    id: '3',
    name: 'Mike Fitness',
    handle: 'mikefitpro',
    image: 'https://via.placeholder.com/400x300?text=MikeFitness',
    bio: 'Personal trainer sharing workout routines and nutrition advice.',
    category: 'Fitness',
    followers: 750000,
    engagementRate: 5.1,
    verified: false
  }
];

/*
 * Influencer Routes
 */

// Get all influencers
router.get('/influencers', (req, res) => {
  console.log('GET /influencers endpoint called');
  // Return mock data for now
  res.json(mockInfluencers);
});

// Get influencer by ID
router.get('/influencers/:id', (req, res) => {
  const { id } = req.params;
  console.log(`GET /influencers/${id} endpoint called`);
  
  const influencer = mockInfluencers.find(i => i.id === id);
  
  if (!influencer) {
    return res.status(404).json({ 
      error: 'Influencer not found',
      message: `No influencer found with ID: ${id}`
    });
  }
  
  res.json(influencer);
});

// Get influencer by handle
router.get('/influencers/handle/:handle', asyncHandler(async (req, res) => {
  const influencer = await influencerData.getInfluencerByHandle(req.params.handle);
  
  if (!influencer) {
    return res.status(404).json({
      message: `Influencer with handle ${req.params.handle} not found`
    });
  }
  
  res.json(influencer);
}));

// Create a new influencer
router.post('/influencers', asyncHandler(async (req, res) => {
  const newInfluencer = await influencerData.createInfluencer(req.body);
  res.status(201).json(newInfluencer);
}));

// Update an influencer
router.put('/influencers/:id', asyncHandler(async (req, res) => {
  const influencer = await influencerData.getInfluencerById(req.params.id);
  
  if (!influencer) {
    return res.status(404).json({
      message: 'Influencer not found'
    });
  }
  
  const updatedInfluencer = await influencerData.updateInfluencer(req.params.id, req.body);
  res.json(updatedInfluencer);
}));

// Delete an influencer
router.delete('/influencers/:id', asyncHandler(async (req, res) => {
  const success = await influencerData.deleteInfluencer(req.params.id);
  
  if (!success) {
    return res.status(404).json({
      message: 'Influencer not found'
    });
  }
  
  res.status(204).end();
}));

// Search influencers
router.get('/influencers/search', asyncHandler(async (req, res) => {
  const options = {
    query: req.query.q,
    category: req.query.category,
    minFollowers: req.query.minFollowers ? parseInt(req.query.minFollowers) : undefined,
    maxFollowers: req.query.maxFollowers ? parseInt(req.query.maxFollowers) : undefined,
    minEngagementRate: req.query.minEngagementRate ? parseFloat(req.query.minEngagementRate) : undefined,
    limit: req.query.limit ? parseInt(req.query.limit) : 20,
    offset: req.query.offset ? parseInt(req.query.offset) : 0
  };
  
  const influencers = await influencerData.searchInfluencers(options);
  res.json(influencers);
}));

/*
 * Brand Routes
 */

// Get all brands
router.get('/brands', asyncHandler(async (req, res) => {
  console.log('GET /brands endpoint called');
  try {
    const brands = await brandData.getAllBrands();
    console.log(`Retrieved ${brands.length} brands`);
    res.json(brands);
  } catch (error) {
    console.error('Error in brands endpoint:', error);
    res.status(500).json({ message: 'Error retrieving brands', error: error.message });
  }
}));

// Get brand by ID
router.get('/brands/:id', asyncHandler(async (req, res) => {
  const brand = await brandData.getBrandById(req.params.id);
  
  if (!brand) {
    return res.status(404).json({
      message: 'Brand not found'
    });
  }
  
  res.json(brand);
}));

// Create a new brand
router.post('/brands', asyncHandler(async (req, res) => {
  const brand = await brandData.createBrand(req.body);
  res.status(201).json(brand);
}));

// Update a brand
router.put('/brands/:id', asyncHandler(async (req, res) => {
  const brand = await brandData.updateBrand(req.params.id, req.body);
  
  if (!brand) {
    return res.status(404).json({
      message: 'Brand not found'
    });
  }
  
  res.json(brand);
}));

// Delete a brand
router.delete('/brands/:id', asyncHandler(async (req, res) => {
  const success = await brandData.deleteBrand(req.params.id);
  
  if (!success) {
    return res.status(404).json({
      message: 'Brand not found'
    });
  }
  
  res.status(204).end();
}));

// Get brand campaigns
router.get('/brands/:id/campaigns', asyncHandler(async (req, res) => {
  const brand = await brandData.getBrandById(req.params.id);
  
  if (!brand) {
    return res.status(404).json({
      message: `Brand with ID ${req.params.id} not found`
    });
  }
  
  const options = {
    limit: req.query.limit ? parseInt(req.query.limit) : 50,
    offset: req.query.offset ? parseInt(req.query.offset) : 0,
    status: req.query.status
  };
  
  const campaigns = await brandData.getBrandCampaigns(req.params.id, options);
  res.json(campaigns);
}));

/*
 * Campaign Routes
 */

// Get all campaigns
router.get('/campaigns', asyncHandler(async (req, res) => {
  const campaigns = await campaignData.getAllCampaigns();
  res.json(campaigns);
}));

// Get campaign by ID
router.get('/campaigns/:id', asyncHandler(async (req, res) => {
  const campaign = await campaignData.getCampaignById(req.params.id);
  
  if (!campaign) {
    return res.status(404).json({
      message: `Campaign with ID ${req.params.id} not found`
    });
  }
  
  res.json(campaign);
}));

// Create a new campaign
router.post('/campaigns', asyncHandler(async (req, res) => {
  const newCampaign = await campaignData.createCampaign(req.body);
  res.status(201).json(newCampaign);
}));

// Update a campaign
router.put('/campaigns/:id', asyncHandler(async (req, res) => {
  const campaign = await campaignData.getCampaignById(req.params.id);
  
  if (!campaign) {
    return res.status(404).json({
      message: `Campaign with ID ${req.params.id} not found`
    });
  }
  
  const updatedCampaign = await campaignData.updateCampaign(req.params.id, req.body);
  res.json(updatedCampaign);
}));

// Delete a campaign
router.delete('/campaigns/:id', asyncHandler(async (req, res) => {
  const campaign = await campaignData.getCampaignById(req.params.id);
  
  if (!campaign) {
    return res.status(404).json({
      message: `Campaign with ID ${req.params.id} not found`
    });
  }
  
  await campaignData.deleteCampaign(req.params.id);
  res.status(204).end();
}));

// Add influencers to a campaign
router.post('/campaigns/:id/influencers', asyncHandler(async (req, res) => {
  const campaign = await campaignData.getCampaignById(req.params.id);
  
  if (!campaign) {
    return res.status(404).json({
      message: `Campaign with ID ${req.params.id} not found`
    });
  }
  
  if (!req.body.influencerIds || !Array.isArray(req.body.influencerIds)) {
    return res.status(400).json({
      message: 'influencerIds array is required'
    });
  }
  
  const updatedCampaign = await campaignData.addInfluencersToCampaign(
    req.params.id, 
    req.body.influencerIds
  );
  
  res.json(updatedCampaign);
}));

// Remove influencers from a campaign
router.delete('/campaigns/:id/influencers', asyncHandler(async (req, res) => {
  const campaign = await campaignData.getCampaignById(req.params.id);
  
  if (!campaign) {
    return res.status(404).json({
      message: `Campaign with ID ${req.params.id} not found`
    });
  }
  
  if (!req.body.influencerIds || !Array.isArray(req.body.influencerIds)) {
    return res.status(400).json({
      message: 'influencerIds array is required'
    });
  }
  
  const updatedCampaign = await campaignData.removeInfluencersFromCampaign(
    req.params.id, 
    req.body.influencerIds
  );
  
  res.json(updatedCampaign);
}));

// Add a test route to verify API is registered
router.get('/test', (req, res) => {
  res.json({ 
    message: 'Influencer platform API is working!',
    timestamp: new Date().toISOString()
  });
});

// Health/debug endpoint
router.get('/debug', (req, res) => {
  res.json({
    status: 'API is operational',
    routes: router.stack
      .filter(r => r.route)
      .map(r => ({
        path: r.route.path,
        methods: Object.keys(r.route.methods)
      })),
    timestamp: new Date().toISOString()
  });
});

// API status endpoint
router.get('/', (req, res) => {
  res.json({
    name: 'Influencer Platform API',
    status: 'operational',
    version: '1.0.0'
  });
});

// Add a database check endpoint
router.get('/db-check', async (req, res) => {
  try {
    // Check if Prisma client is initialized
    if (!prisma) {
      return res.status(500).json({
        status: 'error',
        message: 'Prisma client is not initialized'
      });
    }
    
    // Try to connect to the database
    const dbInfo = {
      database_url: process.env.DATABASE_URL ? 
        `${process.env.DATABASE_URL.split('@')[1].split('/')[1]}` : 
        'Not configured',
      tables: []
    };
    
    try {
      // Check if influencer table exists by querying meta data
      const result = await prisma.$queryRaw`
        SELECT table_name FROM information_schema.tables 
        WHERE table_schema = DATABASE()
      `;
      
      dbInfo.tables = result.map(r => r.TABLE_NAME || r.table_name);
      dbInfo.status = 'connected';
      dbInfo.migration_status = dbInfo.tables.includes('_prisma_migrations') ? 
        'Migrations table exists' : 
        'No migrations table found';
      
      // Try to count influencers
      const count = await prisma.influencer.count();
      dbInfo.influencer_count = count;
    } catch (dbError) {
      dbInfo.status = 'error';
      dbInfo.error = dbError.message;
    }
    
    res.json({
      status: 'Database check completed',
      database: dbInfo
    });
  } catch (error) {
    console.error('Error checking database:', error);
    res.status(500).json({
      status: 'error',
      message: error.message,
      stack: process.env.NODE_ENV === 'production' ? undefined : error.stack
    });
  }
});

// Add a view test endpoint that returns a ready-to-render HTML page
router.get('/view-test', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Influencer List Test</title>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
      <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    </head>
    <body>
      <div id="app">
        <div class="section">
          <div class="container">
            <h1 class="title has-text-centered">Influencer Platform Test Page</h1>
            
            <div class="box">
              <h2 class="subtitle">API Test</h2>
              <div class="buttons">
                <button @click="fetchInfluencers" class="button is-primary">
                  Fetch Influencers
                </button>
                <button @click="checkDatabase" class="button is-info">
                  Check Database
                </button>
              </div>
              
              <div v-if="loading" class="has-text-centered my-4">
                <span class="icon is-large">
                  <i class="fas fa-spinner fa-pulse fa-2x"></i>
                </span>
                <p>Loading...</p>
              </div>
              
              <div v-if="error" class="notification is-danger">
                {{ error }}
              </div>
              
              <div v-if="result">
                <h3 class="subtitle is-5">Result:</h3>
                <pre style="max-height: 400px; overflow-y: auto; background: #f5f5f5; padding: 1rem; border-radius: 4px;">{{ JSON.stringify(result, null, 2) }}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <script>
        const app = Vue.createApp({
          data() {
            return {
              loading: false,
              error: null,
              result: null
            };
          },
          methods: {
            async fetchInfluencers() {
              this.loading = true;
              this.error = null;
              this.result = null;
              
              try {
                const response = await fetch('/api/plugins/influencer-platform/influencers');
                
                if (!response.ok) {
                  throw new Error(\`API returned status ${response.status}\`);
                }
                
                this.result = await response.json();
              } catch (err) {
                this.error = 'Error fetching influencers: ' + err.message;
                console.error(err);
              } finally {
                this.loading = false;
              }
            },
            async checkDatabase() {
              this.loading = true;
              this.error = null;
              this.result = null;
              
              try {
                const response = await fetch('/api/plugins/influencer-platform/db-check');
                
                if (!response.ok) {
                  throw new Error(\`API returned status ${response.status}\`);
                }
                
                this.result = await response.json();
              } catch (err) {
                this.error = 'Error checking database: ' + err.message;
                console.error(err);
              } finally {
                this.loading = false;
              }
            }
          },
          mounted() {
            console.log('Test page mounted');
          }
        });
        
        app.mount('#app');
      </script>
    </body>
    </html>
  `);
});

module.exports = router;