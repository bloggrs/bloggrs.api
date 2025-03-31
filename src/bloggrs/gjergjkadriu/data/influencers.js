const { PrismaClient } = require('../generated/client');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

// Load environment variables from the plugin's .env file
const envPath = path.join(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
}

// Create the Prisma client
let prisma;
try {
  prisma = new PrismaClient();
  console.log('Prisma client created successfully');
} catch (error) {
  console.error('Error creating Prisma client:', error);
}

// Mock data for when database is empty or unavailable
const mockInfluencers = [
  {
    id: '1',
    name: 'Alex Morgan',
    handle: 'alexstyle',
    image: 'https://via.placeholder.com/300?text=AlexMorgan',
    bio: 'Fashion enthusiast sharing daily outfit inspiration.',
    category: 'Fashion & Style',
    followers: 850000,
    engagementRate: 3.2,
    posts: 457,
    verified: true,
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    socialProfiles: [
      {
        id: '101',
        platform: 'Instagram',
        handle: 'alexstyle',
        url: 'https://instagram.com/alexstyle',
        followers: 850000,
        createdAt: new Date(),
        updatedAt: new Date(),
        influencerId: '1'
      }
    ]
  },
  {
    id: '2',
    name: 'Jamie Lee',
    handle: 'jamiebeauty',
    image: 'https://via.placeholder.com/300?text=JamieLee', 
    bio: 'Beauty guru with a passion for skincare and makeup tips.',
    category: 'Beauty & Makeup',
    followers: 1200000,
    engagementRate: 4.5,
    posts: 612,
    verified: true,
    featured: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    socialProfiles: [
      {
        id: '102',
        platform: 'Instagram',
        handle: 'jamiebeauty',
        url: 'https://instagram.com/jamiebeauty',
        followers: 1200000,
        createdAt: new Date(),
        updatedAt: new Date(),
        influencerId: '2'
      }
    ]
  }
];

// Influencer data access functions
const influencerData = {
  /**
   * Get all influencers
   * @param {Object} options - Query options
   * @returns {Promise<Array>} List of influencers
   */
  async getAllInfluencers(options = {}) {
    try {
      console.log('Getting all influencers with options:', options);
      
      // Try to get data from database
      if (prisma) {
        const { limit = 50, offset = 0, category, featured, verified } = options;
        
        const where = {};
        
        if (category) {
          where.category = category;
        }
        
        if (featured !== undefined) {
          where.featured = Boolean(featured);
        }
        
        if (verified !== undefined) {
          where.verified = Boolean(verified);
        }
        
        const influencers = await prisma.influencer.findMany({
          take: limit,
          skip: offset,
          where,
          include: {
            socialProfiles: true
          },
          orderBy: {
            followers: 'desc'
          }
        });
        
        console.log(`Retrieved ${influencers.length} influencers from database`);
        
        // If no influencers found, return mock data
        if (influencers.length === 0) {
          console.log('No influencers found in database, returning mock data');
          return mockInfluencers;
        }
        
        return influencers;
      } else {
        // If Prisma client not available, return mock data
        console.log('Prisma client not available, returning mock data');
        return mockInfluencers;
      }
    } catch (error) {
      console.error('Error getting influencers:', error);
      // Return mock data on error
      console.log('Error retrieving influencers, returning mock data');
      return mockInfluencers;
    }
  },
  
  /**
   * Get influencer by ID
   * @param {string} id - Influencer ID
   * @returns {Promise<Object>} Influencer details
   */
  async getInfluencerById(id) {
    return prisma.influencer.findUnique({
      where: { id },
      include: {
        socialProfiles: true,
        campaigns: true,
        sponsorships: {
          include: {
            brand: true
          }
        }
      }
    });
  },
  
  /**
   * Get influencer by handle
   * @param {string} handle - Influencer handle
   * @returns {Promise<Object>} Influencer details
   */
  async getInfluencerByHandle(handle) {
    return prisma.influencer.findUnique({
      where: { handle },
      include: {
        socialProfiles: true,
        campaigns: true,
        sponsorships: {
          include: {
            brand: true
          }
        }
      }
    });
  },
  
  /**
   * Create a new influencer
   * @param {Object} data - Influencer data
   * @returns {Promise<Object>} Created influencer
   */
  async createInfluencer(data) {
    return retryOperation(async () => {
      const { socialProfiles, ...influencerData } = data;
      
      return prisma.influencer.create({
        data: {
          ...influencerData,
          socialProfiles: socialProfiles ? {
            create: socialProfiles
          } : undefined
        },
        include: {
          socialProfiles: true
        }
      });
    });
  },
  
  /**
   * Update an influencer
   * @param {string} id - Influencer ID
   * @param {Object} data - Updated influencer data
   * @returns {Promise<Object>} Updated influencer
   */
  async updateInfluencer(id, data) {
    const { socialProfiles, ...influencerData } = data;
    
    // First update the influencer
    const updatedInfluencer = await prisma.influencer.update({
      where: { id },
      data: influencerData,
    });
    
    // Handle social profiles if provided
    if (socialProfiles && Array.isArray(socialProfiles)) {
      // Delete existing social profiles
      await prisma.socialProfile.deleteMany({
        where: { influencerId: id }
      });
      
      // Create new social profiles
      await Promise.all(
        socialProfiles.map(profile => 
          prisma.socialProfile.create({
            data: {
              ...profile,
              influencerId: id
            }
          })
        )
      );
    }
    
    // Return the updated influencer with social profiles
    return prisma.influencer.findUnique({
      where: { id },
      include: {
        socialProfiles: true
      }
    });
  },
  
  /**
   * Delete an influencer
   * @param {string} id - Influencer ID
   * @returns {Promise<boolean>} Success status
   */
  async deleteInfluencer(id) {
    // Delete related social profiles first
    await prisma.socialProfile.deleteMany({
      where: { influencerId: id }
    });
    
    // Delete the influencer
    await prisma.influencer.delete({
      where: { id }
    });
    
    return true;
  },
  
  /**
   * Search for influencers based on criteria
   * @param {Object} options - Search options
   * @returns {Promise<Array>} Matching influencers
   */
  async searchInfluencers(options = {}) {
    const {
      query,
      category,
      minFollowers,
      maxFollowers,
      minEngagementRate,
      limit = 20,
      offset = 0
    } = options;
    
    // Build the where clause
    const where = {};
    
    if (query) {
      where.OR = [
        { name: { contains: query, mode: 'insensitive' } },
        { handle: { contains: query, mode: 'insensitive' } },
        { bio: { contains: query, mode: 'insensitive' } }
      ];
    }
    
    if (category) {
      where.category = category;
    }
    
    if (minFollowers !== undefined) {
      where.followers = {
        ...where.followers,
        gte: minFollowers
      };
    }
    
    if (maxFollowers !== undefined) {
      where.followers = {
        ...where.followers,
        lte: maxFollowers
      };
    }
    
    if (minEngagementRate !== undefined) {
      where.engagementRate = {
        gte: minEngagementRate
      };
    }
    
    // Execute search query
    return prisma.influencer.findMany({
      where,
      include: {
        socialProfiles: true
      },
      orderBy: { followers: 'desc' },
      skip: offset,
      take: limit
    });
  }
};

module.exports = influencerData; 