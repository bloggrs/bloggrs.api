const { PrismaClient } = require('@prisma/client');
const authors = require('./authors');
const categories = require('./categories');
const posts = require('./posts');
const comments = require('./comments');

async function initializeMockData() {
  const prisma = new PrismaClient();

  try {
    console.log('Starting mock data initialization...');

    // Check if data already exists
    const existingPosts = await prisma.post.count();
    if (existingPosts > 0) {
      console.log('Mock data already exists, skipping initialization');
      return;
    }

    // Create authors
    console.log('Creating authors...');
    for (const author of authors) {
      await prisma.author.create({
        data: author
      });
    }

    // Create categories
    console.log('Creating categories...');
    for (const category of categories) {
      await prisma.category.create({
        data: category
      });
    }

    // Create posts
    console.log('Creating posts...');
    for (const post of posts) {
      await prisma.post.create({
        data: post
      });
    }

    // Create comments
    console.log('Creating comments...');
    for (const comment of comments) {
      await prisma.comment.create({
        data: comment
      });
    }

    console.log('Mock data initialization completed successfully');
  } catch (error) {
    console.error('Error initializing mock data:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = initializeMockData; 