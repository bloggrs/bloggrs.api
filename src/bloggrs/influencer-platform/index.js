// Main entry point for the influencer platform plugin
const path = require('path');
const pluginConfig = require('./plugin.json');
const pluginDbManager = require('../../utils/plugin-db-manager');
const api = require('./api');
const { compileVueFile } = require('../../utils/vue-compiler');
const server = require('./server');
const express = require('express');
const fs = require('fs');
const { PrismaClient } = require('./generated/client');
const dataProviders = require('./data-providers');

// Create Prisma client
let prisma;
try {
  prisma = new PrismaClient();
  console.log('Prisma client created successfully');
} catch (error) {
  console.error('Error creating Prisma client:', error);
}

// Mock data (used as fallback if database is unavailable)
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

const mockBrands = [
  {
    id: '1',
    name: 'FashionForward',
    logo: 'https://via.placeholder.com/150?text=FashionForward',
    industry: 'Fashion',
    website: 'https://fashionforward.example.com',
    description: 'Modern clothing brand for young adults'
  },
  {
    id: '2',
    name: 'BeautyGlow',
    logo: 'https://via.placeholder.com/150?text=BeautyGlow',
    industry: 'Beauty',
    website: 'https://beautyglow.example.com',
    description: 'Premium skincare and cosmetics'
  }
];

/**
 * Influencer Platform Plugin
 * 
 * A platform for managing influencer marketing campaigns
 */
class InfluencerPlatformPlugin {
  constructor() {
    this.id = 'influencer-platform';
    this.name = 'Instagram Influencer Platform';
    this.version = '1.0.0';
    this.description = 'A platform for managing influencer marketing campaigns';
    this.directory = __dirname;
    
    // Load the plugin configuration
    this.config = require('./plugin.json');
    
    // Log available data providers for debugging
    console.log(`[${this.id}] Available data providers:`, Object.keys(dataProviders));
  }
  
  /**
   * Initialize the plugin
   * @param {Object} app - Express app
   * @param {Object} config - Plugin configuration
   * @param {Object} pluginSystem - Plugin system
   */
  async initialize(app, config, pluginSystem) {
    console.log(`[${this.id}] Initializing plugin`);
    
    // Store reference to plugin system
    this.pluginSystem = pluginSystem;
    
    try {
      // Ensure mock data directory exists
      const fs = require('fs');
      const mockDataDir = path.join(__dirname, 'mock-data');
      if (!fs.existsSync(mockDataDir)) {
        fs.mkdirSync(mockDataDir, { recursive: true });
        console.log(`[${this.id}] Created mock data directory: ${mockDataDir}`);
      }
      
      // Create mock data files if they don't exist
      await this.ensureMockDataFiles();
      
      // Register API routes
      this.registerApiRoutes(app);
      
      return true;
    } catch (error) {
      console.error(`[${this.id}] Error initializing plugin:`, error);
      return false;
    }
  }
  
  /**
   * Ensure mock data files exist
   */
  async ensureMockDataFiles() {
    const fs = require('fs');
    const mockDataDir = path.join(__dirname, 'mock-data');
    
    // Define basic mock data structure
    const mockDataFiles = {
      'influencers.json': {
        influencers: [
          {
            id: 1,
            name: "Sarah Johnson",
            handle: "@sarahjbeauty",
            followerCount: 1250000,
            engagementRate: 3.2,
            bio: "Beauty and lifestyle influencer sharing makeup tutorials and skincare tips.",
            profileImage: "https://randomuser.me/api/portraits/women/1.jpg",
            categories: [
              { id: 1, name: "Beauty" },
              { id: 2, name: "Lifestyle" }
            ],
            location: "Los Angeles, CA",
            email: "sarah@example.com",
            phone: "+1-555-123-4567"
          },
          {
            id: 2,
            name: "Mike Chen",
            handle: "@mikefitness",
            followerCount: 985000,
            engagementRate: 4.1,
            bio: "Fitness trainer and nutrition expert. Join me on my journey to a healthier life.",
            profileImage: "https://randomuser.me/api/portraits/men/2.jpg",
            categories: [
              { id: 3, name: "Fitness" },
              { id: 4, name: "Health" }
            ],
            location: "Miami, FL",
            email: "mike@example.com",
            phone: "+1-555-234-5678"
          }
        ]
      },
      'brands.json': {
        brands: [
          {
            id: 1,
            name: "BeautyGlow",
            website: "https://beautyglow.com",
            logo: "https://via.placeholder.com/150",
            industry: "Beauty",
            description: "Premium skincare and makeup products for all skin types",
            contactName: "Emma Roberts",
            contactEmail: "emma@beautyglow.com",
            contactPhone: "+1-555-111-2222"
          },
          {
            id: 2,
            name: "FitLife",
            website: "https://fitlife.com",
            logo: "https://via.placeholder.com/150",
            industry: "Fitness",
            description: "Fitness apparel and nutrition supplements for active lifestyles",
            contactName: "Jason Miller",
            contactEmail: "jason@fitlife.com",
            contactPhone: "+1-555-222-3333"
          }
        ]
      },
      'campaigns.json': {
        campaigns: [
          {
            id: 1,
            name: "Summer Glow Collection Launch",
            brandId: 1,
            status: "ACTIVE",
            startDate: "2023-06-01T00:00:00.000Z",
            endDate: "2023-08-31T00:00:00.000Z",
            budget: 25000,
            description: "Launch campaign for our new Summer Glow Collection featuring SPF-infused makeup and skincare.",
            objective: "PRODUCT_LAUNCH",
            requirements: "3 Instagram posts, 5 stories, 1 Reel"
          },
          {
            id: 2,
            name: "30-Day Fitness Challenge",
            brandId: 2,
            status: "ACTIVE",
            startDate: "2023-05-15T00:00:00.000Z",
            endDate: "2023-07-15T00:00:00.000Z",
            budget: 35000,
            description: "Promote our new workout app with a 30-day fitness challenge for influencers and their followers.",
            objective: "APP_DOWNLOAD",
            requirements: "Daily stories documenting progress, weekly posts, final transformation Reel"
          }
        ]
      },
      'home.json': {
        stats: {
          influencerCount: 523,
          brandCount: 78,
          campaignCount: 42
        },
        recentInfluencers: [
          {
            id: 1,
            name: "Sarah Johnson",
            handle: "@sarahjbeauty",
            followerCount: 1250000,
            profileImage: "https://randomuser.me/api/portraits/women/1.jpg"
          },
          {
            id: 2,
            name: "Mike Chen",
            handle: "@mikefitness",
            followerCount: 985000,
            profileImage: "https://randomuser.me/api/portraits/men/2.jpg"
          }
        ],
        recentBrands: [
          {
            id: 1,
            name: "BeautyGlow",
            industry: "Beauty",
            logo: "https://via.placeholder.com/150"
          },
          {
            id: 2,
            name: "FitLife",
            industry: "Fitness",
            logo: "https://via.placeholder.com/150"
          }
        ]
      },
      'settings.json': {
        categories: [
          { id: 1, name: "Beauty" },
          { id: 2, name: "Lifestyle" },
          { id: 3, name: "Fitness" },
          { id: 4, name: "Health" }
        ],
        settings: {
          defaultCurrency: "USD",
          defaultLanguage: "en",
          minFollowerCount: 10000,
          minEngagementRate: 2.0
        }
      }
    };
    
    // Create each mock data file if it doesn't exist
    for (const [filename, data] of Object.entries(mockDataFiles)) {
      const filePath = path.join(mockDataDir, filename);
      if (!fs.existsSync(filePath)) {
        try {
          fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
          console.log(`[${this.id}] Created mock data file: ${filename}`);
        } catch (error) {
          console.error(`[${this.id}] Error creating mock data file ${filename}:`, error);
        }
      }
    }
  }
  
  /**
   * Get plugin routes
   * @returns {Array} Array of routes
   */
  routes() {
    console.log(`[${this.id}] Getting routes from plugin.json`);
    
    // Ensure routes exist in plugin.json
    if (!this.config || !this.config.routes || !Array.isArray(this.config.routes)) {
      console.error(`[${this.id}] No routes defined in plugin.json`);
      return [];
    }
    
    // Log the routes being returned
    console.log(`[${this.id}] Returning ${this.config.routes.length} routes:`, 
      this.config.routes.map(r => r.path));
    
    return this.config.routes;
  }
  
  /**
   * Get plugin head tags
   * @returns {Array|string} Head tags
   */
  headTags() {
    return this.config.headTags || [];
  }
  
  /**
   * Get data provider for a route
   * @param {string} providerName - The name of the data provider
   * @returns {Function|null} Data provider function or null if not found
   */
  getDataProvider(providerName) {
    console.log(`[${this.id}] Looking for data provider: ${providerName}`);
    
    // Check if the provider exists
    if (dataProviders[providerName]) {
      console.log(`[${this.id}] Found data provider: ${providerName}`);
      return dataProviders[providerName];
    }
    
    console.warn(`[${this.id}] Data provider not found: ${providerName}`);
    
    // Return a fallback provider that returns an empty object
    return async (req) => {
      console.warn(`[${this.id}] Using fallback data provider for: ${providerName}`);
      
      // Try to return reasonable mock data based on the provider name
      if (providerName.includes('Influencer')) {
        const mockData = await dataProviders.loadMockData('influencers');
        return {
          influencers: mockData.influencers || [],
          totalCount: mockData.influencers ? mockData.influencers.length : 0,
          lastUpdated: new Date().toISOString()
        };
      } else if (providerName.includes('Brand')) {
        const mockData = await dataProviders.loadMockData('brands');
        return {
          brands: mockData.brands || [],
          totalCount: mockData.brands ? mockData.brands.length : 0,
          lastUpdated: new Date().toISOString()
        };
      } else if (providerName.includes('Campaign')) {
        const mockData = await dataProviders.loadMockData('campaigns');
        return {
          campaigns: mockData.campaigns || [],
          totalCount: mockData.campaigns ? mockData.campaigns.length : 0,
          lastUpdated: new Date().toISOString()
        };
      } else if (providerName.includes('Home')) {
        return dataProviders.loadMockData('home');
      } else if (providerName.includes('Settings')) {
        return dataProviders.loadMockData('settings');
      }
      
      // Default empty response
      return {
        error: `Data provider '${providerName}' not found`,
        timestamp: new Date().toISOString()
      };
    };
  }
  
  /**
   * Register API routes
   * @param {Object} app - Express app
   */
  registerApiRoutes(app) {
    const apiPrefix = `/api/plugins/${this.id}`;
    
    // Debug endpoint
    app.get(`${apiPrefix}/debug`, (req, res) => {
      res.json({
        status: 'ok',
        plugin: this.id,
        version: this.version,
        routes: this.config.routes.map(r => r.path),
        dataProviders: Object.keys(dataProviders)
      });
    });
    
    // Add a test data endpoint
    app.get(`${apiPrefix}/test-data/:provider`, async (req, res) => {
      const providerName = req.params.provider;
      
      try {
        const provider = this.getDataProvider(providerName);
        if (provider) {
          const data = await provider(req);
          res.json({
            status: 'success',
            provider: providerName,
            data
          });
        } else {
          res.status(404).json({
            status: 'error',
            message: `Data provider '${providerName}' not found`
          });
        }
      } catch (error) {
        res.status(500).json({
          status: 'error',
          message: `Error fetching data from provider '${providerName}': ${error.message}`
        });
      }
    });
  }
}

module.exports = new InfluencerPlatformPlugin();