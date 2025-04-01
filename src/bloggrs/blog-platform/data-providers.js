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
 */
async function getHomeData(req) {
  console.log('[Data Provider] Fetching blog home data');
  
  try {
    if (prisma) {
      const featuredPosts = await prisma.post.findMany({
        include: {
          author: true,
          categories: true,
          tags: true
        },
        take: 5,
        orderBy: { createdAt: 'desc' }
      });

      const recentPosts = await prisma.post.findMany({
        include: {
          author: true,
          categories: true
        },
        take: 10,
        orderBy: { createdAt: 'desc' }
      });

      const categories = await prisma.category.findMany({
        include: {
          _count: {
            select: { posts: true }
          }
        }
      });

      const stats = {
        postCount: await prisma.post.count({ where: { published: true } }),
        authorCount: await prisma.author.count(),
        categoryCount: await prisma.category.count()
      };

      return {
        featuredPosts,
        recentPosts,
        categories,
        stats,
        lastUpdated: new Date().toISOString()
      };
    }
  } catch (error) {
    console.error('[Data Provider] Error fetching blog home data:', error);
    return loadMockData('home');
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