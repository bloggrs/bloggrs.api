const { PrismaClient } = require('./generated/client');
const path = require('path');

// Initialize Prisma client for database access
let prisma;
try {
  prisma = new PrismaClient();
} catch (error) {
  console.error('Failed to initialize Prisma client:', error);
}

/**
 * Get data for the blog home page
 * This matches the dataProvider specified in plugin.json
 */
async function getHomeData(req) {
  console.log('[Data Provider] Fetching blog home data');
  
  try {
    if (!prisma) {
      throw new Error('Database connection not available');
    }

    const [featuredPosts, categories, stats] = await Promise.all([
      prisma.post.findMany({
        where: {
          featured: true,
          published: true
        },
        include: {
          author: true,
          categories: true,
          Tag: true
        },
        take: 5,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.category.findMany({
        include: {
          _count: {
            select: { posts: true }
          }
        }
      }),
      {
        postCount: await prisma.post.count({ where: { published: true } }),
        authorCount: await prisma.author.count(),
        categoryCount: await prisma.category.count()
      }
    ]);

    // Return data directly without the success/data wrapper
    return {
      featuredPosts,
      recentPosts: featuredPosts, // Using featured posts as recent posts for now
      categories,
      stats,
      lastUpdated: new Date().toISOString()
    };
  } catch (error) {
    console.error('[Data Provider] Error:', error);
    // Return fallback data in the same structure
    return {
      featuredPosts: [],
      recentPosts: [],
      categories: [],
      stats: {
        postCount: 0,
        authorCount: 0,
        categoryCount: 0
      },
      lastUpdated: new Date().toISOString()
    };
  }
}

/**
 * Load mock data as fallback
 */
async function loadMockData(filename) {
  const mockDataPath = path.join(__dirname, 'mock-data', `${filename}.json`);
  try {
    if (fs.existsSync(mockDataPath)) {
      const data = fs.readFileSync(mockDataPath, 'utf8');
      return JSON.parse(data);
    }
    return {};
  } catch (error) {
    console.error(`Error loading mock data from ${mockDataPath}:`, error);
    return {};
  }
}

module.exports = {
  getHomeData,
  loadMockData
}; 