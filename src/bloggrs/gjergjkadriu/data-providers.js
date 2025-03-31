/**
 * Data Providers for Influencer Platform
 * 
 * Each function fetches data needed for a specific route
 * and returns a promise that resolves to the data object
 */
const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('./generated/client');

// Initialize Prisma client for database access
let prisma;
try {
  prisma = new PrismaClient();
} catch (error) {
  console.error('Failed to initialize Prisma client:', error);
}

/**
 * Loads mock data from JSON file if database access fails
 * @param {string} filename - The name of the mock data file
 * @returns {Promise<Object>} - The mock data
 */
async function loadMockData(filename) {
  const mockDataPath = path.join(__dirname, 'mock-data', `${filename}.json`);
  
  try {
    if (fs.existsSync(mockDataPath)) {
      const data = fs.readFileSync(mockDataPath, 'utf8');
      return JSON.parse(data);
    }
    console.warn(`Mock data file not found: ${mockDataPath}`);
    return {};
  } catch (error) {
    console.error(`Error loading mock data from ${mockDataPath}:`, error);
    return {};
  }
}

/**
 * Get data for the home page
 * @param {Object} req - Express request object
 * @returns {Promise<Object>} - Data for the home page
 */
async function getHomeData(req) {
  console.log('[Data Provider] Fetching home data');
  
  try {
    // Try to fetch from database
    if (prisma) {
      const stats = {
        influencerCount: await prisma.influencer.count(),
        brandCount: await prisma.brand.count(),
        campaignCount: await prisma.campaign.count()
      };
      
      const recentInfluencers = await prisma.influencer.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' }
      });
      const recentBrands = await prisma.brand.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' }
      });
      
      return {
        stats,
        recentInfluencers,
        recentBrands,
        lastUpdated: new Date().toISOString()
      };
    } else {
      throw new Error('Prisma client not available');
    }
  } catch (error) {
    console.error('[Data Provider] Error fetching home data:', error);
    
    // Fall back to mock data
    return loadMockData('home');
  }
}

/**
 * Get influencers list data
 * @param {Object} req - Express request object
 * @returns {Promise<Object>} - Influencers data
 */
async function getInfluencersData(req) {
  console.log('[Data Provider] Fetching influencers data');
  
  try {
    if (prisma) {
      const influencers = await prisma.io.findMany({
        orderBy: { followerCount: 'desc' },
        include: {
          categories: true
        }
      });
      
      return {
        influencers,
        totalCount: influencers.length,
        lastUpdated: new Date().toISOString()
      };
    } else {
      throw new Error('Prisma client not available');
    }
  } catch (error) {
    console.error('[Data Provider] Error fetching influencers data:', error);
    
    // Fall back to mock data
    const mockData = await loadMockData('influencers');
    return {
      influencers: mockData.influencers || [],
      totalCount: mockData.influencers ? mockData.influencers.length : 0,
      lastUpdated: new Date().toISOString()
    };
  }
}

/**
 * Get data for a specific influencer
 * @param {Object} req - Express request object
 * @returns {Promise<Object>} - Influencer detail data
 */
async function getInfluencerDetailData(req) {
  const { id } = req.params;
  console.log(`[Data Provider] Fetching influencer detail data for ID: ${id}`);
  
  try {
    if (prisma) {
      const influencer = await prisma.influencer.findUnique({
        where: { id: parseInt(id, 10) },
        include: {
          categories: true,
          campaigns: {
            include: {
              brand: true
            }
          }
        }
      });
      
      if (!influencer) {
        throw new Error(`Influencer with ID ${id} not found`);
      }
      
      return {
        influencer,
        relatedInfluencers: await prisma.influencer.findMany({
          where: {
            categories: {
              some: {
                id: {
                  in: influencer.categories.map(cat => cat.id)
                }
              }
            },
            id: {
              not: influencer.id
            }
          },
          take: 5
        }),
        lastUpdated: new Date().toISOString()
      };
    } else {
      throw new Error('Prisma client not available');
    }
  } catch (error) {
    console.error(`[Data Provider] Error fetching influencer detail for ID ${id}:`, error);
    
    // Fall back to mock data
    const mockData = await loadMockData('influencers');
    const mockInfluencer = mockData.influencers?.find(inf => inf.id.toString() === id) || 
                           mockData.influencers?.[0] || 
                           { id: id, name: 'Mock Influencer', handle: '@mockinfluencer' };
    
    return {
      influencer: mockInfluencer,
      relatedInfluencers: mockData.influencers?.filter(inf => inf.id.toString() !== id).slice(0, 5) || [],
      lastUpdated: new Date().toISOString()
    };
  }
}

/**
 * Get brands list data
 * @param {Object} req - Express request object
 * @returns {Promise<Object>} - Brands data
 */
async function getBrandsData(req) {
  console.log('[Data Provider] Fetching brands data');
  
  try {
    if (prisma) {
      const brands = await prisma.brand.findMany({
        orderBy: { name: 'asc' },
        include: {
          campaigns: true
        }
      });
      
      return {
        brands,
        totalCount: brands.length,
        lastUpdated: new Date().toISOString()
      };
    } else {
      throw new Error('Prisma client not available');
    }
  } catch (error) {
    console.error('[Data Provider] Error fetching brands data:', error);
    
    // Fall back to mock data
    const mockData = await loadMockData('brands');
    return {
      brands: mockData.brands || [],
      totalCount: mockData.brands ? mockData.brands.length : 0,
      lastUpdated: new Date().toISOString()
    };
  }
}

/**
 * Get data for a specific brand
 * @param {Object} req - Express request object
 * @returns {Promise<Object>} - Brand detail data
 */
async function getBrandDetailData(req) {
  const { id } = req.params;
  console.log(`[Data Provider] Fetching brand detail data for ID: ${id}`);
  
  try {
    if (prisma) {
      const brand = await prisma.brand.findUnique({
        where: { id: parseInt(id, 10) },
        include: {
          campaigns: {
            include: {
              influencers: true
            }
          }
        }
      });
      
      if (!brand) {
        throw new Error(`Brand with ID ${id} not found`);
      }
      
      return {
        brand,
        activeCampaigns: brand.campaigns.filter(c => c.status === 'ACTIVE'),
        pastCampaigns: brand.campaigns.filter(c => c.status === 'COMPLETED'),
        lastUpdated: new Date().toISOString()
      };
    } else {
      throw new Error('Prisma client not available');
    }
  } catch (error) {
    console.error(`[Data Provider] Error fetching brand detail for ID ${id}:`, error);
    
    // Fall back to mock data
    const mockData = await loadMockData('brands');
    const mockBrand = mockData.brands?.find(brand => brand.id.toString() === id) || 
                      mockData.brands?.[0] || 
                      { id: id, name: 'Mock Brand', website: 'www.mockbrand.com' };
    
    return {
      brand: mockBrand,
      activeCampaigns: [],
      pastCampaigns: [],
      lastUpdated: new Date().toISOString()
    };
  }
}

/**
 * Get campaigns list data
 * @param {Object} req - Express request object
 * @returns {Promise<Object>} - Campaigns data
 */
async function getCampaignsData(req) {
  console.log('[Data Provider] Fetching campaigns data');
  
  try {
    if (prisma) {
      const campaigns = await prisma.campaign.findMany({
        orderBy: { startDate: 'desc' },
        include: {
          brand: true,
          influencers: true
        }
      });
      
      return {
        campaigns,
        activeCampaigns: campaigns.filter(c => c.status === 'ACTIVE'),
        upcomingCampaigns: campaigns.filter(c => c.status === 'PLANNED'),
        completedCampaigns: campaigns.filter(c => c.status === 'COMPLETED'),
        totalCount: campaigns.length,
        lastUpdated: new Date().toISOString()
      };
    } else {
      throw new Error('Prisma client not available');
    }
  } catch (error) {
    console.error('[Data Provider] Error fetching campaigns data:', error);
    
    // Fall back to mock data
    const mockData = await loadMockData('campaigns');
    const campaigns = mockData.campaigns || [];
    
    return {
      campaigns,
      activeCampaigns: campaigns.filter(c => c.status === 'ACTIVE'),
      upcomingCampaigns: campaigns.filter(c => c.status === 'PLANNED'),
      completedCampaigns: campaigns.filter(c => c.status === 'COMPLETED'),
      totalCount: campaigns.length,
      lastUpdated: new Date().toISOString()
    };
  }
}

/**
 * Get data for a specific campaign
 * @param {Object} req - Express request object
 * @returns {Promise<Object>} - Campaign detail data
 */
async function getCampaignDetailData(req) {
  const { id } = req.params;
  console.log(`[Data Provider] Fetching campaign detail data for ID: ${id}`);
  
  try {
    if (prisma) {
      const campaign = await prisma.campaign.findUnique({
        where: { id: parseInt(id, 10) },
        include: {
          brand: true,
          influencers: true,
          posts: true
        }
      });
      
      if (!campaign) {
        throw new Error(`Campaign with ID ${id} not found`);
      }
      
      return {
        campaign,
        metrics: {
          totalReach: campaign.influencers.reduce((sum, inf) => sum + inf.followerCount, 0),
          engagementRate: campaign.posts.length > 0 
            ? campaign.posts.reduce((sum, post) => sum + post.engagementRate, 0) / campaign.posts.length 
            : 0,
          postCount: campaign.posts.length
        },
        lastUpdated: new Date().toISOString()
      };
    } else {
      throw new Error('Prisma client not available');
    }
  } catch (error) {
    console.error(`[Data Provider] Error fetching campaign detail for ID ${id}:`, error);
    
    // Fall back to mock data
    const mockData = await loadMockData('campaigns');
    const mockCampaign = mockData.campaigns?.find(camp => camp.id.toString() === id) || 
                         mockData.campaigns?.[0] || 
                         { id: id, name: 'Mock Campaign', status: 'ACTIVE' };
    
    return {
      campaign: mockCampaign,
      metrics: {
        totalReach: 0,
        engagementRate: 0,
        postCount: 0
      },
      lastUpdated: new Date().toISOString()
    };
  }
}

/**
 * Get settings data
 * @param {Object} req - Express request object
 * @returns {Promise<Object>} - Settings data
 */
async function getSettingsData(req) {
  console.log('[Data Provider] Fetching settings data');
  
  try {
    if (prisma) {
      const categories = await prisma.category.findMany();
      const settings = await prisma.setting.findMany();
      
      const settingsObj = settings.reduce((obj, setting) => {
        obj[setting.key] = setting.value;
        return obj;
      }, {});
      
      return {
        categories,
        settings: settingsObj,
        lastUpdated: new Date().toISOString()
      };
    } else {
      throw new Error('Prisma client not available');
    }
  } catch (error) {
    console.error('[Data Provider] Error fetching settings data:', error);
    
    // Fall back to mock data
    return loadMockData('settings');
  }
}

module.exports = {
  getHomeData,
  getInfluencersData,
  getInfluencerDetailData,
  getBrandsData,
  getBrandDetailData,
  getCampaignsData,
  getCampaignDetailData,
  getSettingsData,
  loadMockData
}; 