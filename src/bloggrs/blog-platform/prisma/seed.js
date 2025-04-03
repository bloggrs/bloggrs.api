const { PrismaClient } = require('../generated/client');
const prisma = new PrismaClient();

async function seed() {
  try {
    // Create categories
    const categories = await Promise.all([
      prisma.category.create({
        data: {
          name: 'Development',
          slug: 'development'
        }
      }),
      prisma.category.create({
        data: {
          name: 'Plugins',
          slug: 'plugins'
        }
      }),
      prisma.category.create({
        data: {
          name: 'Administration',
          slug: 'administration'
        }
      })
    ]);

    // Create an author
    const author = await prisma.author.create({
      data: {
        name: 'Sarah Schmidt',
        bio: 'Shopware Developer & Technical Consultant',
        avatar: 'https://randomuser.me/api/portraits/women/12.jpg'
      }
    });

    // Create featured posts
    await Promise.all(categories.map((category, index) => 
      prisma.post.create({
        data: {
          title: category.name === 'Development' 
            ? 'Custom Plugin Development in Shopware 6'
            : category.name === 'Plugins'
            ? 'Essential Plugins for Your Shopware 6 Store'
            : 'Mastering the Shopware 6 Admin Panel',
          slug: category.name === 'Development'
            ? 'custom-plugin-development-shopware-6'
            : category.name === 'Plugins'
            ? 'essential-plugins-shopware-6'
            : 'mastering-shopware-6-admin',
          excerpt: category.name === 'Development'
            ? 'Learn how to create custom plugins in Shopware 6, from basic setup to advanced features...'
            : category.name === 'Plugins'
            ? 'Discover must-have plugins that will enhance your Shopware 6 store functionality...'
            : 'A comprehensive guide to efficiently managing your Shopware 6 store through the admin interface...',
          content: category.name === 'Development'
            ? 'Detailed guide on Shopware 6 plugin development, including plugin structure, services, decorators, and best practices...'
            : category.name === 'Plugins'
            ? 'In-depth review and setup instructions for essential Shopware 6 plugins covering payment, shipping, marketing, and more...'
            : 'Complete walkthrough of Shopware 6 administration features, including product management, order processing, and store configuration...',
          published: true,
          featured: true,
          authorId: author.id,
          categories: {
            connect: { id: category.id }
          }
        }
      })
    ));

  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seed();