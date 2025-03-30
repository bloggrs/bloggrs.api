/**
 * Data access layer for campaigns
 */
const prisma = require('./prisma-client');
const { retryOperation } = require('../utils/prisma-helpers');

/**
 * Get all campaigns with optional filtering and pagination
 * @param {Object} options - Query options
 * @returns {Promise<Array>} Array of campaigns
 */
async function getAllCampaigns(options = {}) {
  return retryOperation(async () => {
    const {
      limit = 50,
      offset = 0,
      status,
      brandId,
      orderBy = 'startDate',
      orderDir = 'desc'
    } = options;

    // Build the where clause
    const where = {};
    
    if (status) {
      where.status = status;
    }
    
    if (brandId) {
      where.brandId = brandId;
    }

    // Build the orderBy
    const orderByClause = {};
    orderByClause[orderBy] = orderDir.toLowerCase() === 'asc' ? 'asc' : 'desc';

    // Execute query
    return prisma.campaign.findMany({
      where,
      include: {
        brand: true,
        influencers: {
          select: {
            id: true,
            name: true,
            handle: true,
            image: true,
            category: true,
            followers: true
          }
        }
      },
      orderBy: orderByClause,
      skip: offset,
      take: limit
    });
  });
}

/**
 * Get campaign by ID
 * @param {string} id - Campaign ID
 * @returns {Promise<Object>} Campaign details
 */
async function getCampaignById(id) {
  return prisma.campaign.findUnique({
    where: { id },
    include: {
      brand: true,
      influencers: {
        include: {
          socialProfiles: true
        }
      }
    }
  });
}

/**
 * Create a new campaign
 * @param {Object} data - Campaign data
 * @returns {Promise<Object>} Created campaign
 */
async function createCampaign(data) {
  const { influencerIds, ...campaignData } = data;
  
  // Create campaign with optional influencer connections
  return prisma.campaign.create({
    data: {
      ...campaignData,
      influencers: influencerIds && influencerIds.length > 0
        ? { connect: influencerIds.map(id => ({ id })) }
        : undefined
    },
    include: {
      brand: true,
      influencers: true
    }
  });
}

/**
 * Update a campaign
 * @param {string} id - Campaign ID
 * @param {Object} data - Updated campaign data
 * @returns {Promise<Object>} Updated campaign
 */
async function updateCampaign(id, data) {
  const { influencerIds, ...campaignData } = data;
  
  // Update campaign
  const updatedCampaign = await prisma.campaign.update({
    where: { id },
    data: campaignData
  });
  
  // If influencerIds is provided, update the campaign-influencer relationships
  if (influencerIds) {
    // First, disconnect all current influencers
    await prisma.campaign.update({
      where: { id },
      data: {
        influencers: {
          set: []
        }
      }
    });
    
    // Then, connect the new set of influencers
    await prisma.campaign.update({
      where: { id },
      data: {
        influencers: {
          connect: influencerIds.map(influencerId => ({ id: influencerId }))
        }
      }
    });
  }
  
  // Return the updated campaign with related data
  return prisma.campaign.findUnique({
    where: { id },
    include: {
      brand: true,
      influencers: true
    }
  });
}

/**
 * Delete a campaign
 * @param {string} id - Campaign ID
 * @returns {Promise<boolean>} Success status
 */
async function deleteCampaign(id) {
  // First, disconnect all influencers from the campaign
  await prisma.campaign.update({
    where: { id },
    data: {
      influencers: {
        set: []
      }
    }
  });
  
  // Then delete the campaign
  await prisma.campaign.delete({
    where: { id }
  });
  
  return true;
}

/**
 * Add influencers to a campaign
 * @param {string} campaignId - Campaign ID
 * @param {Array<string>} influencerIds - Array of influencer IDs
 * @returns {Promise<Object>} Updated campaign
 */
async function addInfluencersToCampaign(campaignId, influencerIds) {
  // Add influencers to the campaign
  await prisma.campaign.update({
    where: { id: campaignId },
    data: {
      influencers: {
        connect: influencerIds.map(id => ({ id }))
      }
    }
  });
  
  // Return the updated campaign
  return prisma.campaign.findUnique({
    where: { id: campaignId },
    include: {
      brand: true,
      influencers: true
    }
  });
}

/**
 * Remove influencers from a campaign
 * @param {string} campaignId - Campaign ID
 * @param {Array<string>} influencerIds - Array of influencer IDs
 * @returns {Promise<Object>} Updated campaign
 */
async function removeInfluencersFromCampaign(campaignId, influencerIds) {
  // Remove influencers from the campaign
  await prisma.campaign.update({
    where: { id: campaignId },
    data: {
      influencers: {
        disconnect: influencerIds.map(id => ({ id }))
      }
    }
  });
  
  // Return the updated campaign
  return prisma.campaign.findUnique({
    where: { id: campaignId },
    include: {
      brand: true,
      influencers: true
    }
  });
}

module.exports = {
  getAllCampaigns,
  getCampaignById,
  createCampaign,
  updateCampaign,
  deleteCampaign,
  addInfluencersToCampaign,
  removeInfluencersFromCampaign
}; 