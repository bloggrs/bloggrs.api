const { PrismaClient } = require('../generated/client');
const path = require('path');

const prisma = new PrismaClient();

class HomeProvider {
  async getHomeData() {
    try {
      // Get featured posts
      const featuredPosts = await prisma.post.findMany({
        where: {
          featured: true,
          published: true
        },
        include: {
          author: true,
          categories: true
        },
        orderBy: {
          createdAt: 'desc'
        },
        take: 5
      });

      // Get categories with post count
      const categories = await prisma.category.findMany({
        include: {
          _count: {
            select: { posts: true }
          }
        },
        orderBy: {
          name: 'asc'
        }
      });

      // Get site stats
      const stats = {
        postCount: await prisma.post.count({ where: { published: true } }),
        categoryCount: await prisma.category.count(),
        authorCount: await prisma.author.count()
      };

      return {
        featuredPosts,
        categories,
        stats
      };
    } catch (error) {
      console.error('Error in HomeProvider:', error);
      throw error;
    }
  }
}

module.exports = new HomeProvider(); 