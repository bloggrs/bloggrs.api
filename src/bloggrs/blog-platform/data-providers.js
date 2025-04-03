const { PrismaClient } = require('./generated/client');
const path = require('path');
const authors = require('./mock-data/authors');

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

async function getPostData(req) {
  console.log('[Data Provider] Fetching post data for ID:', req.params.id);
  
  try {
    if (!prisma) {
      throw new Error('Database connection not available');
    }

    const featuredPosts = await prisma.post.findMany({
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
    });


    const post = await prisma.post.findUnique({
      where: {
        id: req.params.id
      },
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
      console.log('[Data Provider] Post not found');
      return {
        error: 'Post not found',
        post: {
          title: 'Post Not Found',
          content: 'The requested post could not be found.',
          createdAt: new Date().toISOString(),
          author: {
            name: 'Unknown Author',
            avatar: null,
            bio: null
          },
          categories: [],
          Tag: null,
          Comment: []
        },
        lastUpdated: new Date().toISOString()
      };
    }

    // Ensure post has all required properties with proper structure
    const safePost = {
      ...post,
      title: post.title || 'Untitled Post',
      content: post.content || '',
      createdAt: post.createdAt || new Date().toISOString(),
      author: post.author || {
        name: 'Unknown Author',
        avatar: null,
        bio: null
      },
      categories: Array.isArray(post.categories) ? post.categories : [],
      Tag: post.Tag || null,
      Comment: Array.isArray(post.Comment) ? post.Comment.map(comment => ({
        ...comment,
        author: comment.author || 'Anonymous',
        createdAt: comment.createdAt || new Date().toISOString()
      })) : []
    };

    console.log('[Data Provider] Successfully fetched post data');
    return {
      post: safePost,
      featuredPosts,
      lastUpdated: new Date().toISOString()
    };
  } catch (error) {
    console.error('[Data Provider] Error:', error);
    return {
      error: error.message,
      post: {
        title: 'Error Loading Post',
        content: 'There was an error loading the post content.',
        createdAt: new Date().toISOString(),
        author: {
          name: 'Unknown Author',
          avatar: null,
          bio: null
        },
        categories: [],
        Tag: null,
        Comment: []
      },
      lastUpdated: new Date().toISOString()
    };
  }
}

// Add a new function to handle comment submission
async function createComment(req) {
  console.log('[Data Provider] Creating new comment for post:', req.params.id);
  
  try {
    if (!prisma) {
      throw new Error('Database connection not available');
    }

    const { author, email, content } = req.body;
    
    // Validate required fields
    if (!author || !email || !content) {
      throw new Error('Missing required fields');
    }

    // Create the comment
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

    return {
      success: true,
      comment,
      message: 'Comment submitted successfully and awaiting approval'
    };
  } catch (error) {
    console.error('[Data Provider] Error creating comment:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

async function getPostDetailData(req) {
  console.log('[Data Provider] Fetching post detail data for ID:', req.params.id);
  
  try {
    if (!prisma) {
      throw new Error('Database connection not available');
    }

    const postId = req.params.id;
    console.log('[Data Provider] Looking for post with ID:', postId);

    // Make sure we're querying with the correct ID format
    const post = await prisma.post.findUnique({
      where: {
        id: postId
      },
      include: {
        author: true,
        categories: true,
        tags: true,
        comments: true
      }
    });

    console.log('[Data Provider] Found post:', post ? 'yes' : 'no');

    if (!post) {
      console.log('[Data Provider] Post not found for ID:', postId);
      return {
        success: false,
        error: 'Post not found',
        data: null
      };
    }

    return {
      success: true,
      data: {
        post: {
          ...post,
          createdAt: post.createdAt?.toISOString(),
          updatedAt: post.updatedAt?.toISOString()
        }
      }
    };
  } catch (error) {
    console.error('[Data Provider] Error fetching post:', error);
    return {
      success: false,
      error: 'Failed to fetch post data',
      data: null
    };
  }
}

module.exports = {
  getHomeData,
  loadMockData,
  getPostData,
  createComment,
  getPostDetailData
}; 