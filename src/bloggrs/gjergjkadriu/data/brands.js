/**
 * Data access layer for brands
 */
const { PrismaClient } = require('../generated/client');
const prisma = new PrismaClient();

/**
 * Get all brands with optional filtering and pagination
 * @param {Object} options - Query options
 * @returns {Promise<Array>} Array of brands
 */
async function getAllBrands(options = {}) {
  const {
    limit = 50,
    offset = 0,
    industry,
    orderBy = 'name',
    orderDir = 'asc'
  } = options;

  // Build the where clause
  const where = {};
  
  if (industry) {
    where.industry = industry;
  }

  // Build the orderBy
  const orderByClause = {};
  orderByClause[orderBy] = orderDir.toLowerCase() === 'asc' ? 'asc' : 'desc';

  // Execute query
  const brands = await prisma.brand.findMany({
    where,
    include: {
      campaigns: {
        select: {
          id: true,
          title: true,
          status: true
        }
      }
    },
    orderBy: orderByClause,
    skip: offset,
    take: limit
  });

  return brands;
}

/**
 * Get brand by ID
 * @param {string} id - Brand ID
 * @returns {Promise<Object>} Brand details
 */
async function getBrandById(id) {
  return prisma.brand.findUnique({
    where: { id },
    include: {
      campaigns: true,
      sponsorships: {
        include: {
          influencer: true
        }
      }
    }
  });
}

/**
 * Create a new brand
 * @param {Object} data - Brand data
 * @returns {Promise<Object>} Created brand
 */
async function createBrand(data) {
  return prisma.brand.create({
    data,
    include: {
      campaigns: true
    }
  });
}

/**
 * Update a brand
 * @param {string} id - Brand ID
 * @param {Object} data - Updated brand data
 * @returns {Promise<Object>} Updated brand
 */
async function updateBrand(id, data) {
  return prisma.brand.update({
    where: { id },
    data,
    include: {
      campaigns: true
    }
  });
}

/**
 * Delete a brand
 * @param {string} id - Brand ID
 * @returns {Promise<boolean>} Success status
 */
async function deleteBrand(id) {
  // Delete related entities first (cascade delete not handled by Prisma)
  // Delete sponsorships related to the brand
  await prisma.sponsorship.deleteMany({
    where: { brandId: id }
  });
  
  // Delete campaigns related to the brand
  await prisma.campaign.deleteMany({
    where: { brandId: id }
  });
  
  // Delete the brand
  await prisma.brand.delete({
    where: { id }
  });
  
  return true;
}

/**
 * Get all campaigns for a brand
 * @param {string} brandId - Brand ID
 * @param {Object} options - Query options
 * @returns {Promise<Array>} Array of campaigns
 */
async function getBrandCampaigns(brandId, options = {}) {
  const {
    limit = 50,
    offset = 0,
    status
  } = options;

  // Build the where clause
  const where = { brandId };
  
  if (status) {
    where.status = status;
  }

  // Execute query
  return prisma.campaign.findMany({
    where,
    include: {
      influencers: true
    },
    orderBy: { startDate: 'desc' },
    skip: offset,
    take: limit
  });
}

module.exports = {
  getAllBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand,
  getBrandCampaigns
}; 