const { broadcastToChannel } = require('./index');
const { getBlogByApiKey } = require('../blogs-api/blogs-dal');
const { findPostsForBlog } = require('../posts-dal');
const { getBlogCategories } = require('../blogs-api/blogs-dal');
const { getBlogPages } = require('../blogs-api/blogs-dal');
const { getBlogHeaderWidetData } = require('../blogs-api/blogs-dal');
const { getRoutesForBlog, getComponentsForBlog, getPageData } = require('../blogs-api/blogs-dal');

// Event handlers for different blog actions

// Post events
async function handlePostCreated(post, blogId) {
  try {
    // Get blog by ID
    const blog = await prisma.blogs.findUnique({ where: { id: blogId } });
    if (!blog) return;
    
    // Get public key for the blog
    const publicKey = await prisma.publickeys.findFirst({ where: { BlogId: blogId } });
    if (!publicKey) return;
    
    // Broadcast post created event
    broadcastToChannel(publicKey.id, 'posts', {
      action: 'created',
      post
    });
    
    // Update posts list
    const posts = await findPostsForBlog(blogId, null, { page: 1, pageSize: 10 });
    broadcastToChannel(publicKey.id, 'posts', {
      action: 'list_updated',
      posts
    });
  } catch (error) {
    console.error('Post created event error:', error);
  }
}

async function handlePostUpdated(post, blogId) {
  try {
    // Get public key for the blog
    const publicKey = await prisma.publickeys.findFirst({ where: { BlogId: blogId } });
    if (!publicKey) return;
    
    // Broadcast post updated event
    broadcastToChannel(publicKey.id, 'posts', {
      action: 'updated',
      post
    });
    
    // Update posts list
    const posts = await findPostsForBlog(blogId, null, { page: 1, pageSize: 10 });
    broadcastToChannel(publicKey.id, 'posts', {
      action: 'list_updated',
      posts
    });
  } catch (error) {
    console.error('Post updated event error:', error);
  }
}

async function handlePostDeleted(postId, blogId) {
  try {
    // Get public key for the blog
    const publicKey = await prisma.publickeys.findFirst({ where: { BlogId: blogId } });
    if (!publicKey) return;
    
    // Broadcast post deleted event
    broadcastToChannel(publicKey.id, 'posts', {
      action: 'deleted',
      postId
    });
    
    // Update posts list
    const posts = await findPostsForBlog(blogId, null, { page: 1, pageSize: 10 });
    broadcastToChannel(publicKey.id, 'posts', {
      action: 'list_updated',
      posts
    });
  } catch (error) {
    console.error('Post deleted event error:', error);
  }
}

// Comment events
async function handleCommentCreated(comment, blogId) {
  try {
    // Get public key for the blog
    const publicKey = await prisma.publickeys.findFirst({ where: { BlogId: blogId } });
    if (!publicKey) return;
    
    // Broadcast comment created event
    broadcastToChannel(publicKey.id, 'comments', {
      action: 'created',
      comment
    });
    
    // Update comments for the post
    const comments = await prisma.postcomments.findMany({
      where: { PostId: comment.PostId },
      orderBy: { createdAt: 'desc' },
      take: 10
    });
    
    broadcastToChannel(publicKey.id, 'comments', {
      action: 'list_updated',
      postId: comment.PostId,
      comments
    });
  } catch (error) {
    console.error('Comment created event error:', error);
  }
}

// Category events
async function handleCategoryUpdated(category, blogId) {
  try {
    // Get public key for the blog
    const publicKey = await prisma.publickeys.findFirst({ where: { BlogId: blogId } });
    if (!publicKey) return;
    
    // Broadcast category updated event
    broadcastToChannel(publicKey.id, 'categories', {
      action: 'updated',
      category
    });
    
    // Update categories list
    const categories = await getBlogCategories(blogId, { page: 1, pageSize: 10 });
    broadcastToChannel(publicKey.id, 'categories', {
      action: 'list_updated',
      categories
    });
  } catch (error) {
    console.error('Category updated event error:', error);
  }
}

// Page events
async function handlePageUpdated(page, blogId) {
  try {
    // Get public key for the blog
    const publicKey = await prisma.publickeys.findFirst({ where: { BlogId: blogId } });
    if (!publicKey) return;
    
    // Broadcast page updated event
    broadcastToChannel(publicKey.id, 'pages', {
      action: 'updated',
      page
    });
    
    // Update pages list
    const pages = await getBlogPages(blogId, { page: 1, pageSize: 10 });
    broadcastToChannel(publicKey.id, 'pages', {
      action: 'list_updated',
      pages
    });
  } catch (error) {
    console.error('Page updated event error:', error);
  }
}

// Blog events
async function handleBlogUpdated(blog) {
  try {
    // Get public key for the blog
    const publicKey = await prisma.publickeys.findFirst({ where: { BlogId: blog.id } });
    if (!publicKey) return;
    
    // Broadcast blog updated event
    broadcastToChannel(publicKey.id, 'blog', {
      action: 'updated',
      blog
    });
    
    // Update header data
    const headerData = await getBlogHeaderWidetData(blog.id);
    broadcastToChannel(publicKey.id, 'header', {
      action: 'updated',
      data: headerData
    });
  } catch (error) {
    console.error('Blog updated event error:', error);
  }
}

// Add these new event handlers
async function handleRouteCreated(route, blogId) {
  try {
    const publicKey = await prisma.publickeys.findFirst({ where: { BlogId: blogId } });
    if (!publicKey) return;
    
    broadcastToChannel(publicKey.id, 'routes', {
      action: 'created',
      route
    });
    
    // Send updated routes list
    const routes = await getRoutesForBlog(blogId);
    broadcastToChannel(publicKey.id, 'routes', {
      action: 'list_updated',
      routes
    });
  } catch (error) {
    console.error('Route created event error:', error);
  }
}

async function handleComponentUpdated(component, blogId) {
  try {
    const publicKey = await prisma.publickeys.findFirst({ where: { BlogId: blogId } });
    if (!publicKey) return;
    
    broadcastToChannel(publicKey.id, 'components', {
      action: 'updated',
      component
    });
    
    // Send updated components list
    const components = await getComponentsForBlog(blogId);
    broadcastToChannel(publicKey.id, 'components', {
      action: 'list_updated',
      components
    });
  } catch (error) {
    console.error('Component updated event error:', error);
  }
}

async function handlePageDataUpdated(path, blogId) {
  try {
    const publicKey = await prisma.publickeys.findFirst({ where: { BlogId: blogId } });
    if (!publicKey) return;
    
    const pageData = await getPageData(blogId, path);
    if (pageData) {
      broadcastToChannel(publicKey.id, 'pageData', pageData);
    }
  } catch (error) {
    console.error('Page data update event error:', error);
  }
}

// Export event handlers
module.exports = {
  handlePostCreated,
  handlePostUpdated,
  handlePostDeleted,
  handleCommentCreated,
  handleCategoryUpdated,
  handlePageUpdated,
  handleBlogUpdated,
  handleRouteCreated,
  handleComponentUpdated,
  handlePageDataUpdated
}; 