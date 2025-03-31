const express = require('express');
const { PrismaClient } = require('./generated/client');
const router = express.Router();
const prisma = new PrismaClient();

// Get all posts with pagination and filtering
router.get('/posts', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      tag,
      search
    } = req.query;

    const where = {
      published: true
    };

    if (category) {
      where.categories = {
        some: { slug: category }
      };
    }

    if (tag) {
      where.tags = {
        some: { slug: tag }
      };
    }

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { content: { contains: search } }
      ];
    }

    const posts = await prisma.post.findMany({
      where,
      include: {
        author: true,
        categories: true,
        tags: true,
        _count: {
          select: { comments: true }
        }
      },
      skip: (page - 1) * limit,
      take: Number(limit),
      orderBy: { createdAt: 'desc' }
    });

    const total = await prisma.post.count({ where });

    res.json({
      posts,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single post by slug
router.get('/posts/:slug', async (req, res) => {
  try {
    const post = await prisma.post.findUnique({
      where: { slug: req.params.slug },
      include: {
        author: true,
        categories: true,
        tags: true,
        comments: {
          where: { approved: true },
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json({ post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add more API routes for categories, authors, comments, etc.

module.exports = router; 