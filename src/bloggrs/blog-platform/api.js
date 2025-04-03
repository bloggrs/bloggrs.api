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

// Get post by ID
router.get('/posts/:id', async (req, res) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: req.params.id },
      include: {
        author: true,
        categories: true,
        Tag: true,
        Comment: {
          where: { approved: true },
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            content: true,
            author: true,
            createdAt: true,
            approved: true
          }
        }
      }
    });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Increment view count
    await prisma.post.update({
      where: { id: req.params.id },
      data: { viewCount: { increment: 1 } }
    });

    res.json({ post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add comment to a post
router.post('/posts/:id/comments', async (req, res) => {
  try {
    const { author, email, content } = req.body;

    // Validate required fields
    if (!author || !email || !content) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create comment
    const comment = await prisma.comment.create({
      data: {
        author,
        email,
        content,
        approved: false, // Comments require approval by default
        post: {
          connect: { id: req.params.id }
        }
      }
    });

    res.status(201).json({
      success: true,
      comment,
      message: 'Comment submitted successfully and awaiting approval'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get related posts
router.get('/posts/:id/related', async (req, res) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: req.params.id },
      include: { categories: true }
    });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const relatedPosts = await prisma.post.findMany({
      where: {
        id: { not: post.id },
        published: true,
        categories: {
          some: {
            id: { in: post.categories.map(c => c.id) }
          }
        }
      },
      include: {
        author: true,
        categories: true
      },
      take: 3,
      orderBy: { createdAt: 'desc' }
    });

    res.json({ relatedPosts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add more API routes for categories, authors, comments, etc.

module.exports = router; 