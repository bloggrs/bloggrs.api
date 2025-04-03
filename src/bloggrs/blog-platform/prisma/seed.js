const { PrismaClient } = require('../generated/client');
const prisma = new PrismaClient();

async function seed() {
  try {
    // Create categories
    const categories = await Promise.all([
      prisma.category.create({
        data: {
          name: 'Azure',
          slug: 'azure'
        }
      }),
      prisma.category.create({
        data: {
          name: 'Kubernetes',
          slug: 'kubernetes'
        }
      }),
      prisma.category.create({
        data: {
          name: 'Istio',
          slug: 'istio'
        }
      })
    ]);

    // Create an author
    const author = await prisma.author.create({
      data: {
        name: 'John Doe',
        bio: 'Technical writer and developer',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
      }
    });

    // Create featured posts
    await Promise.all(categories.map((category, index) => 
      prisma.post.create({
        data: {
          title: `Getting Started with ${category.name}`,
          slug: `getting-started-with-${category.slug}`,
          excerpt: `Learn the essentials of ${category.name} in this comprehensive guide...`,
          content: `Full content for ${category.name} guide...`,
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